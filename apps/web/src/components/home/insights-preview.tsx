import { FiArrowRight } from 'react-icons/fi'

import { SectionHeading } from '@/components/common/section'
import { ButtonLink } from '@/components/common/button-link'
import { InsightCard } from '@/components/insights/insight-card'
import { insights } from '@/lib/content/insights'

export function InsightsPreview() {
  const sorted = [...insights].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  )
  const lead = sorted.at(0)
  if (!lead) return null

  const rest = sorted.slice(1, 4)

  return (
    <section className="py-6 sm:py-10">
      <div className="shell">
        <SectionHeading eyebrow="Insights & research" title="Latest Insights" />

        <div className="rule-grid mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          <InsightCard
            insight={lead}
            variant="feature"
            className="sm:col-span-2 lg:col-span-3"
          />
          {rest.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <ButtonLink
            href="/resources"
            className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
          >
            All insights
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
