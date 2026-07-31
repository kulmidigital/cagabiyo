import type { z } from 'zod'

import { BURST_LIMIT, FORM_LIMIT, clientKey, hit } from './rate-limit'
import { toMessages } from './schemas'
import { record } from './submissions'
import type { SubmissionKind, SubmissionRecord } from './submissions'
import type { SendResult } from './mailer'

/**
 * The pipeline every form submission goes through:
 *
 *   rate limit -> parse -> validate -> honeypot -> send -> record
 *
 * Written once so all five endpoints behave identically, including their error
 * shapes, and so no endpoint can accidentally skip a step.
 */

export type ApiError = { ok: false; errors: Array<string> }
export type ApiSuccess<T> = { ok: true } & T

function fail(errors: Array<string>, status: number): Response {
  return Response.json({ ok: false, errors } satisfies ApiError, { status })
}

/** Fields the visitor should never see; anything in them means a bot. */
const HONEYPOT_FIELDS = ['company', 'website'] as const

export async function handleSubmission<TSchema extends z.ZodType>({
  request,
  schema,
  kind,
  send,
  redact,
}: {
  request: Request
  schema: TSchema
  kind: SubmissionKind
  send: (input: z.infer<TSchema>) => Promise<SendResult>
  /** Strips anything that should not be written to the submission log. */
  redact?: (input: z.infer<TSchema>) => Record<string, unknown>
}): Promise<Response> {
  // 1. Rate limit before doing any work.
  const burst = hit(clientKey(request, `${kind}:burst`), BURST_LIMIT)
  if (!burst.allowed) {
    return fail(
      ['That was sent a moment ago — please wait before trying again.'],
      429,
    )
  }

  const window = hit(clientKey(request, kind), FORM_LIMIT)
  if (!window.allowed) {
    return fail(
      [
        `Too many submissions from this connection. Try again in ${Math.ceil(window.retryAfter / 60)} minutes, or email us directly.`,
      ],
      429,
    )
  }

  // 2. Parse.
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return fail(['We could not read that submission.'], 400)
  }

  // 3. Honeypot — a filled hidden field is a bot. Answer 200 so it learns
  //    nothing from the response, but do no work.
  if (body && typeof body === 'object') {
    const record_ = body as Record<string, unknown>
    for (const field of HONEYPOT_FIELDS) {
      const value = record_[field]
      if (typeof value === 'string' && value.trim() !== '') {
        console.warn(`[${kind}] honeypot triggered`)
        return Response.json({ ok: true })
      }
    }
  }

  // 4. Validate.
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return fail(toMessages(parsed.error), 422)
  }

  const input = parsed.data
  const receivedAt = new Date().toISOString()

  // 5. Send.
  const result = await send(input)

  // 6. Record either way, so a rejected send still leaves a recoverable lead.
  const entry: SubmissionRecord = {
    kind,
    receivedAt,
    delivered: result.ok,
    ...(result.ok ? {} : { deliveryError: result.error }),
    payload: redact ? redact(input) : (input as Record<string, unknown>),
  }
  await record(entry)

  if (!result.ok) {
    return fail(
      [
        'We could not send that just now. Your details are safe with us — please email us directly if it is urgent.',
      ],
      502,
    )
  }

  return Response.json({ ok: true })
}
