import { createFileRoute } from '@tanstack/react-router'

import { seo, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section } from '@/components/common/section'
import { InsightsHub } from '@/components/insights/insights-hub'
import {
  ResourceFaqs,
  ResourceGallery,
} from '@/components/insights/resource-sections'
import { ConversionCta } from '@/components/home/conversion-cta'
import { faqs } from '@/lib/content/institution'
import type { InsightType } from '@/lib/content/insights'

type ResourceSearch = {
  /** Deep link from the footer, e.g. /resources?type=whitepaper */
  type?: string
}

export const Route = createFileRoute('/resources')({
  validateSearch: (search: Record<string, unknown>): ResourceSearch => ({
    type: typeof search.type === 'string' ? search.type : undefined,
  }),
  head: () =>
    seo({
      title: 'Insights & research — policy briefs, whitepapers and commentary',
      description:
        'Thought leadership, policy commentary and research whitepapers on tax compliance, internal audit, governance, fraud and digital assets across East Africa, plus our gallery and FAQs.',
      path: '/resources',
      image: photos.panelDiscussion,
      keywords: [
        'East Africa policy research',
        'tax whitepaper Kenya',
        'governance insights Nairobi',
      ],
    }),
  component: ResourcesPage,
})

/** Maps the `?type=whitepaper` search param onto the typed filter. */
function toInsightType(value: string | undefined): InsightType | null {
  if (!value) return null
  const normalised = value.toLowerCase()
  const match: Record<string, InsightType> = {
    article: 'Article',
    'policy-brief': 'Policy brief',
    whitepaper: 'Whitepaper',
    commentary: 'Commentary',
  }
  return match[normalised] ?? null
}

function ResourcesPage() {
  const { type } = Route.useSearch()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/resources' },
        ])}
      />
      {/* RES-05/RES-06 surfaced to search as FAQ structured data. */}
      <JsonLd data={faqSchema(faqs.flatMap((group) => group.items))} />

      <PageHero
        eyebrow="Insights & research"
        title="Analysis, policy briefs and research."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
        photo={photos.panelDiscussion}
      />

      <Section className="py-6 sm:py-10">
        <InsightsHub initialType={toInsightType(type)} />
      </Section>

      <ResourceGallery />
      <ResourceFaqs />
      <ConversionCta />
    </>
  )
}
