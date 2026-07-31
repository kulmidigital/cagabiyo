import { useMemo, useState } from 'react'

import { InsightCard } from '@/components/insights/insight-card'
import { cn } from '@/lib/utils'
import { insights, insightTypes } from '@/lib/content/insights'
import type { Insight, InsightType } from '@/lib/content/insights'

export function InsightsHub({
  initialType = null,
}: Readonly<{
  initialType?: InsightType | null
}>) {
  const [type, setType] = useState<InsightType | null>(initialType)

  const filtered = useMemo(
    () =>
      insights
        .filter((insight) => (type ? insight.type === type : true))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [type],
  )

  // The filtered set can legitimately be empty, so the lead item is optional.
  const lead: Insight | undefined = filtered.at(0)
  const rest = filtered.slice(1)

  return (
    <div className="shell">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:pb-6">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          <FilterChip active={type === null} onClick={() => setType(null)}>
            All
          </FilterChip>
          {insightTypes.map((item) => (
            <FilterChip
              key={item}
              active={type === item}
              onClick={() => setType(type === item ? null : item)}
            >
              {item}
              <span className="numeric ml-2 text-[0.625rem] opacity-60">
                {insights.filter((i) => i.type === item).length}
              </span>
            </FilterChip>
          ))}
        </div>
        <p
          className="text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <span className="numeric font-semibold text-ink-900">
            {filtered.length}
          </span>{' '}
          {filtered.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      <div className="rule-grid mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {lead ? (
          <span id={lead.slug} className="contents">
            <InsightCard
              insight={lead}
              variant="feature"
              className="lg:col-span-3"
            />
          </span>
        ) : null}
        {rest.map((insight) => (
          <span key={insight.slug} id={insight.slug} className="contents">
            <InsightCard insight={insight} />
          </span>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 border border-border bg-sand-50 px-6 py-6 text-center sm:mt-10 sm:py-10">
          <p className="text-lg font-bold text-ink-900">
            Nothing published under that filter yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Subscribe to the monthly briefing to receive new work of this kind.
          </p>
        </div>
      ) : null}
    </div>
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
        'inline-flex shrink-0 items-center border px-3.5 py-2 text-xs font-medium transition-colors',
        active
          ? 'border-ink-900 bg-ink-900 text-white'
          : 'border-border bg-white text-ink-700 hover:border-ink-300 hover:bg-sand-50',
      )}
    >
      {children}
    </button>
  )
}
