import { createFileRoute } from '@tanstack/react-router'
import { FiArrowUpRight } from 'react-icons/fi'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import {
  Section,
  SectionHeading,
  IndexLabel,
} from '@/components/common/section'
import { SmartLink } from '@/components/common/smart-link'
import { Photo } from '@/components/common/photo'
import { ConversionCta } from '@/components/home/conversion-cta'
import { services } from '@/lib/content/services'

export const Route = createFileRoute('/services/')({
  head: () =>
    seo({
      title: 'Advisory services — statutory compliance, governance and fraud',
      description:
        'Three advisory practices: statutory and tax compliance, governance risk and internal audit, and fraud, financial crime and digital asset advisory, delivered across East Africa.',
      path: '/services',
      image: photos.boardroomWide,
      keywords: [
        'advisory services Kenya',
        'tax compliance Kenya',
        'internal audit East Africa',
        'fraud risk advisory Nairobi',
      ],
    }),
  component: ServicesIndex,
})

function ServicesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Advisory', path: '/services' },
        ])}
      />

      <PageHero
        eyebrow="Advisory"
        title="Advisory Services"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Advisory' }]}
        photo={photos.boardroomWide}
      />

      {/* One section, not one per pillar. With three practices the grouping
          headings outnumbered what they grouped, so the list stands on its own
          and each card carries the full capability set instead of three chips. */}
      <Section>
        <div className="shell">
          <SectionHeading eyebrow="Practice areas" title="Three Practices" />

          <div className="rule-grid mt-8 grid sm:mt-10">
            {services.map((service, index) => (
              <SmartLink
                key={service.slug}
                href={`/services/${service.slug}`}
                className="edge-card group grid bg-white transition-colors hover:bg-sand-50 sm:grid-cols-[1fr_auto]"
              >
                <div className="p-6 sm:p-8 lg:p-10">
                  <IndexLabel n={index + 1} />
                  <h3 className="mt-4 text-xl font-bold text-ink-900 sm:mt-5 sm:text-2xl">
                    {service.name}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.capabilities.slice(0, 5).map((capability) => (
                      <li
                        key={capability}
                        className="border border-border px-2.5 py-1 text-[0.6875rem] text-ink-700"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-signal-700 uppercase sm:mt-8">
                    Read the method
                    <FiArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <div className="photo-wash relative hidden w-44 sm:block lg:w-64">
                  <Photo
                    photo={service.photo}
                    width={520}
                    ratio={0.62}
                    sizes="(min-width: 1024px) 256px, 176px"
                    crop="entropy"
                  />
                </div>
              </SmartLink>
            ))}
          </div>
        </div>
      </Section>

      <ConversionCta />
    </>
  )
}
