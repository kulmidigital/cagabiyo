import { createFileRoute } from '@tanstack/react-router'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section, SectionHeading } from '@/components/common/section'
import { ButtonLink } from '@/components/common/button-link'
import { Photo } from '@/components/common/photo'
import { CapacityOverview } from '@/components/home/capacity-overview'
import { EventCard } from '@/components/events/event-card'
import { ConversionCta } from '@/components/home/conversion-cta'
import { events } from '@/lib/content/events'

export const Route = createFileRoute('/capacity-building/')({
  head: () =>
    seo({
      title:
        'Capacity building — corporate training, masterclasses and e-learning',
      description:
        'Corporate training cohorts, executive masterclasses and a self-paced e-learning catalog across sixteen professional focus areas, delivered across East Africa.',
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
        title="Corporate training, masterclasses and online courses."
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
            className="border-white/25 text-white hover:bg-white/10 hover:text-white"
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
                title="Cohorts of ten to several hundred."
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
            title="Board and C-suite intensives."
          />

          <div className="rule-grid mt-8 grid sm:mt-10 lg:grid-cols-2">
            {masterclasses.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

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

      <ConversionCta />
    </>
  )
}
