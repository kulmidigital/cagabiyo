import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { FiCheck, FiSend } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IndexLabel } from '@/components/common/section'
import { HoneypotField } from '@/components/common/honeypot-field'
import { cn } from '@/lib/utils'
import { submitForm } from '@/lib/submit'
import { services } from '@/lib/content/services'

export type Intent = 'advisory' | 'training' | 'events' | 'careers' | 'general'

const intents: Array<{ value: Intent; label: string; detail: string }> = [
  {
    value: 'advisory',
    label: 'Advisory',
    detail: 'Tax, audit, governance, risk, digital assets',
  },
  {
    value: 'training',
    label: 'Training',
    detail: 'Corporate cohorts and masterclasses',
  },
  {
    value: 'events',
    label: 'Events',
    detail: 'Workshops, seats and group bookings',
  },
  { value: 'careers', label: 'Careers', detail: 'Roles and the faculty panel' },
  { value: 'general', label: 'Something else', detail: 'General enquiries' },
]

export function ContactForm({
  initialIntent = 'general',
  initialService,
}: Readonly<{
  initialIntent?: Intent
  initialService?: string
}>) {
  const [intent, setIntent] = useState<Intent>(initialIntent)
  const [service, setService] = useState(initialService ?? '')
  const [name, setName] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [headcount, setHeadcount] = useState('')
  const [message, setMessage] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [consent, setConsent] = useState(false)
  const [company, setCompany] = useState('')
  const [errors, setErrors] = useState<Array<string>>([])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  // Deep links carry the intent; keep local state in step if it changes.
  useEffect(() => setIntent(initialIntent), [initialIntent])
  useEffect(() => {
    if (initialService) setService(initialService)
  }, [initialService])

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const found: Array<string> = []
    if (!name.trim()) found.push('Please give us your name.')
    if (!email.trim())
      found.push('Please give us an email address to reply to.')
    if (!message.trim()) found.push('Please tell us what you need.')
    if (!consent) found.push('Please confirm how we may use your details.')
    setErrors(found)
    if (found.length) return

    setSending(true)

    // An advisory enquiry is a booking request, so it goes to the consultancy
    // endpoint and carries the preferred date with it.
    const result =
      intent === 'advisory'
        ? await submitForm('/api/consultancy', {
            name,
            organisation,
            email,
            phone,
            service,
            preferredDate,
            message,
            consent,
            company,
          })
        : await submitForm('/api/contact', {
            intent,
            name,
            organisation,
            email,
            phone,
            service,
            headcount,
            message,
            consent,
            company,
          })

    setSending(false)

    if (!result.ok) {
      setErrors(result.errors)
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <output className="block border border-signal-300 bg-signal-50 p-6 sm:p-8">
        <span className="inline-flex size-11 items-center justify-center bg-signal-500">
          <FiCheck className="size-5 text-ink-950" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-ink-900">
          Message Received
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your enquiry has been routed to the{' '}
          <span className="font-medium text-ink-900">
            {intents.find((i) => i.value === intent)?.label.toLowerCase()}
          </span>{' '}
          desk. We reply to {email} within one working day. If it is urgent, the
          WhatsApp desk is quicker.
        </p>
        <Button
          variant="outline"
          className="mt-7"
          onClick={() => setSent(false)}
        >
          Send another message
        </Button>
      </output>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative space-y-8 sm:space-y-10"
    >
      <HoneypotField name="company" value={company} onChange={setCompany} />

      {/* Intent — CONTACT-06 */}
      <fieldset>
        <legend className="mb-1 flex items-baseline gap-3">
          <IndexLabel n={1} />
          <span className="text-lg font-bold text-ink-900">
            What is this about?
          </span>
        </legend>
        <p className="mb-5 text-sm text-muted-foreground">
          This decides which desk receives it.
        </p>

        <div
          role="radiogroup"
          aria-label="Enquiry type"
          className="rule-grid grid sm:grid-cols-2 lg:grid-cols-3"
        >
          {intents.map((option) => {
            const selected = intent === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setIntent(option.value)}
                className={cn(
                  'edge-card p-5 text-left transition-colors',
                  selected
                    ? 'bg-ink-900 text-white'
                    : 'bg-white hover:bg-sand-50',
                )}
              >
                <span className="block text-sm font-bold">{option.label}</span>
                <span
                  className={cn(
                    'mt-1 block text-xs leading-snug',
                    selected ? 'text-ink-200' : 'text-muted-foreground',
                  )}
                >
                  {option.detail}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Details */}
      <fieldset>
        <legend className="mb-1 flex items-baseline gap-3">
          <IndexLabel n={2} />
          <span className="text-lg font-bold text-ink-900">Your details</span>
        </legend>
        <p className="mb-5 text-sm text-muted-foreground">
          So we know who to reply to.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="contact-name" label="Full name" required>
            <input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={inputClass}
            />
          </Field>
          <Field id="contact-org" label="Organisation">
            <input
              id="contact-org"
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              autoComplete="organization"
              className={inputClass}
            />
          </Field>
          <Field id="contact-email" label="Email" required>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={inputClass}
            />
          </Field>
          <Field id="contact-phone" label="Phone">
            <input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="+254…"
              className={inputClass}
            />
          </Field>

          {/* Intent-specific fields */}
          {intent === 'advisory' ? (
            <Field
              id="contact-service"
              label="Practice area"
              className="sm:col-span-2"
            >
              <select
                id="contact-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={cn(inputClass, 'appearance-none')}
              >
                <option value="">Not sure yet</option>
                {services.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>
          ) : null}

          {intent === 'advisory' ? (
            <Field
              id="contact-date"
              label="Preferred date or week"
              className="sm:col-span-2"
            >
              <input
                id="contact-date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                placeholder="Week of 18 August, or any Tuesday"
                className={inputClass}
              />
            </Field>
          ) : null}

          {intent === 'training' || intent === 'events' ? (
            <Field
              id="contact-headcount"
              label="Approximate headcount"
              className="sm:col-span-2"
            >
              <input
                id="contact-headcount"
                type="number"
                min={1}
                value={headcount}
                onChange={(e) => setHeadcount(e.target.value)}
                placeholder="25"
                className={cn(inputClass, 'numeric')}
              />
            </Field>
          ) : null}
        </div>
      </fieldset>

      {/* Message */}
      <fieldset>
        <legend className="mb-1 flex items-baseline gap-3">
          <IndexLabel n={3} />
          <span className="text-lg font-bold text-ink-900">
            What do you need?
          </span>
        </legend>
        <p className="mb-5 text-sm text-muted-foreground">
          Specific detail gets a faster, more useful reply.
        </p>

        <Field id="contact-message" label="Message" required>
          <textarea
            id="contact-message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholderFor(intent)}
            className={cn(inputClass, 'h-auto py-3')}
          />
        </Field>

        {/* CONTACT-07 / SEC-08 */}
        <div className="mt-6 flex items-start gap-3">
          <Checkbox
            id="contact-consent"
            checked={consent}
            onCheckedChange={(value) => setConsent(value === true)}
            className="mt-0.5"
          />
          <label
            htmlFor="contact-consent"
            className="max-w-xl text-xs leading-relaxed text-muted-foreground"
          >
            I consent to CaliberCode holding and using these details to respond
            to this enquiry, in line with the{' '}
            <a
              href="/privacy"
              className="text-ink-700 underline underline-offset-2"
            >
              privacy notice
            </a>{' '}
            and the Kenya Data Protection Act, 2019. I can ask for my details to
            be deleted at any time.
          </label>
        </div>
      </fieldset>

      {errors.length ? (
        <div
          role="alert"
          className="border border-destructive/40 bg-destructive/5 p-5"
        >
          <p className="text-sm font-semibold text-destructive">
            Before you send
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-destructive">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={sending}
        className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
      >
        {sending ? 'Sending…' : 'Send enquiry'}
        <FiSend className="size-4" data-icon="inline-end" aria-hidden="true" />
      </Button>
    </form>
  )
}

const inputClass =
  'h-11 w-full border border-input bg-white px-4 text-sm text-ink-900 outline-none transition-colors placeholder:text-muted-foreground focus:border-signal-500'

function placeholderFor(intent: Intent): string {
  switch (intent) {
    case 'advisory':
      return 'We have received an assessment we intend to object to, and need support building the position…'
    case 'training':
      return 'We need 40 finance staff trained on fraud risk before the next audit cycle…'
    case 'events':
      return 'We would like six seats at the November masterclass, invoiced to the company…'
    case 'careers':
      return 'I am a CISA-qualified IT auditor looking to join the faculty panel…'
    default:
      return 'Tell us what you need.'
  }
}

function Field({
  id,
  label,
  required,
  className,
  children,
}: Readonly<{
  id: string
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}>) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold tracking-[0.08em] text-ink-800 uppercase"
      >
        {label}
        {required ? (
          <span className="ml-1 text-signal-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
    </div>
  )
}
