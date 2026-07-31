import {
  FiArrowUpRight,
  FiAward,
  FiClock,
  FiLayers,
  FiMonitor,
} from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { SmartLink } from '@/components/common/smart-link'
import { cn } from '@/lib/utils'
import { focusAreaById, formatPrice } from '@/lib/content/training'
import type { Course, Currency } from '@/lib/content/training'

export function CourseCard({
  course,
  currency,
  className,
}: Readonly<{
  course: Course
  currency: Currency
  className?: string
}>) {
  const area = focusAreaById(course.focusAreaId)
  const alternate: Currency = currency === 'KES' ? 'USD' : 'KES'
  const free = course.priceKes === 0

  return (
    <SmartLink
      href={`/capacity-building/courses#${course.slug}`}
      className={cn(
        'edge-card group flex flex-col bg-white transition-colors hover:bg-sand-50',
        className,
      )}
    >
      <div className="photo-wash relative aspect-16/10 overflow-hidden">
        <Photo
          photo={course.photo}
          width={800}
          ratio={16 / 10}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="absolute top-4 left-4 bg-ink-950/85 px-2.5 py-1.5 text-[0.625rem] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {area ? (
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
            {area.shortName}
          </p>
        ) : null}

        <h3 className="mt-3 text-lg leading-snug font-bold text-ink-900">
          {course.title}
        </h3>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {course.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <li className="inline-flex items-center gap-1.5">
            <FiClock className="size-3.5 text-ink-300" aria-hidden="true" />
            <span className="numeric">{course.hours} hrs</span>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <FiLayers className="size-3.5 text-ink-300" aria-hidden="true" />
            <span className="numeric">{course.modules} modules</span>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <FiMonitor className="size-3.5 text-ink-300" aria-hidden="true" />
            {course.delivery}
          </li>
        </ul>

        <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
          <div>
            {free ? (
              <p className="text-lg font-bold text-ink-900">Complimentary</p>
            ) : (
              <>
                <p className="numeric text-lg font-bold text-ink-900">
                  {formatPrice(course, currency)}
                </p>
                <p className="numeric mt-0.5 text-xs text-muted-foreground">
                  {formatPrice(course, alternate)}
                </p>
              </>
            )}
          </div>
          <span className="inline-flex size-9 items-center justify-center border border-border text-ink-600 transition-colors group-hover:border-signal-500 group-hover:bg-signal-500 group-hover:text-ink-950">
            <FiArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>

        <p className="mt-4 inline-flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
          <FiAward className="size-3.5 text-signal-600" aria-hidden="true" />
          {course.credential}
        </p>
      </div>
    </SmartLink>
  )
}
