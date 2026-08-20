import { createFileRoute } from '@tanstack/react-router'
import { FiCreditCard, FiSmartphone, FiTag } from 'react-icons/fi'

import { seo, breadcrumbSchema, eventSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section } from '@/components/common/section'
import { EventsBrowser } from '@/components/events/events-browser'
import { ConversionCta } from '@/components/home/conversion-cta'
import { events } from '@/lib/content/events'

export const Route = createFileRoute('/events')({
  head: () =>
    seo({
      title: 'Events & workshops — open dates across East Africa',
      description:
        'Public workshops, executive masterclasses, webinars and forums across Nairobi, Kampala and the region. Reserve a seat with M-Pesa or card and receive a QR-coded entry ticket.',
      path: '/events',
      image: photos.auditorium,
      keywords: [
        'professional workshops Nairobi',
        'executive masterclass Kenya',
        'finance events East Africa',
      ],
    }),
  component: EventsPage,
})

const assurances = [
  { icon: FiSmartphone, label: 'M-Pesa STK Push' },
  { icon: FiCreditCard, label: 'Visa & Mastercard' },
  { icon: FiTag, label: 'QR Ticket By Email' },
]

function EventsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Events', path: '/events' },
        ])}
      />
      {/* EVENT-09 / SEO-03 — Event structured data for every listed date. */}
      {events.map((event) => (
        <JsonLd key={event.slug} data={eventSchema(event)} />
      ))}

      <PageHero
        eyebrow="Events & workshops"
        title="Upcoming workshops, masterclasses and webinars."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
        align="wide"
      >
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {assurances.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2.5 text-sm text-ink-100"
            >
              <item.icon
                className="size-4 text-signal-500"
                aria-hidden="true"
              />
              {item.label}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section className="py-6 sm:py-10">
        <EventsBrowser />
      </Section>

      <ConversionCta />
    </>
  )
}
