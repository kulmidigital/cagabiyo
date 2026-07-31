import { createFileRoute } from '@tanstack/react-router'

import { seo } from '@/lib/seo'
import { site } from '@/lib/site'
import { LegalPage } from '@/components/legal/legal-page'

export const Route = createFileRoute('/privacy')({
  head: () =>
    seo({
      title: 'Privacy notice',
      description:
        'How CaliberCode collects, uses and protects personal data under the Kenya Data Protection Act, 2019.',
      path: '/privacy',
    }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy notice"
      lede="How we collect, use and protect personal data, and the rights you have over it under the Kenya Data Protection Act, 2019."
      updated="July 2026"
      sections={[
        {
          heading: 'Who we are',
          body: (
            <p>
              {site.legalName} is the data controller for personal data
              collected through this website. Our registered office is in
              Nairobi, Kenya, and enquiries about this notice can be sent to{' '}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </p>
          ),
        },
        {
          heading: 'What we collect',
          body: (
            <>
              <p>
                Through this website we collect only what a given interaction
                requires:
              </p>
              <ul>
                <li>
                  Enquiry forms — name, organisation, email, phone and your
                  message.
                </li>
                <li>
                  Corporate training requests — company details, contact
                  details, delegate numbers and the modules you select.
                </li>
                <li>
                  Event bookings — delegate name, email and, for M-Pesa, the
                  paying number.
                </li>
                <li>
                  Newsletter — your email address and your consent record.
                </li>
              </ul>
              <p>
                We do not collect special categories of personal data through
                this website, and we do not require an account to browse, search
                or verify a certificate.
              </p>
            </>
          ),
        },
        {
          heading: 'Why we use it, and on what basis',
          body: (
            <p>
              Enquiry and booking data is processed to respond to you and to
              deliver the service you asked for. Marketing email is sent only on
              your explicit consent, which you give by ticking the subscription
              box and can withdraw from any email we send. Payment records are
              retained to meet tax and accounting obligations.
            </p>
          ),
        },
        {
          heading: 'How long we keep it',
          body: (
            <p>
              Retention periods per data category are being confirmed with
              counsel.
            </p>
          ),
        },
        {
          heading: 'Who we share it with',
          body: (
            <p>
              Payment processing, email delivery and hosting are carried out by
              third-party providers acting on our instructions. The specific
              providers are being confirmed as part of the platform build, and
              this section will name each one, the data it receives and the
              country it processes in.
            </p>
          ),
        },
        {
          heading: 'Where your data is held',
          body: (
            <p>
              Personal data is encrypted at rest using AES-256 and in transit
              using TLS 1.3. Primary hosting region and any cross-border
              transfer safeguards are being confirmed.
            </p>
          ),
        },
        {
          heading: 'Certificate verification',
          body: (
            <p>
              Our public verification page publishes only the credential
              holder’s name, the credential title, the issue date, the status
              and the issuing body. Assessment records, contact details,
              employer and cohort membership are never published. The final
              published field set is subject to sign-off.
            </p>
          ),
        },
        {
          heading: 'Cookies and analytics',
          body: (
            <p>
              Analytics, conversion tracking and cookie consent behaviour are
              not yet configured for this site. This section will describe every
              cookie set, its purpose and its lifetime once those decisions are
              made.
            </p>
          ),
        },
        {
          heading: 'Your rights',
          body: (
            <p>
              Under the Kenya Data Protection Act, 2019 you may request access
              to your personal data, ask us to correct or delete it, object to
              processing, or withdraw consent. Send requests to{' '}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
              You also have the right to lodge a complaint with the Office of
              the Data Protection Commissioner.
            </p>
          ),
        },
      ]}
    />
  )
}
