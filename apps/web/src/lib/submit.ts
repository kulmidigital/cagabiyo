/**
 * Client half of the form pipeline.
 *
 * Every form posts JSON to its endpoint and gets back either `{ ok: true }` or
 * `{ ok: false, errors: string[] }`. The error list is already written for the
 * visitor by the server, so forms render it directly.
 */

export type SubmitResult = { ok: true } | { ok: false; errors: Array<string> }

const GENERIC_ERROR =
  'Something went wrong sending that. Please try again, or email us directly.'

const OFFLINE_ERROR =
  'We could not reach the server. Check your connection and try again.'

export async function submitForm(
  endpoint: string,
  body: unknown,
): Promise<SubmitResult> {
  let response: Response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return { ok: false, errors: [OFFLINE_ERROR] }
  }

  const data = (await response.json().catch(() => null)) as {
    ok?: boolean
    errors?: Array<string>
  } | null

  if (response.ok && data?.ok) return { ok: true }

  const errors =
    Array.isArray(data?.errors) && data.errors.length
      ? data.errors
      : [GENERIC_ERROR]

  return { ok: false, errors }
}
