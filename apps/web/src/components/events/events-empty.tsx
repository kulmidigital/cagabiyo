import { FiCalendar } from 'react-icons/fi'

import { ButtonLink } from '@/components/common/button-link'

/**
 * Shown wherever events would render while the calendar is empty.
 *
 * The dataset held nine invented dates — venues, named speakers, seat counts
 * and prices, none of them real — and it is now empty until the client
 * supplies a real calendar. Every events surface falls through to this rather
 * than rendering an empty grid, and each one still offers a way forward:
 * training runs on request whether or not a public date is scheduled.
 */
export function EventsEmpty({
  action = true,
}: Readonly<{
  /** Hide the call to action where the surrounding section already has one. */
  action?: boolean
}>) {
  return (
    <div className="border border-border bg-sand-50 p-8 text-center sm:p-12">
      <FiCalendar
        className="mx-auto size-6 text-signal-600"
        aria-hidden="true"
      />
      <p className="mt-4 text-lg font-bold text-ink-900">Dates Coming Soon</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        The next open workshops, masterclasses and webinars are being scheduled.
        In the meantime, any programme in the catalog can be run for your team
        on a date that suits you.
      </p>

      {action ? (
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/capacity-building/corporate-request"
            className="bg-signal-500 text-ink-950 hover:bg-signal-400"
          >
            Request a date
          </ButtonLink>
          <ButtonLink
            href="/capacity-building/courses"
            variant="outline"
            className="border-ink-900/20 text-ink-900 hover:bg-ink-900/5 hover:text-ink-900"
          >
            Browse the catalog
          </ButtonLink>
        </div>
      ) : null}
    </div>
  )
}
