/**
 * Events & workshops (§4.6).
 *
 * Seat counts drive the availability display (EVENT-05) and, in the built
 * system, the reservation hold that prevents overselling (BOOK-WORKSHOP-06).
 * `format` distinguishes physical from virtual delivery (EVENT-03) and decides
 * which Event structured-data attendance mode is emitted (EVENT-09).
 */

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

/**
 * Empty until the client supplies a calendar.
 *
 * This held nine invented events — dates, venues, named speakers, seat counts
 * and prices, none of them real. Every surface that renders events falls back
 * to a "coming soon" state when the list is empty, so publishing a calendar is
 * a matter of filling this array and nothing else.
 */
export const events: Array<SiteEvent> = []

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
