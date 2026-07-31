import { Resend } from 'resend'
import { render } from 'react-email'
import type { ReactElement } from 'react'

import { formatSender, getMailEnv } from './env'

/**
 * Resend transport.
 *
 * The client is created per request rather than at module scope: on Workers the
 * module may be evaluated before bindings are attached, and constructing it
 * eagerly would read the key too early.
 */

export type SendResult = { ok: true } | { ok: false; error: string }

type Message = {
  to: string | Array<string>
  subject: string
  template: ReactElement
  replyTo?: string
  /** RFC 8058 one-click unsubscribe, used by the newsletter. */
  headers?: Record<string, string>
}

export async function send(message: Message): Promise<SendResult> {
  try {
    const env = getMailEnv()
    const resend = new Resend(env.resendApiKey)

    const [html, text] = await Promise.all([
      render(message.template),
      render(message.template, { plainText: true }),
    ])

    const { error } = await resend.emails.send({
      from: formatSender(env),
      to: message.to,
      subject: message.subject,
      html,
      text,
      ...(message.replyTo ? { replyTo: message.replyTo } : {}),
      ...(message.headers ? { headers: message.headers } : {}),
    })

    if (error) {
      console.error('[mailer] resend rejected the message', error)
      return { ok: false, error: error.message }
    }

    return { ok: true }
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    console.error('[mailer] send failed', reason)
    return { ok: false, error: reason }
  }
}

/**
 * Sends the internal notification and the visitor acknowledgement together.
 *
 * The notification is what the business cannot afford to lose, so its result
 * decides the outcome; a failed acknowledgement is logged but does not fail the
 * submission for the visitor.
 */
export async function sendPair({
  notification,
  acknowledgement,
}: {
  notification: Message
  acknowledgement: Message
}): Promise<SendResult> {
  const [internal, visitor] = await Promise.all([
    send(notification),
    send(acknowledgement),
  ])

  if (!visitor.ok) {
    console.warn('[mailer] acknowledgement failed', visitor.error)
  }

  return internal
}

/** Where internal notifications go. */
export function internalRecipient(): string {
  return getMailEnv().toEmail
}
