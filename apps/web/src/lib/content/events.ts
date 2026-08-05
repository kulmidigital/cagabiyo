/**
 * Events & workshops (§4.6).
 *
 * Seat counts drive the availability display (EVENT-05) and, in the built
 * system, the reservation hold that prevents overselling (BOOK-WORKSHOP-06).
 * `format` distinguishes physical from virtual delivery (EVENT-03) and decides
 * which Event structured-data attendance mode is emitted (EVENT-09).
 */

import { photos } from '@/lib/images'
import type { Photo } from '@/lib/images'

export type EventFormat = 'In person' | 'Virtual' | 'Hybrid'
export type EventKind = 'Workshop' | 'Masterclass' | 'Webinar' | 'Forum'

export type SiteEvent = {
  slug: string
  title: string
  kind: EventKind
  format: EventFormat
  /** ISO 8601 with offset — East Africa Time is UTC+3. */
  startsAt: string
  endsAt: string
  venue: string
  city: string
  country: string
  summary: string
  photo: Photo
  capacity: number
  seatsRemaining: number
  priceKes: number
  priceUsd: number
  /** Taxonomy focus area this event sits under (CAP-07). */
  focusAreaId: number
  speakers: Array<string>
  featured?: boolean
}

export const events: Array<SiteEvent> = [
  {
    slug: 'board-risk-oversight-retreat-aug-2026',
    title: 'Board Risk Oversight Retreat',
    kind: 'Masterclass',
    format: 'In person',
    startsAt: '2026-08-20T08:30:00+03:00',
    endsAt: '2026-08-21T16:30:00+03:00',
    venue: 'Fairmont Mount Kenya Safari Club',
    city: 'Nanyuki',
    country: 'Kenya',
    summary:
      'Two days with sitting directors on board risk oversight: appetite, escalation thresholds and the papers that support it.',
    photo: photos.boardroomWide,
    capacity: 40,
    seatsRemaining: 7,
    priceKes: 185000,
    priceUsd: 1440,
    focusAreaId: 6,
    speakers: ['Dr. Amara Ochieng', 'Wanjiru Kamau'],
    featured: true,
  },
  {
    slug: 'transfer-pricing-clinic-sep-2026',
    title: 'Transfer Pricing Documentation Clinic',
    kind: 'Workshop',
    format: 'In person',
    startsAt: '2026-09-03T08:30:00+03:00',
    endsAt: '2026-09-04T16:00:00+03:00',
    venue: 'CaliberCode Training Centre, Wabera Street',
    city: 'Nairobi',
    country: 'Kenya',
    summary:
      'Bring a live file. Work through functional analysis, method selection and benchmarking with practitioners who defend these positions for a living.',
    photo: photos.deskReview,
    capacity: 30,
    seatsRemaining: 12,
    priceKes: 72000,
    priceUsd: 560,
    focusAreaId: 3,
    speakers: ['Kwame Mensah', 'Fatuma Abdi'],
    featured: true,
  },
  {
    slug: 'digital-asset-compliance-forum-sep-2026',
    title: 'East Africa Digital Asset Compliance Forum',
    kind: 'Forum',
    format: 'Hybrid',
    startsAt: '2026-09-17T09:00:00+03:00',
    endsAt: '2026-09-17T17:00:00+03:00',
    venue: 'Radisson Blu Hotel, Upper Hill',
    city: 'Nairobi',
    country: 'Kenya',
    summary:
      'Supervisors, exchanges and compliance leads on where virtual asset regulation in the region is heading — and what to build before it arrives.',
    photo: photos.panelDiscussion,
    capacity: 220,
    seatsRemaining: 96,
    priceKes: 35000,
    priceUsd: 275,
    focusAreaId: 9,
    speakers: ['Samuel Otieno', 'Dr. Amara Ochieng', 'Grace Mutiso'],
    featured: true,
  },
  {
    slug: 'is-audit-bootcamp-oct-2026',
    title: 'IS Audit Bootcamp: ITGC to COBIT',
    kind: 'Workshop',
    format: 'In person',
    startsAt: '2026-10-06T08:30:00+03:00',
    endsAt: '2026-10-08T16:30:00+03:00',
    venue: 'CaliberCode Training Centre, Wabera Street',
    city: 'Nairobi',
    country: 'Kenya',
    summary:
      'Three days of hands-on IT general controls testing against live system evidence, mapped through to COBIT objectives.',
    photo: photos.dataCentre,
    capacity: 24,
    seatsRemaining: 3,
    priceKes: 96000,
    priceUsd: 750,
    focusAreaId: 7,
    speakers: ['Brian Kiptoo'],
  },
  {
    slug: 'ifrs-update-webinar-oct-2026',
    title: 'IFRS Update: What Changes This Reporting Cycle',
    kind: 'Webinar',
    format: 'Virtual',
    startsAt: '2026-10-15T14:00:00+03:00',
    endsAt: '2026-10-15T16:00:00+03:00',
    venue: 'Online',
    city: 'Online',
    country: 'Kenya',
    summary:
      'A focused two hours on the standards changes that will affect East African reporting entities this cycle, with worked transition examples.',
    photo: photos.portraitBlue,
    capacity: 500,
    seatsRemaining: 341,
    priceKes: 0,
    priceUsd: 0,
    focusAreaId: 2,
    speakers: ['Wanjiru Kamau'],
  },
  {
    slug: 'executive-negotiation-masterclass-nov-2026',
    title: 'Executive Negotiation Masterclass',
    kind: 'Masterclass',
    format: 'In person',
    startsAt: '2026-11-05T08:30:00+03:00',
    endsAt: '2026-11-06T16:00:00+03:00',
    venue: 'Villa Rosa Kempinski',
    city: 'Nairobi',
    country: 'Kenya',
    summary:
      'Live negotiation under observation, with structured debriefs. Limited to twenty senior leaders so everyone negotiates repeatedly.',
    photo: photos.execOutdoor,
    capacity: 20,
    seatsRemaining: 11,
    priceKes: 135000,
    priceUsd: 1050,
    focusAreaId: 12,
    speakers: ['Grace Mutiso'],
  },
  {
    slug: 'esg-reporting-workshop-nov-2026',
    title: 'ESG Reporting Readiness Workshop',
    kind: 'Workshop',
    format: 'Hybrid',
    startsAt: '2026-11-19T09:00:00+03:00',
    endsAt: '2026-11-20T15:30:00+03:00',
    venue: 'Kampala Serena Hotel',
    city: 'Kampala',
    country: 'Uganda',
    summary:
      'Materiality, data collection and assurance-ready disclosure for institutions preparing their first substantive ESG report.',
    photo: photos.portraitYellow,
    capacity: 60,
    seatsRemaining: 28,
    priceKes: 58000,
    priceUsd: 450,
    focusAreaId: 6,
    speakers: ['Fatuma Abdi'],
  },
  {
    slug: 'forensic-analytics-clinic-dec-2026',
    title: 'Forensic Analytics Clinic',
    kind: 'Workshop',
    format: 'In person',
    startsAt: '2026-12-03T08:30:00+03:00',
    endsAt: '2026-12-04T16:00:00+03:00',
    venue: 'CaliberCode Training Centre, Wabera Street',
    city: 'Nairobi',
    country: 'Kenya',
    summary:
      'Build full-population tests for the fraud typologies that recur in East African institutions, using real anonymised datasets.',
    photo: photos.nightWork,
    capacity: 28,
    seatsRemaining: 19,
    priceKes: 78000,
    priceUsd: 610,
    focusAreaId: 4,
    speakers: ['Samuel Otieno', 'Brian Kiptoo'],
  },
  {
    slug: 'public-sector-ipsas-forum-dec-2026',
    title: 'Public Sector IPSAS Transition Forum',
    kind: 'Forum',
    format: 'In person',
    startsAt: '2026-12-10T08:00:00+03:00',
    endsAt: '2026-12-10T17:00:00+03:00',
    venue: 'Kenyatta International Convention Centre',
    city: 'Nairobi',
    country: 'Kenya',
    summary:
      'County and national government finance teams on the practical mechanics of the cash-to-accrual transition.',
    photo: photos.workshopRoom,
    capacity: 300,
    seatsRemaining: 154,
    priceKes: 25000,
    priceUsd: 195,
    focusAreaId: 2,
    speakers: ['Wanjiru Kamau', 'Kwame Mensah'],
  },
]

export const eventBySlug = (slug: string): SiteEvent | undefined =>
  events.find((e) => e.slug === slug)

export const featuredEvents = events.filter((e) => e.featured)

export const eventKinds: Array<EventKind> = [
  'Workshop',
  'Masterclass',
  'Webinar',
  'Forum',
]
export const eventFormats: Array<EventFormat> = [
  'In person',
  'Virtual',
  'Hybrid',
]

/** EVENT-05 — how urgently to present remaining availability. */
export type Availability = 'sold-out' | 'last-seats' | 'filling' | 'open'

export function availability(event: SiteEvent): Availability {
  if (event.seatsRemaining <= 0) return 'sold-out'
  const ratio = event.seatsRemaining / event.capacity
  if (event.seatsRemaining <= 5 || ratio <= 0.1) return 'last-seats'
  if (ratio <= 0.35) return 'filling'
  return 'open'
}

export const availabilityLabel: Record<Availability, string> = {
  'sold-out': 'Sold out',
  'last-seats': 'Final seats',
  filling: 'Filling fast',
  open: 'Seats available',
}

/** Text colour for each availability state, shared by every event surface. */
export const availabilityTone: Record<Availability, string> = {
  'sold-out': 'text-muted-foreground',
  'last-seats': 'text-signal-700',
  filling: 'text-ink-600',
  open: 'text-ink-600',
}

// -- Date helpers ------------------------------------------------------------

const EAT = 'Africa/Nairobi'

export function eventMonthKey(event: SiteEvent): string {
  return new Intl.DateTimeFormat('en-KE', {
    month: 'long',
    year: 'numeric',
    timeZone: EAT,
  }).format(new Date(event.startsAt))
}

export function formatEventDate(event: SiteEvent): string {
  const start = new Date(event.startsAt)
  const end = new Date(event.endsAt)
  const day = new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'short',
    timeZone: EAT,
  })
  const sameDay = start.toDateString() === end.toDateString()
  return sameDay
    ? day.format(start)
    : `${day.format(start)} – ${day.format(end)}`
}

export function formatEventTime(event: SiteEvent): string {
  const time = new Intl.DateTimeFormat('en-KE', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: EAT,
  })
  return `${time.format(new Date(event.startsAt))} – ${time.format(new Date(event.endsAt))} EAT`
}

export function eventDayParts(event: SiteEvent): {
  day: string
  month: string
} {
  const d = new Date(event.startsAt)
  return {
    day: new Intl.DateTimeFormat('en-KE', {
      day: '2-digit',
      timeZone: EAT,
    }).format(d),
    month: new Intl.DateTimeFormat('en-KE', { month: 'short', timeZone: EAT })
      .format(d)
      .toUpperCase(),
  }
}

/** Group events by calendar month for the calendar view (EVENT-02). */
export function groupEventsByMonth(
  list: Array<SiteEvent>,
): Array<{ month: string; events: Array<SiteEvent> }> {
  const groups = new Map<string, Array<SiteEvent>>()
  for (const event of [...list].sort((a, b) =>
    a.startsAt.localeCompare(b.startsAt),
  )) {
    const key = eventMonthKey(event)
    const bucket = groups.get(key)
    if (bucket) bucket.push(event)
    else groups.set(key, [event])
  }
  return [...groups].map(([month, evts]) => ({ month, events: evts }))
}
