/**
 * Server-side environment access.
 *
 * Every value is read from the environment with no fallback and no default. If
 * a key is missing the request fails loudly rather than silently sending from
 * the wrong address or dropping mail on the floor.
 *
 * On Cloudflare Workers `process.env` is populated from the Worker's vars and
 * secrets because `nodejs_compat` is enabled in `wrangler.jsonc`. Locally it
 * comes from `.env`.
 */

export type MailEnv = {
  resendApiKey: string
  fromName: string
  fromEmail: string
  toEmail: string
}

class MissingEnvError extends Error {
  constructor(keys: Array<string>) {
    super(
      `Missing required environment ${keys.length === 1 ? 'variable' : 'variables'}: ${keys.join(', ')}`,
    )
    this.name = 'MissingEnvError'
  }
}

function read(key: string): string | undefined {
  const value = process.env[key]
  return value && value.trim() !== '' ? value.trim() : undefined
}

/** Throws if anything required is absent — never substitutes a default. */
export function getMailEnv(): MailEnv {
  const resendApiKey = read('RESEND_API_KEY')
  const fromName = read('FROM_NAME')
  const fromEmail = read('FROM_EMAIL')
  const toEmail = read('TO_EMAIL')

  const missing = [
    !resendApiKey && 'RESEND_API_KEY',
    !fromName && 'FROM_NAME',
    !fromEmail && 'FROM_EMAIL',
    !toEmail && 'TO_EMAIL',
  ].filter((key): key is string => typeof key === 'string')

  if (missing.length) throw new MissingEnvError(missing)

  return {
    resendApiKey: resendApiKey!,
    fromName: fromName!,
    fromEmail: fromEmail!,
    toEmail: toEmail!,
  }
}

/** `"CaliberCode <hello@example.com>"` as Resend expects it. */
export function formatSender(env: MailEnv): string {
  return `${env.fromName} <${env.fromEmail}>`
}
