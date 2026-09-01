import { createFileRoute } from '@tanstack/react-router'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import {
  Section,
  SectionHeading,
  IndexLabel,
} from '@/components/common/section'
import { ButtonLink } from '@/components/common/button-link'
import { Photo } from '@/components/common/photo'
import { CapacityOverview } from '@/components/home/capacity-overview'
import { EventCard } from '@/components/events/event-card'
import { EventsEmpty } from '@/components/events/events-empty'
import { ConversionCta } from '@/components/home/conversion-cta'
import { SmartLink } from '@/components/common/smart-link'
import { events } from '@/lib/content/events'
import { focusAreaById, publishedCourses } from '@/lib/content/training'
import { deliveryMethods } from '@/lib/content/institution'

export const Route = createFileRoute('/capacity-building/')({
  head: () =>
    seo({
      title:
        'Capacity building — corporate training, masterclasses and e-learning',
      description:
        'Corporate training cohorts, executive masterclasses and a self-paced e-learning catalog across five professional focus areas, delivered across East Africa.',
      path: '/capacity-building',
      image: photos.workshopRoom,
      keywords: [
        'corporate training Kenya',
        'executive masterclass Nairobi',
        'professional courses East Africa',
      ],
    }),
  component: CapacityBuildingPage,
})

function CapacityBuildingPage() {
  const masterclasses = events.filter((event) => event.kind === 'Masterclass')

  // Entry-level and self-paced sit closest to a single buyer: no prerequisite,
  // and nothing that assumes a cohort around them.
  const individualPicks = publishedCourses
    .filter(
      (course) =>
        course.delivery === 'Self-paced' || course.level === 'Foundation',
    )
    .slice(0, 3)

  // Focus area 5 is SME Growth & Executive Leadership — the taxonomy already
  // names what an SME buys, so the list is read from it rather than restated.
  const smeModules = focusAreaById(5)?.modules ?? []

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Capacity Building', path: '/capacity-building' },
        ])}
      />

      <PageHero
        eyebrow="Capacity building"
        title="Executive Training"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Capacity Building' },
        ]}
        photo={photos.workshopRoom}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="/capacity-building/corporate-request"
            className="bg-signal-500 text-ink-950 hover:bg-signal-400"
          >
            Request corporate training
            <FiArrowRight
              className="size-3.5"
              data-icon="inline-end"
              aria-hidden="true"
            />
          </ButtonLink>
          <ButtonLink
            href="/capacity-building/courses"
            variant="outline"
            className="border-ink-900/20 text-ink-900 hover:bg-ink-900/5 hover:text-ink-900"
          >
            Browse the catalog
          </ButtonLink>
        </div>
      </PageHero>

      {/* CAP-01 — corporate training */}
      <Section id="corporate">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Corporate training"
                title="Corporate Cohorts"
              />

              <ul className="mt-8 space-y-3.5">
                {[
                  'Headcount, modules and delivery mode captured in one request',
                  'Pro-forma invoice generated on submission, with a unique bank reference',
                  'On-site at your premises, live virtual, or a venue we arrange',
                  'Cohort completion reporting for your compliance records',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <FiCheck
                      className="mt-0.5 size-4 flex-none text-signal-600"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-ink-800">{point}</span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/capacity-building/corporate-request"
                className="mt-8 w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
              >
                Start a corporate request
                <FiArrowRight
                  className="size-3.5"
                  data-icon="inline-end"
                  aria-hidden="true"
                />
              </ButtonLink>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="relative">
                <div
                  className="absolute -top-4 -left-4 h-28 w-28 border-t border-l border-signal-500/40"
                  aria-hidden="true"
                />
                <div className="photo-wash photo-wash-soft aspect-4/5">
                  <Photo
                    photo={photos.teamCouch}
                    width={800}
                    ratio={4 / 5}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CAP-02 — executive masterclasses */}
      <Section id="masterclasses" tone="sand">
        <div className="shell">
          <SectionHeading
            eyebrow="Executive masterclasses"
            title="Board & C-Suite Intensives"
          />

          {masterclasses.length > 0 ? (
            <div className="rule-grid mt-8 grid sm:mt-10 lg:grid-cols-2">
              {masterclasses.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="mt-8 sm:mt-10">
              {/* The page already offers a corporate request just above. */}
              <EventsEmpty action={false} />
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <ButtonLink
              href="/events"
              className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
            >
              All open dates
              <FiArrowRight
                className="size-3.5"
                data-icon="inline-end"
                aria-hidden="true"
              />
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* CAP-03 + CAP-07 — catalog routes and taxonomy */}
      <CapacityOverview />

      {/* SMEs & individuals.
          Everything above this point is scoped to a corporate buyer — cohorts
          of ten upward, a headcount, a pro-forma invoice raised against a
          company. The overview names "Enterprises & SMEs" and "Entrepreneurs &
          Professionals" as segments in their own right, and they had no
          landing point on the site: someone buying one seat, or an owner-led
          business with six people, arrived here and found a procurement flow.
          This is that route. */}
      <Section id="smes-individuals" tone="sand">
        <div className="shell">
          <SectionHeading
            eyebrow="SMEs & individuals"
            title="Single Seats & Small Teams"
          />

          <div className="rule-grid mt-8 grid sm:mt-10 lg:grid-cols-2">
            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <IndexLabel n={1} />
              <h3 className="mt-4 text-xl font-bold text-ink-900 sm:text-2xl">
                For Individuals
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Buy a single seat — no headcount, no procurement cycle. Courses
                are priced in KES and USD, and each one completes to a
                QR-verifiable credential you can put in front of an employer.
              </p>

              <ul className="mt-6">
                {individualPicks.map((course) => (
                  <li key={course.slug}>
                    <SmartLink
                      href="/capacity-building/courses"
                      className="group flex items-baseline justify-between gap-4 border-b border-border py-3 transition-colors hover:border-signal-500"
                    >
                      <span className="text-sm font-semibold text-ink-900">
                        {course.title}
                      </span>
                      <span className="numeric flex-none text-xs text-muted-foreground">
                        {course.level} · {course.hours}h
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/capacity-building/courses"
                  className="bg-signal-500 text-ink-950 hover:bg-signal-400"
                >
                  Browse the catalog
                  <FiArrowRight
                    className="size-3.5"
                    data-icon="inline-end"
                    aria-hidden="true"
                  />
                </ButtonLink>
                <ButtonLink
                  href="/events"
                  variant="outline"
                  className="border-ink-900/20 text-ink-900 hover:bg-ink-900/5 hover:text-ink-900"
                >
                  Open event seats
                </ButtonLink>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <IndexLabel n={2} />
              <h3 className="mt-4 text-xl font-bold text-ink-900 sm:text-2xl">
                For SMEs
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The numbers, the governance and the growth discipline a funder
                tests before it commits. Assemble the modules you need and
                submit them for a quote — a small team is enough to run a
                cohort.
              </p>

              <ul className="mt-6 space-y-3">
                {smeModules.map((module) => (
                  <li key={module} className="flex items-start gap-3">
                    <FiCheck
                      className="mt-0.5 size-4 flex-none text-signal-600"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-ink-800">{module}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/capacity-building/builder"
                  className="bg-signal-500 text-ink-950 hover:bg-signal-400"
                >
                  Build a programme
                  <FiArrowRight
                    className="size-3.5"
                    data-icon="inline-end"
                    aria-hidden="true"
                  />
                </ButtonLink>
                <ButtonLink
                  href="/contact?intent=training"
                  variant="outline"
                  className="border-ink-900/20 text-ink-900 hover:bg-ink-900/5 hover:text-ink-900"
                >
                  Talk to the training team
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* "How We Deliver" — the five delivery vehicles the corporate overview
          lists. The page previously showed only three of them. */}
      <Section id="how-we-deliver">
        <div className="shell">
          <SectionHeading eyebrow="How we deliver" title="Delivery Vehicles" />

          <div className="rule-grid mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryMethods.map((method, index) => (
              <div key={method.name} className="bg-white p-6 sm:p-8">
                <IndexLabel n={index + 1} />
                <h3 className="mt-4 text-base leading-snug font-bold text-ink-900">
                  {method.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {method.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <ConversionCta />
    </>
  )
}
