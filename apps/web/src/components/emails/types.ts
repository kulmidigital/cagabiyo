/**
 * Shapes shared by the templates and the server-side senders.
 *
 * These mirror the zod schemas in `lib/server/schemas.ts` — the schemas are the
 * runtime gate, these are the compile-time contract for the templates.
 */

export type ContactPayload = {
  intent: 'advisory' | 'training' | 'events' | 'careers' | 'general'
  name: string
  organisation?: string
  email: string
  phone?: string
  service?: string
  headcount?: string
  message: string
}

export type CorporateRequestPayload = {
  company: string
  industry?: string
  contactName: string
  role?: string
  email: string
  phone?: string
  headcount: number
  modules: Array<string>
  delivery: 'On-site' | 'Virtual' | 'Off-site'
  location?: string
  timeframe?: string
  notes?: string
  currency: 'KES' | 'USD'
  reference: string
  total: string
}

export type CustomProgrammePayload = {
  organisation: string
  email: string
  audience?: string
  modules: Array<string>
  focusAreas: Array<string>
  estimatedDays: number
}

export type ConsultancyPayload = {
  name: string
  organisation?: string
  email: string
  phone?: string
  service?: string
  preferredDate?: string
  message: string
}

export type NewsletterPayload = {
  email: string
  consentAt: string
}
