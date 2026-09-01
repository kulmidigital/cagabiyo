import { createFileRoute } from '@tanstack/react-router'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import {
  AboutOverview,
  AccreditationList,
  LeadershipGrid,
  VisionMission,
  WhoWeServe,
} from '@/components/about/about-sections'
import { ConversionCta } from '@/components/home/conversion-cta'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'About CaliberCode — leadership, governance and accreditation',
      description:
        'CaliberCode is an East African advisory and continuous-learning institution. Meet the partners and faculty, read the governance model, and review our accreditation status.',
      path: '/about',
      image: photos.strategyTable,
      keywords: [
        'CaliberCode leadership',
        'corporate governance Kenya',
        'accredited training provider Kenya',
      ],
    }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <PageHero
        eyebrow="About us"
        title="The Institution"
        lede="CaliberCode advises boards across East Africa and trains the professionals who do that work. The same faculty covers both."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        align="wide"
      />

      <AboutOverview />
      <VisionMission />
      <WhoWeServe />
      <LeadershipGrid />
      <AccreditationList />
      <ConversionCta />
    </>
  )
}
