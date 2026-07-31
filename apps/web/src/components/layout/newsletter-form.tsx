import { useState } from 'react'
import type { SyntheticEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { HoneypotField } from '@/components/common/honeypot-field'
import { cn } from '@/lib/utils'
import { submitForm } from '@/lib/submit'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

export function NewsletterForm({
  tone = 'ink',
  className,
  onSubmitted,
}: Readonly<{
  tone?: 'ink' | 'light'
  className?: string
  onSubmitted?: (email: string) => void
}>) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState<string | null>(null)

  const ink = tone === 'ink'

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!consent) {
      setError('Please confirm you are happy to receive these emails.')
      return
    }

    setError(null)
    setStatus('sending')

    const result = await submitForm('/api/newsletter', {
      email,
      consent,
      website,
    })

    if (!result.ok) {
      setError(result.errors.join(' '))
      setStatus('idle')
      return
    }

    setStatus('done')
    onSubmitted?.(email)
  }

  if (status === 'done') {
    return (
      <output
        className={cn(
          'flex items-start gap-3 border p-5',
          ink
            ? 'border-signal-500/40 bg-signal-500/10'
            : 'border-signal-300 bg-signal-50',
          className,
        )}
      >
        <FiCheck
          className="mt-0.5 size-4 flex-none text-signal-500"
          aria-hidden="true"
        />
        <div>
          <p
            className={cn(
              'text-sm font-semibold',
              ink ? 'text-white' : 'text-ink-900',
            )}
          >
            Almost there — confirm your address
          </p>
          <p
            className={cn(
              'mt-1 text-sm',
              ink ? 'text-ink-200' : 'text-muted-foreground',
            )}
          >
            We have sent a confirmation link to {email}. You can unsubscribe
            from any email we send.
          </p>
        </div>
      </output>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative space-y-4', className)}
      noValidate
    >
      <HoneypotField name="website" value={website} onChange={setWebsite} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@organisation.com"
            autoComplete="email"
            aria-describedby="newsletter-consent-text"
            className={cn(
              'h-11 w-full border px-4 text-sm transition-colors outline-none',
              ink
                ? 'border-white/20 bg-white/5 text-white placeholder:text-ink-300 focus:border-signal-500'
                : 'border-input bg-white text-ink-900 placeholder:text-muted-foreground focus:border-signal-500',
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={status === 'sending'}
          className="h-11 bg-signal-500 text-ink-950 hover:bg-signal-400"
        >
          {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
          <FiArrowRight
            className="size-3.5"
            data-icon="inline-end"
            aria-hidden="true"
          />
        </Button>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="newsletter-consent"
          checked={consent}
          onCheckedChange={(value) => setConsent(value === true)}
          className={cn(
            'mt-0.5',
            ink && 'border-white/30 data-checked:bg-signal-500',
          )}
        />
        <label
          id="newsletter-consent-text"
          htmlFor="newsletter-consent"
          className={cn(
            'text-xs leading-relaxed',
            ink ? 'text-ink-300' : 'text-muted-foreground',
          )}
        >
          Send me the monthly policy roundup and training updates. I understand
          I can unsubscribe at any time, and that my details are handled under
          the{' '}
          <a
            href="/privacy"
            className={cn(
              'underline underline-offset-2',
              ink ? 'text-ink-100' : 'text-ink-700',
            )}
          >
            privacy notice
          </a>
          .
        </label>
      </div>

      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  )
}
