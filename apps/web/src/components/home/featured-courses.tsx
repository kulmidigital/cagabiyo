import { useState } from 'react'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { SectionHeading } from '@/components/common/section'
import { ButtonLink } from '@/components/common/button-link'
import { SmartLink } from '@/components/common/smart-link'
import { CurrencyToggle } from '@/components/courses/currency-toggle'
import { cn } from '@/lib/utils'
import {
  featuredCourses,
  focusAreaById,
  formatPrice,
} from '@/lib/content/training'
import type { Currency } from '@/lib/content/training'

export function FeaturedCourses() {
  const [currency, setCurrency] = useState<Currency>('KES')
  const [active, setActive] = useState(0)

  const courses = featuredCourses.slice(0, 6)
  // `.at()` reports the empty case honestly, unlike `[index]`.
  const activeCourse = courses.at(active) ?? courses.at(0)
  if (!activeCourse) return null

  const activeArea = focusAreaById(activeCourse.focusAreaId)
  const alternate: Currency = currency === 'KES' ? 'USD' : 'KES'

  return (
    <section className="surface-sand py-6 sm:py-10">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured programmes"
          title="Most-requested certificates."
          action={<CurrencyToggle value={currency} onChange={setCurrency} />}
        />

        <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-12 lg:gap-12">
          {/* Preview — every value here is repeated in the index beside it, so
              it is hidden from assistive tech rather than read out twice. */}
          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
            {/* No fixed ratio — the grid row is sized by the index beside it and
                this fills it, so the two columns end level. */}
            <div className="photo-wash relative h-full overflow-hidden bg-ink-900">
              {courses.map((course, index) => (
                <Photo
                  key={course.slug}
                  photo={course.photo}
                  alt=""
                  width={700}
                  ratio={3 / 4}
                  sizes="40vw"
                  priority={index === 0}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-700 ease-out',
                    index === active ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}

              <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                {activeArea ? (
                  <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-signal-400 uppercase">
                    {activeArea.shortName}
                  </p>
                ) : null}
                <p className="mt-3 text-xl leading-snug font-bold text-white">
                  {activeCourse.title}
                </p>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="numeric text-2xl font-bold text-white">
                    {formatPrice(activeCourse, currency)}
                  </span>
                  <span className="numeric text-sm text-ink-300">
                    {formatPrice(activeCourse, alternate)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Index */}
          <ol className="lg:col-span-7">
            {courses.map((course, index) => {
              const area = focusAreaById(course.focusAreaId)
              const isActive = index === active
              return (
                <li
                  key={course.slug}
                  className={cn(
                    'border-b border-ink-200',
                    index === 0 && 'border-t',
                  )}
                >
                  <SmartLink
                    href={`/capacity-building/courses#${course.slug}`}
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group flex items-center gap-5 py-5 transition-colors sm:gap-7"
                  >
                    <span
                      className={cn(
                        'numeric w-6 shrink-0 text-xs font-semibold tracking-[0.14em] transition-colors',
                        isActive ? 'text-signal-600' : 'text-ink-300',
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block text-base leading-snug font-bold transition-colors sm:text-lg',
                          isActive ? 'text-signal-700' : 'text-ink-900',
                        )}
                      >
                        {course.title}
                      </span>
                      <span className="mt-1.5 block text-xs text-muted-foreground">
                        {area ? `${area.shortName} · ` : ''}
                        {course.level} · {course.delivery} ·{' '}
                        <span className="numeric">{course.hours} hrs</span>
                      </span>

                      {/* Phones have no room for a price column, and without
                          this the currency toggle would appear to do nothing. */}
                      <span className="numeric mt-2 block text-sm font-bold text-ink-900 sm:hidden">
                        {formatPrice(course, currency)}
                      </span>
                    </span>

                    <span className="numeric hidden shrink-0 text-sm font-bold text-ink-900 sm:block">
                      {formatPrice(course, currency)}
                    </span>

                    <FiArrowUpRight
                      className={cn(
                        'size-4 shrink-0 transition-all duration-300',
                        isActive
                          ? '-translate-y-0.5 translate-x-0.5 text-signal-500'
                          : 'text-ink-300',
                      )}
                      aria-hidden="true"
                    />
                  </SmartLink>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-8 flex justify-end">
          <ButtonLink
            href="/capacity-building/courses"
            className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
          >
            Full catalog
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
