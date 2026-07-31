import { z } from 'zod'

/**
 * Runtime validation for every submission (requirement 6).
 *
 * The client validates for usability; this validates for trust. Anything
 * reaching a send function has already passed through here, so the templates
 * can assume well-formed input.
 */

// Piped rather than chained so the length checks run first: an empty field
// should say it is required, not that it is badly formatted. (z.string().email()
// is deprecated in zod v4 in favour of the top-level z.email().)
const email = z
  .string()
  .trim()
  .min(1, 'An email address is required.')
  .max(254)
  .pipe(z.email('That does not look like an email address.'))

const shortText = (label: string, max = 200) =>
  z.string().trim().min(1, `${label} is required.`).max(max)

const optionalText = (max = 200) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value === '' ? undefined : value))

/**
 * Honeypot: a field hidden from people but filled in by naive bots. Anything
 * non-empty is rejected before a message is sent (requirement 6, without a
 * CAPTCHA for now).
 */
export const honeypot = z
  .string()
  .max(0, 'Rejected.')
  .optional()
  .or(z.literal(''))

export const contactSchema = z.object({
  intent: z.enum(['advisory', 'training', 'events', 'careers', 'general']),
  name: shortText('Your name', 120),
  organisation: optionalText(160),
  email,
  phone: optionalText(40),
  service: optionalText(80),
  headcount: optionalText(10),
  message: shortText('A message', 5000),
  consent: z.literal(true, {
    message: 'Please confirm how we may use your details.',
  }),
  company: honeypot,
})

export const corporateRequestSchema = z.object({
  company: shortText('Company name', 160),
  industry: optionalText(120),
  contactName: shortText('A contact name', 120),
  role: optionalText(120),
  email,
  phone: optionalText(40),
  headcount: z.coerce
    .number()
    .int('Delegates must be a whole number.')
    .min(1, 'Enter at least one delegate.')
    .max(5000),
  modules: z
    .array(z.string().trim().min(1).max(160))
    .min(1, 'Select at least one training module.')
    .max(64),
  delivery: z.enum(['On-site', 'Virtual', 'Off-site']),
  location: optionalText(160),
  timeframe: optionalText(120),
  notes: optionalText(4000),
  currency: z.enum(['KES', 'USD']),
  reference: shortText('Reference', 60),
  total: shortText('Total', 60),
  consent: z.literal(true, {
    message: 'Please confirm how we may use your details.',
  }),
  website: honeypot,
})

export const customProgrammeSchema = z.object({
  organisation: shortText('Organisation', 160),
  email,
  audience: optionalText(200),
  modules: z
    .array(z.string().trim().min(1).max(160))
    .min(1, 'Add at least one module.')
    .max(64),
  focusAreas: z.array(z.string().trim().min(1).max(120)).max(16),
  estimatedDays: z.coerce.number().int().min(0).max(365),
  consent: z.literal(true, {
    message: 'Please confirm how we may use your details.',
  }),
  website: honeypot,
})

export const consultancySchema = z.object({
  name: shortText('Your name', 120),
  organisation: optionalText(160),
  email,
  phone: optionalText(40),
  service: optionalText(80),
  preferredDate: optionalText(60),
  message: shortText('A message', 5000),
  consent: z.literal(true, {
    message: 'Please confirm how we may use your details.',
  }),
  company: honeypot,
})

export const newsletterSchema = z.object({
  email,
  consent: z.literal(true, {
    message: 'Please confirm you are happy to receive these emails.',
  }),
  website: honeypot,
})

export type ContactInput = z.infer<typeof contactSchema>
export type CorporateRequestInput = z.infer<typeof corporateRequestSchema>
export type CustomProgrammeInput = z.infer<typeof customProgrammeSchema>
export type ConsultancyInput = z.infer<typeof consultancySchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>

/** Collapses a ZodError into the flat list the forms already render. */
export function toMessages(error: z.ZodError): Array<string> {
  return error.issues.map((issue) => issue.message)
}
