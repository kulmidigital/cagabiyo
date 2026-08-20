import { cloneElement, isValidElement, useMemo, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { FiArrowRight, FiCheck, FiEdit2 } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CurrencyToggle } from '@/components/courses/currency-toggle'
import { ProformaInvoice } from '@/components/capacity/proforma-invoice'
import type { ProformaDetails } from '@/components/capacity/proforma-invoice'
import { IndexLabel } from '@/components/common/section'
import { HoneypotField } from '@/components/common/honeypot-field'
import { cn } from '@/lib/utils'
import { submitForm } from '@/lib/submit'
import { focusAreas } from '@/lib/content/training'
import type { Currency } from '@/lib/content/training'
import { buildQuote, formatAmount } from '@/lib/pricing'
import type { DeliveryChoice, Quote } from '@/lib/pricing'

const deliveryOptions: Array<{
  value: DeliveryChoice
  label: string
  detail: string
}> = [
  { value: 'On-site', label: 'On-site', detail: 'At your premises' },
  { value: 'Virtual', label: 'Virtual', detail: 'Live online cohort' },
  { value: 'Off-site', label: 'Off-site', detail: 'Venue we arrange' },
]

export function CorporateRequestForm() {
  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('')
  const [contactName, setContactName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [headcount, setHeadcount] = useState(25)
  const [modules, setModules] = useState<Array<string>>([])
  const [delivery, setDelivery] = useState<DeliveryChoice>('On-site')
  const [location, setLocation] = useState('')
  const [timeframe, setTimeframe] = useState('')
  const [notes, setNotes] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [currency, setCurrency] = useState<Currency>('KES')
  const [sending, setSending] = useState(false)

  const [quote, setQuote] = useState<Quote | null>(null)
  const [details, setDetails] = useState<ProformaDetails | null>(null)
  const [errors, setErrors] = useState<Array<string>>([])
  const resultRef = useRef<HTMLDivElement>(null)

  const allModules = useMemo(
    () => focusAreas.map((area) => ({ area, modules: area.modules })),
    [],
  )

  const toggleModule = (module: string) =>
    setModules((current) =>
      current.includes(module)
        ? current.filter((m) => m !== module)
        : [...current, module],
    )

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    const found: Array<string> = []
    if (!company.trim()) found.push('Company name is required.')
    if (!contactName.trim()) found.push('A contact name is required.')
    if (!email.trim()) found.push('A work email address is required.')
    if (headcount < 1) found.push('Enter the number of delegates.')
    if (modules.length === 0) found.push('Select at least one training module.')
    if (!consent) found.push('Please confirm how we may use your details.')

    setErrors(found)
    if (found.length) return

    // The quote is built first so the reference and total can travel with the
    // emails — the buyer and the sales desk must see the same figures.
    const built = buildQuote({ headcount, modules, delivery, currency })

    setSending(true)
    const result = await submitForm('/api/corporate-request', {
      company,
      industry,
      contactName,
      role,
      email,
      phone,
      headcount,
      modules,
      delivery,
      location,
      timeframe,
      notes,
      currency,
      reference: built.reference,
      total: formatAmount(built.total, currency),
      consent,
      website,
    })
    setSending(false)

    if (!result.ok) {
      setErrors(result.errors)
      return
    }

    setQuote(built)
    setDetails({
      company,
      contactName,
      email,
      phone,
      headcount,
      delivery,
      location,
      timeframe,
    })

    // Move focus to the generated document so the outcome is announced.
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  if (quote && details) {
    return (
      <div ref={resultRef} tabIndex={-1} className="outline-none">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border border-signal-300 bg-signal-50 p-6 print:hidden">
          <div className="flex items-start gap-3">
            <FiCheck
              className="mt-0.5 size-5 flex-none text-signal-700"
              aria-hidden="true"
            />
            <div>
              <p className="font-bold text-ink-900">
                Request received — pro-forma generated
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                A copy has been prepared below. Our training team will confirm
                scheduling and final pricing within two working days.
              </p>
              {notes ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Your notes have been attached to the request.
                </p>
              ) : null}
              {industry || role ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Logged for {industry || 'your sector'}
                  {role ? `, attention ${role}` : ''}.
                </p>
              ) : null}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setQuote(null)
              setDetails(null)
            }}
          >
            <FiEdit2
              className="size-3.5"
              data-icon="inline-start"
              aria-hidden="true"
            />
            Amend request
          </Button>
        </div>

        <ProformaInvoice quote={quote} details={details} />
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative space-y-8 sm:space-y-12"
    >
      <HoneypotField name="website" value={website} onChange={setWebsite} />
      {/* Company */}
      <Fieldset
        index={1}
        legend="Company details"
        hint="Who the pro-forma should be made out to."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company name" required>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="organization"
              className={inputClass}
              required
            />
          </Field>
          <Field label="Industry">
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Banking, public sector, manufacturing…"
              className={inputClass}
            />
          </Field>
          <Field label="Contact name" required>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              autoComplete="name"
              className={inputClass}
              required
            />
          </Field>
          <Field label="Role">
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Head of L&D"
              className={inputClass}
            />
          </Field>
          <Field label="Work email" required>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={inputClass}
              required
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="+254…"
              className={inputClass}
            />
          </Field>
        </div>
      </Fieldset>

      {/* Headcount */}
      <Fieldset
        index={2}
        legend="Delegates"
        hint="Volume bands are applied automatically."
      >
        <div className="flex flex-wrap items-end gap-6">
          <Field
            label="Number of delegates"
            required
            className="w-full sm:w-40"
          >
            <input
              type="number"
              min={1}
              max={5000}
              value={headcount}
              onChange={(e) => setHeadcount(Number(e.target.value))}
              className={cn(inputClass, 'numeric')}
              required
            />
          </Field>
          <div className="flex flex-wrap gap-2 pb-1">
            {[10, 25, 50, 100, 250].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setHeadcount(n)}
                className={cn(
                  'numeric border px-3 py-1.5 text-xs font-medium transition-colors',
                  headcount === n
                    ? 'border-ink-900 bg-ink-900 text-white'
                    : 'border-border bg-white text-ink-700 hover:border-ink-300',
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </Fieldset>

      {/* Modules */}
      <Fieldset
        index={3}
        legend="Preferred modules"
        hint="Choose across any of the five focus areas — most programmes mix two or three."
      >
        <p className="mb-5 text-sm" role="status" aria-live="polite">
          <span className="numeric font-semibold text-ink-900">
            {modules.length}
          </span>{' '}
          <span className="text-muted-foreground">
            module{modules.length === 1 ? '' : 's'} selected
          </span>
        </p>

        <div className="max-h-96 space-y-6 overflow-y-auto border border-border bg-white p-5 sm:max-h-112 sm:p-6">
          {allModules.map(({ area, modules: areaModules }) => (
            <div key={area.id}>
              <p className="flex items-baseline gap-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                <IndexLabel n={area.id} />
                {area.name}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {areaModules.map((module) => {
                  const selected = modules.includes(module)
                  return (
                    <button
                      key={module}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleModule(module)}
                      className={cn(
                        'inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-medium transition-colors',
                        selected
                          ? 'border-signal-500 bg-signal-50 text-signal-800'
                          : 'border-border text-ink-700 hover:border-ink-300 hover:bg-sand-50',
                      )}
                    >
                      {selected ? (
                        <FiCheck className="size-3" aria-hidden="true" />
                      ) : null}
                      {module}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Fieldset>

      {/* Delivery */}
      <Fieldset
        index={4}
        legend="Delivery"
        hint="Where and how the cohort should run."
      >
        <div
          role="radiogroup"
          aria-label="Delivery mode"
          className="rule-grid grid sm:grid-cols-3"
        >
          {deliveryOptions.map((option) => {
            const selected = delivery === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setDelivery(option.value)}
                className={cn(
                  'edge-card p-6 text-left transition-colors',
                  selected
                    ? 'bg-ink-900 text-white'
                    : 'bg-white hover:bg-sand-50',
                )}
              >
                <span className="block text-sm font-bold">{option.label}</span>
                <span
                  className={cn(
                    'mt-1 block text-xs',
                    selected ? 'text-ink-200' : 'text-muted-foreground',
                  )}
                >
                  {option.detail}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Location">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Nairobi, Kampala, Dar es Salaam…"
              className={inputClass}
            />
          </Field>
          <Field label="Preferred timeframe">
            <input
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              placeholder="Q4 2026, or a specific month"
              className={inputClass}
            />
          </Field>
        </div>
      </Fieldset>

      {/* Notes & consent */}
      <Fieldset
        index={5}
        legend="Anything else"
        hint="Optional, but it usually speeds up scoping."
      >
        <Field label="Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Existing capability level, compliance deadline, procurement process…"
            className={cn(inputClass, 'h-auto py-3')}
          />
        </Field>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="corp-consent"
              checked={consent}
              onCheckedChange={(value) => setConsent(value === true)}
              className="mt-0.5"
            />
            <label
              htmlFor="corp-consent"
              className="max-w-lg text-xs leading-relaxed text-muted-foreground"
            >
              I agree that CaliberCode may use these details to prepare and
              follow up this training request, in line with the{' '}
              <a
                href="/privacy"
                className="text-ink-700 underline underline-offset-2"
              >
                privacy notice
              </a>{' '}
              and the Kenya Data Protection Act, 2019.
            </label>
          </div>

          <div className="flex items-center gap-4">
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </div>
        </div>
      </Fieldset>

      {errors.length ? (
        <div
          role="alert"
          className="border border-destructive/40 bg-destructive/5 p-5"
        >
          <p className="text-sm font-semibold text-destructive">
            Please check the following before submitting
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
        {sending ? 'Sending…' : 'Generate pro-forma invoice'}
        <FiArrowRight
          className="size-4"
          data-icon="inline-end"
          aria-hidden="true"
        />
      </Button>
    </form>
  )
}

const inputClass =
  'h-11 w-full border border-input bg-white px-4 text-sm text-ink-900 outline-none transition-colors placeholder:text-muted-foreground focus:border-signal-500'

function Fieldset({
  index,
  legend,
  hint,
  children,
}: Readonly<{
  index: number
  legend: string
  hint: string
  children: React.ReactNode
}>) {
  return (
    <fieldset>
      <legend className="mb-1 flex items-baseline gap-3">
        <IndexLabel n={index} />
        <span className="text-xl font-bold text-ink-900">{legend}</span>
      </legend>
      <p className="mb-6 text-sm text-muted-foreground">{hint}</p>
      {children}
    </fieldset>
  )
}

function Field({
  label,
  required,
  className,
  children,
}: Readonly<{
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}>) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-')
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
      {/* The single child is the control; wire the label's id through to it. */}
      <div className="*:w-full">
        {isValidElement(children)
          ? cloneElement(children, {
              id,
              ...(required ? { 'aria-required': true } : {}),
            } as Partial<unknown>)
          : children}
      </div>
    </div>
  )
}
