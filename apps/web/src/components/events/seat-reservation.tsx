import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiCheck,
  FiCreditCard,
  FiSmartphone,
  FiX,
} from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { CurrencyToggle } from '@/components/courses/currency-toggle'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/content/training'
import type { Currency } from '@/lib/content/training'
import {
  availability,
  formatEventDate,
  formatEventTime,
} from '@/lib/content/events'
import type { SiteEvent } from '@/lib/content/events'

type PaymentMethod = 'mpesa' | 'card'
type PaymentState =
  'idle' | 'pending' | 'success' | 'failed' | 'cancelled' | 'timeout'

/** BOOK-WORKSHOP-02 — seat count, remaining stock and the currency switch. */
function SeatPicker({
  seats,
  maxSeats,
  onSeats,
  remaining,
  capacity,
  free,
  currency,
  onCurrency,
}: Readonly<{
  seats: number
  maxSeats: number
  onSeats: (update: (current: number) => number) => void
  remaining: number
  capacity: number
  free: boolean
  currency: Currency
  onCurrency: (currency: Currency) => void
}>) {
  return (
    <section>
      <h3 className="text-sm font-bold text-ink-900">Seats</h3>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <div className="inline-flex border border-input">
          <button
            type="button"
            onClick={() => onSeats((current) => Math.max(1, current - 1))}
            disabled={seats <= 1}
            aria-label="Fewer seats"
            className="size-10 text-ink-700 transition-colors hover:bg-sand-100 disabled:opacity-40"
          >
            −
          </button>
          <span
            className="numeric flex w-14 items-center justify-center border-x border-input font-semibold"
            aria-live="polite"
          >
            {seats}
          </span>
          <button
            type="button"
            onClick={() =>
              onSeats((current) => Math.min(maxSeats, current + 1))
            }
            disabled={seats >= maxSeats}
            aria-label="More seats"
            className="size-10 text-ink-700 transition-colors hover:bg-sand-100 disabled:opacity-40"
          >
            +
          </button>
        </div>
        <p className="numeric text-xs text-muted-foreground">
          {remaining} of {capacity} remaining
        </p>
        {free ? null : (
          <CurrencyToggle
            value={currency}
            onChange={onCurrency}
            className="ml-auto"
          />
        )}
      </div>
    </section>
  )
}

/** PAY-01, PAY-04 — method choice plus the M-Pesa number when relevant. */
function PaymentMethodSection({
  method,
  onMethod,
  phone,
  onPhone,
}: Readonly<{
  method: PaymentMethod
  onMethod: (method: PaymentMethod) => void
  phone: string
  onPhone: (phone: string) => void
}>) {
  return (
    <section className="mt-7">
      <h3 className="text-sm font-bold text-ink-900">Payment method</h3>
      <div
        role="radiogroup"
        aria-label="Payment method"
        className="mt-3 grid gap-3 sm:grid-cols-2"
      >
        <MethodOption
          selected={method === 'mpesa'}
          onSelect={() => onMethod('mpesa')}
          icon={FiSmartphone}
          title="M-Pesa"
          detail="Instant STK push to your phone"
        />
        <MethodOption
          selected={method === 'card'}
          onSelect={() => onMethod('card')}
          icon={FiCreditCard}
          title="Card"
          detail="Visa or Mastercard"
        />
      </div>

      {method === 'mpesa' ? (
        <div className="mt-4">
          <LabelledInput
            label="M-Pesa number"
            type="tel"
            value={phone}
            onChange={onPhone}
            placeholder="07XX XXX XXX"
            autoComplete="tel"
          />
        </div>
      ) : null}
    </section>
  )
}

/** Sold-out state, split out so the dialog body is a flat set of branches. */
function SoldOutPanel() {
  return (
    <div className="p-7 text-center">
      <p className="text-lg font-bold text-ink-900">This date is sold out</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Contact the training team to be added to the waiting list or to hear
        about the next cohort.
      </p>
    </div>
  )
}

/** Submit-button copy, resolved without nesting conditionals in the markup. */
function buildSubmitLabel({
  state,
  method,
  free,
  amount,
}: Readonly<{
  state: PaymentState
  method: PaymentMethod
  free: boolean
  amount: string
}>): string {
  if (state === 'pending') {
    return method === 'mpesa' ? 'Check your phone…' : 'Processing…'
  }
  return free ? 'Reserve seat' : `Pay ${amount}`
}

export function SeatReservation({
  event,
  open,
  onOpenChange,
}: Readonly<{
  event: SiteEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}>) {
  // Only what outlives the form: the payment lifecycle, plus the two values the
  // confirmation panel needs. Everything else lives inside ReservationForm.
  const [state, setState] = useState<PaymentState>('idle')
  const [seats, setSeats] = useState(1)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (open) {
      setSeats(1)
      setState('idle')
    }
  }, [open, event?.slug])

  if (!event) return null

  const reference = `CC-TKT-${event.slug.slice(0, 6).toUpperCase()}-${String(
    Math.abs(hash(event.slug + email)) % 100000,
  ).padStart(5, '0')}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <DialogTitle className="sr-only">
          Reserve a seat — {event.title}
        </DialogTitle>

        <ReservationHeader event={event} />

        <ReservationBody
          event={event}
          state={state}
          onState={setState}
          seats={seats}
          onSeats={setSeats}
          email={email}
          onEmail={setEmail}
          reference={reference}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

function ReservationHeader({ event }: Readonly<{ event: SiteEvent }>) {
  const venue =
    event.format === 'Virtual' ? 'Online' : `${event.venue}, ${event.city}`

  return (
    <div className="surface-ink p-7">
      <p className="eyebrow text-signal-400">{event.kind}</p>
      <h2 className="mt-4 text-xl leading-snug font-bold text-white">
        {event.title}
      </h2>
      <dl className="numeric mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-200">
        <div className="flex gap-2">
          <dt className="text-ink-400">Date</dt>
          <dd>{formatEventDate(event)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-400">Time</dt>
          <dd>{formatEventTime(event)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-400">Venue</dt>
          <dd>{venue}</dd>
        </div>
      </dl>
    </div>
  )
}

type BodyProps = Readonly<{
  event: SiteEvent
  state: PaymentState
  onState: (state: PaymentState) => void
  seats: number
  onSeats: (update: (current: number) => number) => void
  email: string
  onEmail: (email: string) => void
  reference: string
  onClose: () => void
}>

/** One decision, resolved by early return rather than a ternary chain. */
function ReservationBody(props: BodyProps) {
  if (props.state === 'success') {
    return (
      <ConfirmationPanel
        event={props.event}
        seats={props.seats}
        email={props.email}
        reference={props.reference}
        onClose={props.onClose}
      />
    )
  }

  if (availability(props.event) === 'sold-out') return <SoldOutPanel />

  return <ReservationForm {...props} />
}

function ReservationForm({
  event,
  state,
  onState,
  seats,
  onSeats,
  email,
  onEmail,
  onClose,
}: BodyProps) {
  const [currency, setCurrency] = useState<Currency>('KES')
  const [method, setMethod] = useState<PaymentMethod>('mpesa')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const unit = currency === 'KES' ? event.priceKes : event.priceUsd
  const total = unit * seats
  const free = event.priceKes === 0
  const maxSeats = Math.min(event.seatsRemaining, 10)
  const showNotice = state !== 'idle' && state !== 'pending'

  const submitLabel = buildSubmitLabel({
    state,
    method,
    free,
    amount: formatMoney(total, currency),
  })

  async function startPayment() {
    const problem = validate({ name, email, method, phone, terms })
    if (problem) {
      setError(problem)
      return
    }

    setError(null)
    onState('pending')

    // PAY-02 / PAY-03 — in production this posts to our server, which triggers
    // the STK push and completes the booking only when the provider callback is
    // verified. Nothing here may be trusted to confirm a payment.
    onState(await simulateGatewayRoundTrip())
  }

  return (
    <div className="p-7">
      <SeatPicker
        seats={seats}
        maxSeats={maxSeats}
        onSeats={onSeats}
        remaining={event.seatsRemaining}
        capacity={event.capacity}
        free={free}
        currency={currency}
        onCurrency={setCurrency}
      />

      <section className="mt-7">
        <h3 className="text-sm font-bold text-ink-900">Delegate details</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <LabelledInput
            label="Full name"
            value={name}
            onChange={setName}
            autoComplete="name"
          />
          <LabelledInput
            label="Email for the ticket"
            type="email"
            value={email}
            onChange={onEmail}
            autoComplete="email"
          />
        </div>
      </section>

      {free ? null : (
        <PaymentMethodSection
          method={method}
          onMethod={setMethod}
          phone={phone}
          onPhone={setPhone}
        />
      )}

      <TotalSection
        seats={seats}
        unit={unit}
        total={total}
        free={free}
        currency={currency}
        terms={terms}
        onTerms={setTerms}
      />

      {showNotice ? (
        <PaymentStateNotice
          state={state}
          method={method}
          onRetry={() => onState('idle')}
        />
      ) : null}

      {error ? (
        <p role="alert" className="mt-4 text-xs text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={startPayment}
          disabled={state === 'pending'}
          className="flex-1 bg-signal-500 text-ink-950 hover:bg-signal-400"
          size="lg"
        >
          {submitLabel}
        </Button>
        <Button variant="outline" size="lg" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <p className="mt-4 text-[0.6875rem] leading-relaxed text-muted-foreground">
        Your seat is confirmed only once payment is verified. A QR-coded entry
        ticket is emailed immediately after confirmation.
      </p>
    </div>
  )
}

/** Returns the first problem, or null when the form is ready to submit. */
function validate({
  name,
  email,
  method,
  phone,
  terms,
}: Readonly<{
  name: string
  email: string
  method: PaymentMethod
  phone: string
  terms: boolean
}>): string | null {
  if (!name.trim() || !email.trim()) {
    return 'Please give us a name and email for the ticket.'
  }
  if (method === 'mpesa' && !phone.trim()) {
    return 'An M-Pesa number is required to receive the payment prompt.'
  }
  if (!terms) return 'Please accept the booking terms.'
  return null
}

function TotalSection({
  seats,
  unit,
  total,
  free,
  currency,
  terms,
  onTerms,
}: Readonly<{
  seats: number
  unit: number
  total: number
  free: boolean
  currency: Currency
  terms: boolean
  onTerms: (value: boolean) => void
}>) {
  return (
    <section className="mt-7 border-t border-border pt-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            {seats} × {free ? 'Complimentary' : formatMoney(unit, currency)}
          </p>
          <p className="numeric mt-1 text-2xl font-bold text-ink-900">
            {free ? 'Free' : formatMoney(total, currency)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <Checkbox
          id="booking-terms"
          checked={terms}
          onCheckedChange={(value) => onTerms(value === true)}
          className="mt-0.5"
        />
        <label
          htmlFor="booking-terms"
          className="text-xs leading-relaxed text-muted-foreground"
        >
          I accept the{' '}
          <a
            href="/terms"
            className="text-ink-700 underline underline-offset-2"
          >
            booking and cancellation terms
          </a>{' '}
          and consent to my details being processed under the{' '}
          <a
            href="/privacy"
            className="text-ink-700 underline underline-offset-2"
          >
            privacy notice
          </a>
          .
        </label>
      </div>
    </section>
  )
}

function ConfirmationPanel({
  event,
  seats,
  email,
  reference,
  onClose,
}: Readonly<{
  event: SiteEvent
  seats: number
  email: string
  reference: string
  onClose: () => void
}>) {
  return (
    <div className="p-7">
      <div className="flex items-start gap-4">
        <span className="inline-flex size-11 flex-none items-center justify-center bg-signal-500">
          <FiCheck className="size-5 text-ink-950" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-ink-900">Seat confirmed</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {seats} seat{seats > 1 ? 's' : ''} reserved for {event.title}.
          </p>
        </div>
      </div>

      <div className="mt-7 border border-border">
        <div className="border-b border-border bg-sand-50 px-6 py-3">
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Your ticket reference
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="numeric text-xl font-bold tracking-wide text-ink-900">
            {reference}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A QR-coded entry ticket has been emailed to{' '}
            <span className="font-medium text-ink-900">{email}</span>. Present
            the QR code at registration — it is scanned once at entry.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            A receipt has been sent to the same address.
          </p>
        </div>
      </div>

      <Button className="mt-7 w-full" onClick={onClose}>
        Done
      </Button>
    </div>
  )
}

function PaymentStateNotice({
  state,
  method,
  onRetry,
}: Readonly<{
  state: PaymentState
  method: PaymentMethod
  onRetry: () => void
}>) {
  const copy: Partial<Record<PaymentState, { title: string; body: string }>> = {
    failed: {
      title: 'Payment was not completed',
      body:
        method === 'mpesa'
          ? 'The M-Pesa request was declined or the PIN was not entered. No money has left your account.'
          : 'Your card was declined. No charge has been made.',
    },
    cancelled: {
      title: 'Payment cancelled',
      body: 'You cancelled the request. Your seat has not been reserved.',
    },
    timeout: {
      title: 'Payment request timed out',
      body: 'We did not hear back in time. If you were charged, the amount will be reversed automatically.',
    },
  }

  const content = copy[state]
  if (!content) return null

  return (
    <div
      role="alert"
      className="mt-5 flex items-start gap-3 border border-destructive/40 bg-destructive/5 p-4"
    >
      <FiAlertCircle
        className="mt-0.5 size-4 flex-none text-destructive"
        aria-hidden="true"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold text-destructive">
          {content.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{content.body}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-xs font-semibold tracking-widest text-signal-700 uppercase underline underline-offset-4"
        >
          Try again
        </button>
      </div>
      <FiX className="size-4 text-transparent" aria-hidden="true" />
    </div>
  )
}

function MethodOption({
  selected,
  onSelect,
  icon: Icon,
  title,
  detail,
}: Readonly<{
  selected: boolean
  onSelect: () => void
  icon: typeof FiSmartphone
  title: string
  detail: string
}>) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'flex items-start gap-3 border p-4 text-left transition-colors',
        selected
          ? 'border-signal-500 bg-signal-50'
          : 'border-border bg-white hover:border-ink-300',
      )}
    >
      <Icon
        className={cn(
          'mt-0.5 size-4 flex-none',
          selected ? 'text-signal-700' : 'text-ink-400',
        )}
        aria-hidden="true"
      />
      <span>
        <span className="block text-sm font-bold text-ink-900">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {detail}
        </span>
      </span>
    </button>
  )
}

function LabelledInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
}: Readonly<{
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  autoComplete?: string
}>) {
  const id = `res-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold tracking-[0.08em] text-ink-800 uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full border border-input bg-white px-4 text-sm outline-none transition-colors focus:border-signal-500"
      />
    </div>
  )
}

function simulateGatewayRoundTrip(): Promise<PaymentState> {
  return new Promise((resolve) => setTimeout(() => resolve('success'), 1800))
}

function hash(value: string): number {
  let result = 0
  for (const character of value) {
    result = Math.trunc(
      (result << 5) - result + (character.codePointAt(0) ?? 0),
    )
  }
  return result
}
