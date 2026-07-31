import { useMemo, useState } from 'react'
import { FiCalendar, FiGrid, FiList } from 'react-icons/fi'

import { EventCard } from '@/components/events/event-card'
import { SeatReservation } from '@/components/events/seat-reservation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  availability,
  availabilityLabel,
  availabilityTone,
  eventFormats,
  eventKinds,
  events,
  formatEventDate,
  formatEventTime,
  groupEventsByMonth,
} from '@/lib/content/events'
import type { EventFormat, EventKind, SiteEvent } from '@/lib/content/events'

type View = 'calendar' | 'grid' | 'list'

const viewOptions = [
  { value: 'calendar', label: 'Calendar', icon: FiCalendar },
  { value: 'grid', label: 'Grid', icon: FiGrid },
  { value: 'list', label: 'List', icon: FiList },
] as const

export function EventsBrowser() {
  const [view, setView] = useState<View>('calendar')
  const [kind, setKind] = useState<EventKind | null>(null)
  const [format, setFormat] = useState<EventFormat | null>(null)
  const [booking, setBooking] = useState<SiteEvent | null>(null)

  const filtered = useMemo(
    () =>
      events
        .filter((event) => (kind ? event.kind === kind : true))
        .filter((event) => (format ? event.format === format : true))
        .sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    [kind, format],
  )

  const months = useMemo(() => groupEventsByMonth(filtered), [filtered])

  return (
    <div className="shell">
      {/* Controls */}
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:gap-6 sm:pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">
          <Chip
            active={!kind && !format}
            onClick={() => {
              setKind(null)
              setFormat(null)
            }}
          >
            Everything
          </Chip>
          {eventKinds.map((item) => (
            <Chip
              key={item}
              active={kind === item}
              onClick={() => setKind(kind === item ? null : item)}
            >
              {item}
            </Chip>
          ))}
          <span
            className="mx-1 hidden h-5 w-px bg-border sm:block"
            aria-hidden="true"
          />
          {eventFormats.map((item) => (
            <Chip
              key={item}
              active={format === item}
              onClick={() => setFormat(format === item ? null : item)}
            >
              {item}
            </Chip>
          ))}
        </div>

        {/* EVENT-02 — list and calendar/grid views */}
        <div
          role="radiogroup"
          aria-label="View"
          className="inline-flex flex-none self-start border border-border bg-white p-0.5"
        >
          {viewOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={view === option.value}
              onClick={() => setView(option.value)}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-widest uppercase transition-colors sm:px-4',
                view === option.value
                  ? 'bg-ink-900 text-white'
                  : 'text-muted-foreground hover:text-ink-900',
              )}
            >
              <option.icon className="size-3.5" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <p
        className="mt-5 text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        <span className="numeric font-semibold text-ink-900">
          {filtered.length}
        </span>{' '}
        upcoming {filtered.length === 1 ? 'date' : 'dates'}
      </p>

      <Results
        view={view}
        events={filtered}
        months={months}
        onReserve={setBooking}
      />

      <SeatReservation
        event={booking}
        open={Boolean(booking)}
        onOpenChange={(open) => !open && setBooking(null)}
      />
    </div>
  )
}

/** Picks the presentation for the current view without a ternary chain. */
function Results({
  view,
  events: list,
  months,
  onReserve,
}: Readonly<{
  view: View
  events: Array<SiteEvent>
  months: Array<{ month: string; events: Array<SiteEvent> }>
  onReserve: (event: SiteEvent) => void
}>) {
  if (list.length === 0) return <EmptyResults />
  if (view === 'grid') return <GridResults events={list} />
  if (view === 'list') return <ListResults events={list} />
  return <CalendarResults months={months} onReserve={onReserve} />
}

function EmptyResults() {
  return (
    <div className="mt-8 border border-border bg-sand-50 px-6 py-6 text-center sm:py-10">
      <p className="text-lg font-bold text-ink-900">
        Nothing scheduled under those filters
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Clear the filters, or ask us to run a programme in-house.
      </p>
    </div>
  )
}

function GridResults({ events: list }: Readonly<{ events: Array<SiteEvent> }>) {
  return (
    <div className="rule-grid mt-8 grid sm:grid-cols-2 xl:grid-cols-3">
      {list.map((event) => (
        <span key={event.slug} id={event.slug} className="contents">
          <EventCard event={event} />
        </span>
      ))}
    </div>
  )
}

function ListResults({ events: list }: Readonly<{ events: Array<SiteEvent> }>) {
  return (
    <div className="rule-grid mt-8 grid">
      {list.map((event) => (
        <span key={event.slug} id={event.slug} className="contents">
          <EventCard event={event} variant="row" />
        </span>
      ))}
    </div>
  )
}

function CalendarResults({
  months,
  onReserve,
}: Readonly<{
  months: Array<{ month: string; events: Array<SiteEvent> }>
  onReserve: (event: SiteEvent) => void
}>) {
  return (
    <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
      {months.map((month) => (
        <section key={month.month}>
          <div className="flex items-center gap-4 sm:gap-5">
            <h2 className="text-base font-bold text-ink-900 sm:text-lg">
              {month.month}
            </h2>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span className="numeric text-xs text-muted-foreground">
              {month.events.length}{' '}
              {month.events.length === 1 ? 'date' : 'dates'}
            </span>
          </div>

          <ul className="mt-5 divide-y divide-border border-y border-border sm:mt-6">
            {month.events.map((event) => {
              const state = availability(event)
              const soldOut = state === 'sold-out'
              return (
                <li
                  key={event.slug}
                  id={event.slug}
                  className="edge-card grid gap-4 bg-white py-5 transition-colors hover:bg-sand-50 sm:gap-5 sm:py-6 lg:grid-cols-[9rem_1fr_auto] lg:items-center lg:gap-8"
                >
                  <div className="lg:pl-6">
                    <p className="numeric text-sm font-bold text-ink-900">
                      {formatEventDate(event)}
                    </p>
                    <p className="numeric mt-1 text-xs text-muted-foreground">
                      {formatEventTime(event)}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                        {event.kind}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {event.format === 'Virtual'
                          ? 'Online'
                          : `${event.venue}, ${event.city}`}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-base font-bold text-ink-900">
                      {event.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {event.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 lg:justify-end lg:pr-6">
                    <div className="lg:text-right">
                      <p
                        className={cn(
                          'text-xs font-semibold',
                          availabilityTone[state],
                        )}
                      >
                        {availabilityLabel[state]}
                      </p>
                      {!soldOut ? (
                        <p className="numeric text-xs text-muted-foreground">
                          {event.seatsRemaining} left
                        </p>
                      ) : null}
                    </div>
                    <Button
                      size="sm"
                      disabled={soldOut}
                      onClick={() => onReserve(event)}
                      className={cn(
                        !soldOut &&
                          'bg-signal-500 text-ink-950 hover:bg-signal-400',
                      )}
                    >
                      {soldOut ? 'Sold out' : 'Reserve'}
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: Readonly<{
  active: boolean
  onClick: () => void
  children: React.ReactNode
}>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'shrink-0 border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-ink-900 bg-ink-900 text-white'
          : 'border-border bg-white text-ink-700 hover:border-ink-300 hover:bg-sand-50',
      )}
    >
      {children}
    </button>
  )
}
