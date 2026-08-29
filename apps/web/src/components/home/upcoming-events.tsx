import { FiArrowRight, FiArrowUpRight, FiMapPin, FiVideo } from 'react-icons/fi'

import { SectionHeading } from '@/components/common/section'
import { ButtonLink } from '@/components/common/button-link'
import { SmartLink } from '@/components/common/smart-link'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/content/training'
import {
  availability,
  availabilityLabel,
  availabilityTone,
  eventDayParts,
  events,
  formatEventDate,
  formatEventTime,
} from '@/lib/content/events'

export function UpcomingEvents() {
  const upcoming = [...events]
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 3)

  return (
    <section className="py-6 sm:py-10">
      <div className="shell">
        <SectionHeading eyebrow="Events & workshops" title="Upcoming Dates" />

        <ul className="mt-8 sm:mt-10">
          {upcoming.map((event, index) => {
            const { day, month } = eventDayParts(event)
            const state = availability(event)
            const taken = 1 - event.seatsRemaining / event.capacity
            const free = event.priceKes === 0

            return (
              <li
                key={event.slug}
                className={cn(
                  'border-b border-border',
                  index === 0 && 'border-t',
                )}
              >
                <SmartLink
                  href={`/events#${event.slug}`}
                  className="group grid gap-5 py-6 transition-colors sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8"
                >
                  <span className="flex items-baseline gap-2 sm:w-20 sm:flex-col sm:items-start sm:gap-0">
                    <span className="numeric text-3xl leading-none font-bold text-ink-900 transition-colors group-hover:text-signal-600">
                      {day}
                    </span>
                    <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:mt-2">
                      {month}
                    </span>
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                        {event.kind}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        {event.format === 'Virtual' ? (
                          <FiVideo className="size-3.5" aria-hidden="true" />
                        ) : (
                          <FiMapPin className="size-3.5" aria-hidden="true" />
                        )}
                        {event.format === 'Virtual' ? 'Online' : event.city}
                      </span>
                    </span>

                    <span className="mt-1.5 block text-base leading-snug font-bold text-ink-900 sm:text-lg">
                      {event.title}
                    </span>

                    <span className="numeric mt-1.5 block text-xs text-muted-foreground">
                      {formatEventDate(event)} · {formatEventTime(event)}
                    </span>
                  </span>

                  <span className="flex items-center gap-6 sm:justify-end">
                    <span className="sm:text-right">
                      <span
                        className={cn(
                          'block text-xs font-semibold',
                          availabilityTone[state],
                        )}
                      >
                        {availabilityLabel[state]}
                      </span>

                      {/* How full the cohort is, at a glance. */}
                      <span
                        className="mt-2 block h-0.5 w-24 bg-ink-200 sm:ml-auto"
                        aria-hidden="true"
                      >
                        <span
                          className={cn(
                            'block h-full',
                            state === 'last-seats'
                              ? 'bg-signal-500'
                              : 'bg-ink-400',
                          )}
                          style={{ width: `${Math.round(taken * 100)}%` }}
                        />
                      </span>

                      <span className="numeric mt-2.5 block text-sm font-bold text-ink-900">
                        {free
                          ? 'Complimentary'
                          : formatMoney(event.priceKes, 'KES')}
                      </span>
                    </span>

                    <FiArrowUpRight
                      className="size-4 shrink-0 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-500"
                      aria-hidden="true"
                    />
                  </span>
                </SmartLink>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 flex justify-end">
          <ButtonLink
            href="/events"
            className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
          >
            Full calendar
            <FiArrowRight
              className="size-3.5"
              data-icon="inline-end"
              aria-hidden="true"
            />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
