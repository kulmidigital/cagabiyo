import { useMemo, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

import { CourseCard } from '@/components/courses/course-card'
import { CurrencyToggle } from '@/components/courses/currency-toggle'
import { cn } from '@/lib/utils'
import {
  courseLevels,
  deliveryModes,
  focusAreas,
  publishedCourses,
} from '@/lib/content/training'
import type {
  Currency,
  CourseLevel,
  DeliveryMode,
} from '@/lib/content/training'

export function CourseCatalog() {
  const [query, setQuery] = useState('')
  const [area, setArea] = useState<number | null>(null)
  const [level, setLevel] = useState<CourseLevel | null>(null)
  const [delivery, setDelivery] = useState<DeliveryMode | null>(null)
  const [currency, setCurrency] = useState<Currency>('KES')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publishedCourses.filter((course) => {
      if (area && course.focusAreaId !== area) return false
      if (level && course.level !== level) return false
      if (delivery && course.delivery !== delivery) return false
      if (!q) return true
      return (
        course.title.toLowerCase().includes(q) ||
        course.summary.toLowerCase().includes(q) ||
        course.credential.toLowerCase().includes(q)
      )
    })
  }, [query, area, level, delivery])

  const activeFilters =
    [area, level, delivery].filter(Boolean).length + (query ? 1 : 0)

  const clearAll = () => {
    setQuery('')
    setArea(null)
    setLevel(null)
    setDelivery(null)
  }

  return (
    <div className="shell">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        {/* Filters */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <div className="relative">
              <label htmlFor="catalog-search" className="sr-only">
                Search the course catalog
              </label>
              <FiSearch
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search courses"
                className="h-11 w-full border border-input bg-white pr-4 pl-11 text-sm outline-none focus:border-signal-500"
              />
            </div>

            <FilterGroup label="Focus area" scrollOnMobile>
              <FilterChip active={area === null} onClick={() => setArea(null)}>
                All areas
              </FilterChip>
              {focusAreas.map((item) => (
                <FilterChip
                  key={item.id}
                  active={area === item.id}
                  onClick={() => setArea(area === item.id ? null : item.id)}
                >
                  {item.shortName}
                </FilterChip>
              ))}
            </FilterGroup>

            <FilterGroup label="Level">
              {courseLevels.map((item) => (
                <FilterChip
                  key={item}
                  active={level === item}
                  onClick={() => setLevel(level === item ? null : item)}
                >
                  {item}
                </FilterChip>
              ))}
            </FilterGroup>

            <FilterGroup label="Delivery">
              {deliveryModes.map((item) => (
                <FilterChip
                  key={item}
                  active={delivery === item}
                  onClick={() => setDelivery(delivery === item ? null : item)}
                >
                  {item}
                </FilterChip>
              ))}
            </FilterGroup>

            {activeFilters > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-signal-700 uppercase transition-colors hover:text-signal-600"
              >
                <FiX className="size-3.5" aria-hidden="true" />
                Clear {activeFilters} filter{activeFilters > 1 ? 's' : ''}
              </button>
            ) : null}
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-9">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <p
              className="text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              <span className="numeric font-semibold text-ink-900">
                {results.length}
              </span>{' '}
              {results.length === 1 ? 'programme' : 'programmes'}
            </p>
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </div>

          {results.length ? (
            <div className="rule-grid mt-8 grid sm:grid-cols-2 xl:grid-cols-3">
              {results.map((course) => (
                <span key={course.slug} id={course.slug} className="contents">
                  <CourseCard course={course} currency={currency} />
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-border bg-sand-50 px-6 py-6 sm:py-10 text-center">
              <p className="text-lg font-bold text-ink-900">
                No programmes match those filters
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Try a broader focus area, or ask us to build a custom programme.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 text-xs font-semibold tracking-[0.12em] text-signal-700 uppercase underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({
  label,
  children,
  scrollOnMobile = false,
}: Readonly<{
  label: string
  children: React.ReactNode
  /**
   * Seventeen taxonomy chips wrapped into a column push the results off a
   * phone screen entirely, so that group scrolls sideways instead.
   */
  scrollOnMobile?: boolean
}>) {
  return (
    <fieldset className="mt-6 sm:mt-8">
      <legend className="mb-3 text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:mb-4">
        {label}
      </legend>
      <div
        className={cn(
          'flex gap-1.5',
          scrollOnMobile
            ? 'no-scrollbar -mx-1 snap-x overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0'
            : 'flex-wrap',
        )}
      >
        {children}
      </div>
    </fieldset>
  )
}

function FilterChip({
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
        'shrink-0 snap-start border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-ink-900 bg-ink-900 text-white'
          : 'border-border bg-white text-ink-700 hover:border-ink-300 hover:bg-sand-50',
      )}
    >
      {children}
    </button>
  )
}
