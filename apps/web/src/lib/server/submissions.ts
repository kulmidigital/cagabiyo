/**
 * Submission record keeping (requirement 5).
 *
 * NOT YET PERSISTENT. No database, KV namespace or D1 binding exists in
 * `wrangler.jsonc`, so this writes a structured line to the Worker log, which
 * is retrievable with `wrangler tail` and by any log drain you attach. That is
 * enough to recover a lead if Resend rejects a message, and no more.
 *
 * To make it durable, add a binding and implement `persist()` against it — for
 * example a D1 insert or a KV put keyed by `${kind}:${receivedAt}`. Everything
 * else here already funnels through that one function.
 */

export type SubmissionKind =
  | 'contact'
  | 'corporate-request'
  | 'custom-programme'
  | 'consultancy'
  | 'newsletter'

export type SubmissionRecord = {
  kind: SubmissionKind
  receivedAt: string
  /** Whether the notification and acknowledgement actually went out. */
  delivered: boolean
  deliveryError?: string
  payload: Record<string, unknown>
}

/**
 * Records a submission. Never throws: losing the record must not also lose the
 * response to the visitor.
 */
export async function record(entry: SubmissionRecord): Promise<void> {
  try {
    await persist(entry)
  } catch (error) {
    console.error('[submission] failed to record', {
      kind: entry.kind,
      receivedAt: entry.receivedAt,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

async function persist(entry: SubmissionRecord): Promise<void> {
  // Single line so log drains can parse it without reassembly.
  console.info(`[submission] ${JSON.stringify(entry)}`)
  await Promise.resolve()
}
