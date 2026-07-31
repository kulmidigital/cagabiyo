import { createFileRoute } from '@tanstack/react-router'

import { seo, organizationSchema } from '@/lib/seo'
import { site } from '@/lib/site'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { HomeHero } from '@/components/home/hero'
import { AccreditationStrip } from '@/components/home/accreditation-strip'
import { ImpactMetrics } from '@/components/home/impact-metrics'
import { PracticeAreas } from '@/components/home/practice-areas'
import { CapacityOverview } from '@/components/home/capacity-overview'
import { FeaturedCourses } from '@/components/home/featured-courses'
import { UpcomingEvents } from '@/components/home/upcoming-events'
import { Testimonials } from '@/components/home/testimonials'
import { InsightsPreview } from '@/components/home/insights-preview'
import { ConversionCta } from '@/components/home/conversion-cta'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      path: '/',
      image: photos.boardroomWide,
      keywords: [
        'advisory Kenya',
        'corporate training East Africa',
        'Tax Advisory Kenya',
        'IS Audit Training East Africa',
        'governance risk compliance Nairobi',
      ],
    }),
  component: Home,
})

function Home() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <HomeHero />
      <AccreditationStrip />
      <ImpactMetrics />
      <PracticeAreas />
      <CapacityOverview />
      <FeaturedCourses />
      <UpcomingEvents />
      <Testimonials />
      <InsightsPreview />
      <ConversionCta />
    </>
  )
}
