import { createFileRoute, notFound } from '@tanstack/react-router'
import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import {
  Section,
  SectionHeading,
  IndexLabel,
  Eyebrow,
} from '@/components/common/section'
import { SmartLink } from '@/components/common/smart-link'
import { ButtonLink } from '@/components/common/button-link'
import { CourseCard } from '@/components/courses/course-card'
import { InsightCard } from '@/components/insights/insight-card'
import { serviceBySlug, services } from '@/lib/content/services'
import { coursesByFocusArea } from '@/lib/content/training'
import { insights } from '@/lib/content/insights'

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug)
    if (!service) throw notFound()
    return { service }
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service
    if (!service) return {}
    return seo({
      title: service.seo.title,
      description: service.seo.description,
      path: `/services/${service.slug}`,
      image: service.photo,
      keywords: service.seo.keywords,
    })
  },
  component: ServiceDetail,
})

function ServiceDetail() {
  const { service } = Route.useLoaderData()

  // SERV-06 — related training and reading, drawn from the shared taxonomy.
  const relatedCourses = service.relatedTaxonomy
    .flatMap((id) => coursesByFocusArea(id))
    .filter(
      (course, index, all) =>
        all.findIndex((c) => c.slug === course.slug) === index,
    )
    .slice(0, 3)

  const relatedInsights = insights
    .filter((insight) =>
      insight.topics.some(
        (topic) =>
          service.seo.keywords.some((keyword) =>
            keyword.toLowerCase().includes(topic.toLowerCase()),
          ) || service.name.toLowerCase().includes(topic.toLowerCase()),
      ),
    )
    .slice(0, 3)

  const siblings = services.filter((s) => s.slug !== service.slug).slice(0, 4)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Advisory', path: '/services' },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrow="Advisory"
        title={service.name}
        lede={service.intro}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Advisory', href: '/services' },
          { label: service.name },
        ]}
        photo={service.photo}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={`/contact?intent=advisory&service=${service.slug}`}
            className="bg-signal-500 text-ink-950 hover:bg-signal-400"
          >
            Discuss an engagement
            <FiArrowRight
              className="size-3.5"
              data-icon="inline-end"
              aria-hidden="true"
            />
          </ButtonLink>
          <ButtonLink
            href="/capacity-building/courses"
            variant="outline"
            className="border-white/25 text-white hover:bg-white/10 hover:text-white"
          >
            Related training
          </ButtonLink>
        </div>
      </PageHero>

      {/* SERV-02 — the stated methodology. */}
      <Section>
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Our method"
                title="How an engagement runs."
              />
            </div>

            <ol className="rule-grid grid lg:col-span-7 lg:col-start-6 sm:grid-cols-2">
              {service.methodology.map((step, index) => (
                <li key={step.title} className="edge-card bg-white p-6 sm:p-8">
                  <IndexLabel n={index + 1} />
                  <h3 className="mt-4 text-lg font-bold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Optional per practice: the published standard the work is measured
          against, and the artefacts handed over. */}
      {service.standards || service.deliverables ? (
        <Section tone="ink">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              {service.standards ? (
                <div className="lg:col-span-5">
                  <Eyebrow tone="ink">Tested against</Eyebrow>
                  <ul className="mt-6 space-y-6">
                    {service.standards.map((standard) => (
                      <li
                        key={standard.name}
                        className="border-l-2 border-signal-500 pl-5"
                      >
                        <p className="text-base font-bold text-white">
                          {standard.name}
                        </p>
                        <p className="mt-1 text-xs tracking-widest text-signal-400 uppercase">
                          {standard.issuer}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-ink-200">
                          {standard.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {service.deliverables ? (
                <div className="lg:col-span-6 lg:col-start-7">
                  <Eyebrow tone="ink">What is handed over</Eyebrow>
                  <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                    {service.deliverables.map((deliverable, index) => (
                      <li
                        key={deliverable}
                        className="flex items-baseline gap-5 py-4"
                      >
                        <IndexLabel n={index + 1} tone="ink" />
                        <span className="text-sm leading-relaxed text-ink-100">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </Section>
      ) : null}

      {/* Capabilities, outcomes and engagement shapes */}
      <Section tone="sand">
        <div className="shell">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div>
              <Eyebrow>What we cover</Eyebrow>
              <ul className="mt-6 space-y-3">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-3 text-sm text-ink-800"
                  >
                    <FiCheck
                      className="mt-0.5 size-4 flex-none text-signal-600"
                      aria-hidden="true"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow>What you get</Eyebrow>
              <ul className="mt-6 space-y-4">
                {service.outcomes.map((outcome, index) => (
                  <li
                    key={outcome}
                    className="border-l-2 border-signal-500 pl-5"
                  >
                    <IndexLabel n={index + 1} />
                    <p className="mt-2 text-sm leading-relaxed font-medium text-ink-900">
                      {outcome}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <Eyebrow>Typical engagements</Eyebrow>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {service.engagements.map((engagement) => (
                  <li
                    key={engagement}
                    className="py-4 text-sm font-medium text-ink-800"
                  >
                    {engagement}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/contact?intent=advisory&service=${service.slug}`}
                className="mt-6 w-full bg-signal-500 text-ink-950 hover:bg-signal-400"
              >
                Scope an engagement
                <FiArrowRight
                  className="size-3.5"
                  data-icon="inline-end"
                  aria-hidden="true"
                />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* SERV-06 — related training */}
      {relatedCourses.length ? (
        <Section>
          <div className="shell">
            <SectionHeading
              eyebrow="Related training"
              title="Training in this discipline."
            />

            <div className="rule-grid mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((course) => (
                <CourseCard key={course.slug} course={course} currency="KES" />
              ))}
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
        </Section>
      ) : null}

      {/* SERV-06 — related reading */}
      {relatedInsights.length ? (
        <Section tone="sand">
          <div className="shell">
            <SectionHeading
              eyebrow="Related reading"
              title="Recent work on this topic."
            />
            <div className="rule-grid mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedInsights.map((insight) => (
                <InsightCard key={insight.slug} insight={insight} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* Sibling practices */}
      <Section tone="ink">
        <div className="shell relative">
          <Eyebrow tone="ink">Other practices</Eyebrow>
          <div className="rule-grid-ink mt-6 grid sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {siblings.map((sibling) => (
              <SmartLink
                key={sibling.slug}
                href={`/services/${sibling.slug}`}
                className="edge-card group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-white/5 sm:p-6"
              >
                <span className="text-sm font-bold text-white">
                  {sibling.name}
                </span>
                <FiArrowUpRight
                  className="size-4 flex-none text-signal-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </SmartLink>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
