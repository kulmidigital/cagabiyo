import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { FiExternalLink, FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi'
import { TbBrandWhatsapp } from 'react-icons/tb'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section, Eyebrow } from '@/components/common/section'
import { ContactForm } from '@/components/contact/contact-form'
import type { Intent } from '@/components/contact/contact-form'
import { cn } from '@/lib/utils'
import { offices, site } from '@/lib/site'

type ContactSearch = {
  intent?: string
  service?: string
}

export const Route = createFileRoute('/contact')({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    intent: typeof search.intent === 'string' ? search.intent : undefined,
    service: typeof search.service === 'string' ? search.service : undefined,
  }),
  head: () =>
    seo({
      title: 'Contact CaliberCode — offices across East Africa',
      description:
        'Reach the advisory or training desk directly. Offices in Nairobi, Kampala, Dar es Salaam and Kigali, with WhatsApp support during business hours.',
      path: '/contact',
      image: photos.nairobiKICC,
      keywords: [
        'contact CaliberCode',
        'advisory Nairobi',
        'training enquiry East Africa',
      ],
    }),
  component: ContactPage,
})

const validIntents: Set<Intent> = new Set([
  'advisory',
  'training',
  'events',
  'careers',
  'general',
])

function ContactPage() {
  const { intent, service } = Route.useSearch()
  const [activeOffice, setActiveOffice] = useState(0)

  const initialIntent = validIntents.has(intent as Intent)
    ? (intent as Intent)
    : 'general'

  const office = offices[activeOffice]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <PageHero
        eyebrow="Contact"
        title="Contact the advisory or training team."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        align="wide"
      >
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
          <li>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-wipe inline-flex items-center gap-2.5 text-sm text-ink-100 transition-colors hover:text-white"
            >
              <FiMail className="size-4 text-signal-500" aria-hidden="true" />
              {site.contact.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${site.contact.altPhone.replaceAll(' ', '')}`}
              className="link-wipe inline-flex items-center gap-2.5 text-sm text-ink-100 transition-colors hover:text-white"
            >
              <FiPhoneCall
                className="size-4 text-signal-500"
                aria-hidden="true"
              />
              {site.contact.altPhone}
            </a>
          </li>
          <li>
            <a
              href={`tel:${site.contact.phone.replaceAll(' ', '')}`}
              className="link-wipe inline-flex items-center gap-2.5 text-sm text-ink-100 transition-colors hover:text-white"
            >
              <FiPhoneCall
                className="size-4 text-signal-500"
                aria-hidden="true"
              />
              {site.contact.phone}
            </a>
          </li>
          <li>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
              className="link-wipe inline-flex items-center gap-2.5 text-sm text-ink-100 transition-colors hover:text-white"
            >
              <TbBrandWhatsapp
                className="size-4 text-signal-500"
                aria-hidden="true"
              />
              WhatsApp
            </a>
          </li>
        </ul>
      </PageHero>

      <Section className="py-6 sm:py-10">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ContactForm
                initialIntent={initialIntent}
                initialService={service}
              />
            </div>

            {/* CONTACT-01 — regional offices, CONTACT-03 — interactive map */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>Our offices</Eyebrow>

                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                  {offices.map((item, index) => (
                    <button
                      key={item.city}
                      type="button"
                      aria-pressed={activeOffice === index}
                      onClick={() => setActiveOffice(index)}
                      className={cn(
                        'border px-3.5 py-2 text-xs font-medium transition-colors',
                        activeOffice === index
                          ? 'border-ink-900 bg-ink-900 text-white'
                          : 'border-border bg-white text-ink-700 hover:border-ink-300',
                      )}
                    >
                      {item.city}
                    </button>
                  ))}
                </div>

                <div className="mt-5 border border-border bg-white sm:mt-6">
                  <div className="aspect-4/3 w-full bg-sand-100">
                    <iframe
                      key={office.city}
                      title={`Map showing the CaliberCode office in ${office.city}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-lg font-bold text-ink-900">
                        {office.city}
                      </h2>
                      {office.headquarters ? (
                        <span className="text-[0.625rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                          HQ
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {office.role}
                    </p>

                    <address className="mt-4 space-y-0.5 text-sm not-italic text-ink-800">
                      {office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                      <span className="block">{office.country}</span>
                    </address>

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-sm">
                      <a
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 text-ink-700 transition-colors hover:text-signal-700"
                      >
                        <FiPhoneCall className="size-3.5" aria-hidden="true" />
                        {office.phone}
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 text-ink-700 transition-colors hover:text-signal-700"
                      >
                        <FiMapPin className="size-3.5" aria-hidden="true" />
                        Directions
                        <FiExternalLink className="size-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-muted-foreground sm:mt-6">
                  Office hours are 08:30–17:30 EAT, Monday to Friday. Enquiries
                  received outside these hours are answered the next working
                  day.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </>
  )
}
