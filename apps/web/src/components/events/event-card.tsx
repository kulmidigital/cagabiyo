import type { ReactNode } from 'react'
import { FiArrowUpRight, FiMapPin, FiUsers, FiVideo } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { SmartLink } from '@/components/common/smart-link'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/content/training'
import type { Currency } from '@/lib/content/training'
import {
  availability,
  availabilityLabel,
  availabilityTone,
  eventDayParts,
  formatEventDate,
  formatEventTime,
} from '@/lib/content/events'
import type { SiteEvent } from '@/lib/content/events'

type CardProps = Readonly<{
  event: SiteEvent
  currency?: Currency
  className?: string
  variant?: 'grid' | 'row'
}>

/** Everything both variants need, derived once. Not a hook — plain helper. */
function buildEventView(event: SiteEvent, currency: Currency) {
  const state = availability(event)
  const amount = currency === 'KES' ? event.priceKes : event.priceUsd
  const free = event.priceKes === 0

  return {
    state,
    seatTone: availabilityTone[state],
    soldOut: state === 'sold-out',
    ...eventDayParts(event),
    price: free ? 'Free' : formatMoney(amount, currency),
    priceLong: free ? 'Complimentary' : formatMoney(amount, currency),
  }
}

function FormatIcon({
  event,
  className,
}: Readonly<{ event: SiteEvent; className: string }>) {
  return event.format === 'In person' ? (
    <FiMapPin className={className} aria-hidden="true" />
  ) : (
    <FiVideo className={className} aria-hidden="true" />
  )
}

function ArrowBadge() {
  return (
    <span className="inline-flex size-9 flex-none items-center justify-center border border-border text-ink-600 transition-colors group-hover:border-signal-500 group-hover:bg-signal-500 group-hover:text-ink-950">
      <FiArrowUpRight className="size-4" aria-hidden="true" />
    </span>
  )
}

export function EventCard({
  event,
  currency = 'KES',
  className,
  variant = 'grid',
}: CardProps) {
  const view = buildEventView(event, currency)

  return variant === 'row' ? (
    <EventRow event={event} view={view} className={className} />
  ) : (
    <EventTile event={event} view={view} className={className} />
  )
}

type View = ReturnType<typeof buildEventView>

type VariantProps = Readonly<{
  event: SiteEvent
  view: View
  className?: string
}>

function CardLink({
  event,
  className,
  children,
}: Readonly<{ event: SiteEvent; className: string; children: ReactNode }>) {
  return (
    <SmartLink href={`/events#${event.slug}`} className={className}>
      {children}
    </SmartLink>
  )
}

function EventRow({ event, view, className }: VariantProps) {
  return (
    <CardLink
      event={event}
      className={cn(
        'edge-card group grid items-center gap-6 bg-white p-6 transition-colors hover:bg-sand-50 sm:grid-cols-[auto_1fr_auto]',
        className,
      )}
    >
      <div className="flex size-16 flex-none flex-col items-center justify-center border border-border">
        <span className="numeric text-xl leading-none font-bold text-ink-900">
          {view.day}
        </span>
        <span className="mt-1 text-[0.625rem] font-semibold tracking-[0.12em] text-muted-foreground">
          {view.month}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
            {event.kind}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <FormatIcon event={event} className="size-3.5" />
            {event.format === 'In person' ? event.city : event.format}
          </span>
        </div>
        <h3 className="mt-2 text-base leading-snug font-bold text-ink-900">
          {event.title}
        </h3>
        <p className="numeric mt-1 text-xs text-muted-foreground">
          {formatEventTime(event)}
        </p>
      </div>

      <div className="flex items-center gap-6 sm:justify-end">
        <div className="text-right">
          <p className={cn('text-xs font-semibold', view.seatTone)}>
            {availabilityLabel[view.state]}
          </p>
          {view.soldOut ? null : (
            <p className="numeric mt-0.5 text-sm font-bold text-ink-900">
              {view.price}
            </p>
          )}
        </div>
        <ArrowBadge />
      </div>
    </CardLink>
  )
}

function EventTile({ event, view, className }: VariantProps) {
  const seats = view.soldOut
    ? availabilityLabel[view.state]
    : `${event.seatsRemaining} of ${event.capacity} seats left`

  const venue =
    event.format === 'Virtual' ? 'Online' : `${event.venue}, ${event.city}`

  return (
    <CardLink
      event={event}
      className={cn(
        'edge-card group flex flex-col bg-white transition-colors hover:bg-sand-50',
        className,
      )}
    >
      <div className="photo-wash relative aspect-16/10">
        <Photo
          photo={event.photo}
          width={800}
          ratio={16 / 10}
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute top-4 left-4 flex size-14 flex-col items-center justify-center bg-ink-950/85 backdrop-blur-sm">
          <span className="numeric text-lg leading-none font-bold text-white">
            {view.day}
          </span>
          <span className="mt-0.5 text-[0.5625rem] font-semibold tracking-[0.12em] text-signal-400">
            {view.month}
          </span>
        </div>
        <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.12em] text-ink-800 uppercase">
          <FormatIcon event={event} className="size-3" />
          {event.format}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
          {event.kind}
        </p>
        <h3 className="mt-3 text-lg leading-snug font-bold text-ink-900">
          {event.title}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {event.summary}
        </p>

        <dl className="mt-5 space-y-1.5 text-xs">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Date</dt>
            <dd className="numeric font-medium text-ink-800">
              {formatEventDate(event)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Venue</dt>
            <dd className="truncate text-right font-medium text-ink-800">
              {venue}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
          <div>
            <p
              className={cn(
                'inline-flex items-center gap-1.5 text-xs font-semibold',
                view.seatTone,
              )}
            >
              <FiUsers className="size-3.5" aria-hidden="true" />
              {seats}
            </p>
            <p className="numeric mt-1.5 text-lg font-bold text-ink-900">
              {view.priceLong}
            </p>
          </div>
          <ArrowBadge />
        </div>
      </div>
    </CardLink>
  )
}
