/**
 * SEO helpers (§10).
 *
 * `seo()` produces the meta array TanStack Start's `head` option expects,
 * covering titles, descriptions, canonical URLs, index controls and
 * social-sharing metadata (SEO-07). The schema builders emit the Organization,
 * Course and Event structured data required by SEO-03 and EVENT-09.
 */

import { site } from '@/lib/site'
import type { Course } from '@/lib/content/training'
import type { EventFormat, SiteEvent } from '@/lib/content/events'
import { photoSrc } from '@/lib/images'
import type { Photo } from '@/lib/images'

type SeoInput = {
  title: string
  description: string
  /** Path only, e.g. `/services/tax-advisory`. Used for the canonical URL. */
  path?: string
  image?: Photo
  keywords?: Array<string>
  type?: 'website' | 'article'
  /** SEO-07 — index controls for pages that should stay out of results. */
  noIndex?: boolean
}

export function seo({
  title,
  description,
  path,
  image,
  keywords,
  type = 'website',
  noIndex = false,
}: SeoInput) {
  const fullTitle = title.includes(site.name)
    ? title
    : `${title} — ${site.name}`
  const url = path ? `${site.url}${path}` : site.url
  const imageUrl = image
    ? photoSrc(image, { w: 1200, ratio: 1.91, q: 75 })
    : undefined

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: 'description', content: description },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: site.locale },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
  ]

  if (keywords?.length)
    meta.push({ name: 'keywords', content: keywords.join(', ') })
  if (imageUrl) {
    meta.push(
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:image', content: imageUrl },
      { property: 'og:image:alt', content: image?.alt ?? title },
    )
  }
  if (noIndex) meta.push({ name: 'robots', content: 'noindex, nofollow' })

  return {
    meta,
    // SEO-06/SEO-08 — every public page declares a stable canonical URL.
    links: [{ rel: 'canonical', href: url }],
  }
}

// -- Structured data (SEO-03) -------------------------------------------------

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${site.url}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/logo.png`,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    sameAs: [site.social.linkedin, site.social.x, site.social.youtube],
    areaServed: ['KE', 'UG', 'TZ', 'RW', 'ET'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Delta Corner, Ring Road Westlands',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
  }
}

export function courseSchema(course: Course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary,
    provider: {
      '@type': 'EducationalOrganization',
      name: site.name,
      sameAs: site.url,
    },
    educationalLevel: course.level,
    timeRequired: `PT${course.hours}H`,
    offers: [
      {
        '@type': 'Offer',
        price: course.priceKes,
        priceCurrency: 'KES',
        availability: 'https://schema.org/InStock',
        category: 'Paid',
      },
      {
        '@type': 'Offer',
        price: course.priceUsd,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: 'Paid',
      },
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.delivery === 'In person' ? 'Onsite' : 'Online',
      courseWorkload: `PT${course.hours}H`,
    },
  }
}

const attendanceModes: Record<EventFormat, string> = {
  Virtual: 'https://schema.org/OnlineEventAttendanceMode',
  Hybrid: 'https://schema.org/MixedEventAttendanceMode',
  'In person': 'https://schema.org/OfflineEventAttendanceMode',
}

export function eventSchema(event: SiteEvent) {
  const attendanceMode = attendanceModes[event.format]

  const location =
    event.format === 'Virtual'
      ? { '@type': 'VirtualLocation', url: `${site.url}/events` }
      : {
          '@type': 'Place',
          name: event.venue,
          address: {
            '@type': 'PostalAddress',
            addressLocality: event.city,
            addressCountry: event.country,
          },
        }

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: event.title,
    description: event.summary,
    startDate: event.startsAt,
    endDate: event.endsAt,
    eventAttendanceMode: attendanceMode,
    eventStatus: 'https://schema.org/EventScheduled',
    location,
    image: photoSrc(event.photo, { w: 1200, ratio: 1.91 }),
    organizer: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    performer: event.speakers.map((name) => ({ '@type': 'Person', name })),
    offers: {
      '@type': 'Offer',
      price: event.priceKes,
      priceCurrency: 'KES',
      availability:
        event.seatsRemaining > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
      url: `${site.url}/events`,
      validFrom: new Date().toISOString(),
    },
  }
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  }
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
