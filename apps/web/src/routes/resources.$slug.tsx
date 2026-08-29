import { createFileRoute, notFound } from '@tanstack/react-router'
import { FiArrowLeft, FiClock } from 'react-icons/fi'

import { seo, breadcrumbSchema, articleSchema } from '@/lib/seo'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section, SectionHeading } from '@/components/common/section'
import { SmartLink } from '@/components/common/smart-link'
import { InsightCard } from '@/components/insights/insight-card'
import { ConversionCta } from '@/components/home/conversion-cta'
import {
  insightBySlug,
  insights,
  formatInsightDate,
} from '@/lib/content/insights'

export const Route = createFileRoute('/resources/$slug')({
  loader: ({ params }) => {
    const insight = insightBySlug(params.slug)
    if (!insight) throw notFound()
    return { insight }
  },
  head: ({ loaderData }) => {
    const insight = loaderData?.insight
    if (!insight) return {}
    return seo({
      title: insight.title,
      description: insight.summary,
      path: `/resources/${insight.slug}`,
      image: insight.photo,
      keywords: insight.topics,
    })
  },
  component: InsightDetail,
})

function InsightDetail() {
  const { insight } = Route.useLoaderData()

  // Related by shared topic, falling back to anything else recent so the foot
  // of the article is never empty on a piece with unusual topics.
  const related = insights
    .filter((item) => item.slug !== insight.slug)
    .sort((a, b) => {
      const overlap = (item: typeof insight) =>
        item.topics.filter((topic) => insight.topics.includes(topic)).length
      return overlap(b) - overlap(a)
    })
    .slice(0, 3)

  return (
    <>
      <JsonLd data={articleSchema(insight)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/resources' },
          { name: insight.title, path: `/resources/${insight.slug}` },
        ])}
      />

      <PageHero
        eyebrow={insight.type}
        title={insight.title}
        lede={insight.standfirst}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: '/resources' },
          { label: insight.title },
        ]}
        photo={insight.photo}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="font-semibold text-ink-900">{insight.author}</span>
          <span>{insight.authorRole}</span>
          <span>{formatInsightDate(insight.publishedAt)}</span>
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="size-3.5" aria-hidden="true" />
            {insight.readingMinutes} min read
          </span>
        </div>
      </PageHero>

      <Section>
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Takeaways ride alongside the body on wide screens and sit above
                it on narrow ones, so the reader gets the argument either way
                without scrolling past it. */}
            <aside className="lg:col-span-4 lg:order-last">
              <div className="border border-border bg-sand-50 p-6 lg:sticky lg:top-28">
                <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                  In short
                </p>
                <ul className="mt-5 space-y-4">
                  {insight.keyPoints.map((point) => (
                    <li
                      key={point}
                      className="border-l-2 border-signal-500 pl-4 text-sm leading-relaxed text-ink-800"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <article className="lg:col-span-8">
              {insight.body.map((section) => (
                <section key={section.heading} className="mb-10 last:mb-0">
                  <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="mt-10 border-t border-border pt-6">
                <ul className="flex flex-wrap gap-2">
                  {insight.topics.map((topic) => (
                    <li
                      key={topic}
                      className="border border-border px-2.5 py-1 text-xs text-ink-700"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>

                <SmartLink
                  href="/resources"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-signal-700 uppercase"
                >
                  <FiArrowLeft className="size-3.5" aria-hidden="true" />
                  All insights
                </SmartLink>
              </div>
            </article>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="sand">
          <div className="shell">
            <SectionHeading eyebrow="Related reading" title="Recent Work" />
            <div className="rule-grid mt-8 grid sm:mt-10 lg:grid-cols-3">
              {related.map((item) => (
                <InsightCard key={item.slug} insight={item} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <ConversionCta />
    </>
  )
}
