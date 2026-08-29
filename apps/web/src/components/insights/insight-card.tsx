import { FiArrowUpRight, FiClock } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { SmartLink } from '@/components/common/smart-link'
import { cn } from '@/lib/utils'
import { formatInsightDate } from '@/lib/content/insights'
import type { Insight } from '@/lib/content/insights'

export function InsightCard({
  insight,
  variant = 'default',
  className,
}: Readonly<{
  insight: Insight
  variant?: 'default' | 'feature' | 'compact'
  className?: string
}>) {
  if (variant === 'compact') {
    return (
      <SmartLink
        href={`/resources/${insight.slug}`}
        className={cn(
          'edge-card group flex items-start gap-5 bg-white p-5 transition-colors hover:bg-sand-50',
          className,
        )}
      >
        <div className="photo-wash aspect-square w-20 flex-none">
          <Photo photo={insight.photo} width={200} ratio={1} sizes="80px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
            {insight.type}
          </p>
          <h3 className="mt-1.5 line-clamp-2 text-sm leading-snug font-bold text-ink-900">
            {insight.title}
          </h3>
          <p className="numeric mt-2 text-xs text-muted-foreground">
            {formatInsightDate(insight.publishedAt)}
          </p>
        </div>
        <FiArrowUpRight
          className="size-4 flex-none text-ink-300 transition-colors group-hover:text-signal-600"
          aria-hidden="true"
        />
      </SmartLink>
    )
  }

  const feature = variant === 'feature'

  return (
    <SmartLink
      href={`/resources/${insight.slug}`}
      className={cn(
        'edge-card group flex flex-col bg-white transition-colors hover:bg-sand-50',
        feature && 'lg:grid lg:grid-cols-2 lg:items-stretch',
        className,
      )}
    >
      <div
        className={cn(
          'photo-wash relative',
          feature
            ? 'aspect-16/10 lg:aspect-auto lg:h-full lg:min-h-80'
            : 'aspect-16/10',
        )}
      >
        <Photo
          photo={insight.photo}
          width={feature ? 1000 : 800}
          sizes={
            feature
              ? '(min-width: 1024px) 45vw, 100vw'
              : '(min-width: 1024px) 32vw, 100vw'
          }
        />
        {/* These are articles now, not whitepapers, so the badge carries
            reading time rather than a page count. */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-ink-950/85 px-2.5 py-1.5 text-[0.625rem] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm">
          <FiClock className="size-3" aria-hidden="true" />
          {insight.readingMinutes} min read
        </span>
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col p-6',
          feature && 'lg:justify-center lg:p-10',
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
            {insight.type}
          </span>
          <span className="h-px w-6 bg-border" aria-hidden="true" />
          <span className="numeric text-xs text-muted-foreground">
            {formatInsightDate(insight.publishedAt)}
          </span>
        </div>

        <h3
          className={cn(
            'mt-4 leading-snug font-bold text-ink-900',
            feature ? 'text-2xl lg:text-3xl' : 'text-lg',
          )}
        >
          {insight.title}
        </h3>

        <p
          className={cn(
            'mt-4 flex-1 text-sm leading-relaxed text-muted-foreground',
            feature ? 'lg:text-base' : 'line-clamp-3',
          )}
        >
          {insight.summary}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">
              {insight.author}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {insight.authorRole}
            </p>
          </div>
          <p className="numeric inline-flex flex-none items-center gap-1.5 text-xs text-muted-foreground">
            <FiClock className="size-3.5" aria-hidden="true" />
            {insight.readingMinutes} min
          </p>
        </div>
      </div>
    </SmartLink>
  )
}
