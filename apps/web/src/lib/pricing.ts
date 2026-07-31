/**
 * Indicative pro-forma pricing for corporate training requests (BOOK-CORP-06).
 *
 * IMPORTANT — the proposal does not define pricing rules, tax treatment,
 * validity periods or approval requirements for these quotes (§6.1 "Missing
 * details", §7.3). The bands below are therefore an explicit, reviewable
 * placeholder rather than an agreed rate card, and every generated document is
 * labelled indicative and subject to confirmation.
 *
 * When commercial terms are signed off, this module is the only thing that
 * needs to change.
 */

import type { Currency } from '@/lib/content/training'

/** PLACEHOLDER rate card — per delegate, per module. */
const BASE_RATE_KES = 18_500
const BASE_RATE_USD = 145

/** PLACEHOLDER — VAT at the standard Kenyan rate; treatment needs sign-off. */
export const VAT_RATE = 0.16

/** PLACEHOLDER — quote validity. */
export const VALIDITY_DAYS = 30

export type DeliveryChoice = 'On-site' | 'Virtual' | 'Off-site'

/** PLACEHOLDER — delivery loading, reflecting venue and travel cost. */
const deliveryLoading: Record<DeliveryChoice, number> = {
  Virtual: 0.85,
  'On-site': 1,
  'Off-site': 1.25,
}

type VolumeBand = { min: number; multiplier: number; label: string }

/** The floor band, and the fallback when headcount is below every threshold. */
const standardBand: VolumeBand = {
  min: 0,
  multiplier: 1,
  label: 'Standard rate',
}

/** PLACEHOLDER — volume discount bands, highest threshold first. */
const volumeBands: Array<VolumeBand> = [
  { min: 100, multiplier: 0.7, label: '30% volume discount (100+ delegates)' },
  { min: 50, multiplier: 0.78, label: '22% volume discount (50–99 delegates)' },
  { min: 25, multiplier: 0.85, label: '15% volume discount (25–49 delegates)' },
  { min: 10, multiplier: 0.93, label: '7% volume discount (10–24 delegates)' },
  standardBand,
]

export type QuoteInput = {
  headcount: number
  modules: Array<string>
  delivery: DeliveryChoice
  currency: Currency
}

export type QuoteLine = {
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export type Quote = {
  lines: Array<QuoteLine>
  subtotal: number
  discountLabel: string
  vat: number
  total: number
  currency: Currency
  reference: string
  issuedOn: Date
  validUntil: Date
}

export function buildQuote({
  headcount,
  modules,
  delivery,
  currency,
}: QuoteInput): Quote {
  const base = currency === 'KES' ? BASE_RATE_KES : BASE_RATE_USD
  const band = volumeBands.find((b) => headcount >= b.min) ?? standardBand
  const unitPrice = Math.round(
    base * deliveryLoading[delivery] * band.multiplier,
  )

  const lines: Array<QuoteLine> = modules.map((module) => ({
    description: `${module} — ${delivery.toLowerCase()} delivery`,
    quantity: headcount,
    unitPrice,
    amount: unitPrice * headcount,
  }))

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)
  const vat = Math.round(subtotal * VAT_RATE)
  const issuedOn = new Date()
  const validUntil = new Date(issuedOn.getTime() + VALIDITY_DAYS * 86_400_000)

  return {
    lines,
    subtotal,
    discountLabel: band.label,
    vat,
    total: subtotal + vat,
    currency,
    reference: buildReference(issuedOn),
    issuedOn,
    validUntil,
  }
}

/**
 * PAY-07 — every pro-forma carries a unique bank reference code, quoted on the
 * transfer so settlement reconciles automatically.
 *
 * Generated client-side here for preview only. In production the reference must
 * be issued server-side to guarantee uniqueness across concurrent requests.
 */
const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function buildReference(issuedOn: Date): string {
  const stamp = issuedOn.toISOString().slice(2, 10).replaceAll('-', '')

  // 32 symbols divides 256 evenly, so drawing bytes and taking the remainder
  // stays uniform — no modulo bias to correct for. I and O and 0 and 1 are out
  // of the alphabet because these codes get read off a screen and typed into a
  // bank transfer.
  const bytes = crypto.getRandomValues(new Uint8Array(5))
  const random = Array.from(
    bytes,
    (byte) => REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length],
  ).join('')

  return `CC-PF-${stamp}-${random}`
}

export function formatAmount(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatQuoteDate(date: Date): string {
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Nairobi',
  }).format(date)
}
