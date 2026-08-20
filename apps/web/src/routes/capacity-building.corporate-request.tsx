import { createFileRoute } from '@tanstack/react-router'
import { FiClock, FiFileText, FiUsers } from 'react-icons/fi'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section } from '@/components/common/section'
import { CorporateRequestForm } from '@/components/capacity/corporate-request-form'

export const Route = createFileRoute('/capacity-building/corporate-request')({
  head: () =>
    seo({
      title: 'Request corporate training',
      description:
        'Tell us your headcount, preferred modules and delivery mode. The request returns a downloadable pro-forma invoice with a unique bank reference for procurement.',
      path: '/capacity-building/corporate-request',
      image: photos.teamCouch,
      keywords: [
        'corporate training request Kenya',
        'in-house training East Africa',
        'staff training quote Nairobi',
      ],
    }),
  component: CorporateRequestPage,
})

const assurances = [
  {
    icon: FiFileText,
    title: 'Pro-Forma On Submission',
    detail:
      'Downloadable, with a unique bank reference for RTGS or EFT settlement.',
  },
  {
    icon: FiUsers,
    title: 'Ten To Several Hundred',
    detail: 'Volume bands apply automatically as delegate numbers rise.',
  },
  {
    icon: FiClock,
    title: 'Confirmed In Two Days',
    detail:
      'Our training team confirms scheduling and final pricing within two working days.',
  },
]

function CorporateRequestPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Capacity Building', path: '/capacity-building' },
          {
            name: 'Corporate Training Request',
            path: '/capacity-building/corporate-request',
          },
        ])}
      />

      <PageHero
        eyebrow="Corporate training"
        title="Request corporate training."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Capacity Building', href: '/capacity-building' },
          { label: 'Corporate Request' },
        ]}
        align="wide"
      >
        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {assurances.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <item.icon
                className="mt-0.5 size-4 flex-none text-signal-500"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-300">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section className="py-6 sm:py-10">
        <div className="shell">
          <div className="mx-auto max-w-4xl">
            <CorporateRequestForm />
          </div>
        </div>
      </Section>
    </>
  )
}
