import { createFileRoute } from '@tanstack/react-router'

import { seo, breadcrumbSchema, courseSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section } from '@/components/common/section'
import { CourseCatalog } from '@/components/courses/course-catalog'
import { ConversionCta } from '@/components/home/conversion-cta'
import { featuredCourses } from '@/lib/content/training'

export const Route = createFileRoute('/capacity-building/courses')({
  head: () =>
    seo({
      title: 'Course catalog — professional certificates for East Africa',
      description:
        'Self-paced, blended and live-virtual certificates in finance and tax, governance and internal audit, fraud and financial crime, data protection and digital assets, and SME growth and leadership. Priced in KES and USD.',
      path: '/capacity-building/courses',
      image: photos.glassOffice,
      keywords: [
        'professional courses Kenya',
        'online certificate East Africa',
        'fraud risk management training East Africa',
        'CPD courses Nairobi',
      ],
    }),
  component: CoursesPage,
})

function CoursesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Capacity Building', path: '/capacity-building' },
          { name: 'Course Catalog', path: '/capacity-building/courses' },
        ])}
      />
      {/* SEO-03 — Course structured data for the promoted programmes. */}
      {featuredCourses.map((course) => (
        <JsonLd key={course.slug} data={courseSchema(course)} />
      ))}

      <PageHero
        eyebrow="Course catalog"
        title="Professional Certificates"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Capacity Building', href: '/capacity-building' },
          { label: 'Course Catalog' },
        ]}
        align="wide"
      />

      <Section className="py-6 sm:py-10">
        <CourseCatalog />
      </Section>

      <ConversionCta />
    </>
  )
}
