import { createFileRoute } from '@tanstack/react-router'
import { FiLock, FiShield, FiSmartphone } from 'react-icons/fi'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section } from '@/components/common/section'
import { VerificationPanel } from '@/components/verify/verification-panel'

export const Route = createFileRoute('/verify/')({
  head: () =>
    seo({
      title: 'Verify a CaliberCode certificate',
      description:
        'Confirm that a CaliberCode credential is genuine. Enter the certificate identifier or scan the QR code printed on the certificate.',
      path: '/verify',
      keywords: ['verify certificate Kenya', 'CaliberCode credential check'],
    }),
  component: VerifyPage,
})

const assurances = [
  {
    icon: FiShield,
    title: 'Issued from our register',
    detail: 'Results are read from the credential register.',
  },
  {
    icon: FiSmartphone,
    title: 'Scannable from the certificate',
    detail: 'The printed QR code opens this result directly.',
  },
  {
    icon: FiLock,
    title: 'Minimal disclosure',
    detail: 'Only the fields needed to confirm the claim are published.',
  },
]

function VerifyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Verify a certificate', path: '/verify' },
        ])}
      />

      <PageHero
        eyebrow="Credential verification"
        title="Check a certificate identifier."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Verify' }]}
        align="wide"
      />

      <Section className="py-6 sm:py-10">
        <div className="shell">
          <VerificationPanel />

          <ul className="rule-grid mx-auto mt-8 grid max-w-4xl sm:mt-10 sm:grid-cols-3">
            {assurances.map((item) => (
              <li key={item.title} className="bg-white p-6 sm:p-7">
                <item.icon
                  className="size-5 text-signal-600"
                  aria-hidden="true"
                />
                <h2 className="mt-5 text-sm font-bold text-ink-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
