/**
 * Fixed-window rate limiting for form submissions (requirement 6).
 *
 * LIMITATION — this counter lives in the memory of a single Worker isolate.
 * Cloudflare may run several isolates concurrently and recycles them freely, so
 * a determined sender can exceed the limit by landing on a cold isolate. It
 * stops casual flooding and accidental double-submits, which is what it is for.
 *
 * For a limit that actually holds across the fleet, back it with Workers KV or
 * a Durable Object and swap the implementation of `hit()` — the call sites do
 * not need to change. Neither binding is configured in `wrangler.jsonc` yet.
 */

type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()

/** Drop expired entries so the map cannot grow without bound. */
function sweep(now: number) {
  if (windows.size < 500) return
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key)
  }
}

export type RateLimitResult = {
  allowed: boolean
  /** Seconds until the window resets — surfaced to the caller when blocked. */
  retryAfter: number
}

export function hit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = windows.get(key)

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfter: 0 }
  }

  existing.count += 1

  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    }
  }

  return { allowed: true, retryAfter: 0 }
}

/**
 * Identifies the sender for rate-limiting purposes. Cloudflare sets
 * `CF-Connecting-IP`; the others are fallbacks for other runtimes. An unknown
 * origin shares one bucket, which is deliberately conservative.
 */
export function clientKey(request: Request | undefined, scope: string): string {
  const headers = request?.headers
  const ip =
    headers?.get('cf-connecting-ip') ??
    headers?.get('x-real-ip') ??
    headers?.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  return `${scope}:${ip}`
}

/** One submission every few seconds, a handful per hour, per form. */
export const FORM_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 }
export const BURST_LIMIT = { limit: 1, windowMs: 20 * 1000 }
