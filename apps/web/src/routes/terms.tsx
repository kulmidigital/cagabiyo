import { createFileRoute } from '@tanstack/react-router'

import { seo } from '@/lib/seo'
import { site } from '@/lib/site'
import { LegalPage } from '@/components/legal/legal-page'

export const Route = createFileRoute('/terms')({
  head: () =>
    seo({
      title: 'Terms & booking policy',
      description:
        'Booking, payment, transfer and cancellation terms for CaliberCode courses, workshops and corporate training.',
      path: '/terms',
    }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Booking Policy"
      lede="The terms that apply when you book a seat, enrol on a course, or commission corporate training."
      updated="July 2026"
      sections={[
        {
          heading: 'Booking And Confirmation',
          body: (
            <p>
              A seat or enrolment is confirmed only once payment has been
              verified. Until then a selection is held but not reserved. On
              confirmation we email a receipt and, for events, a QR-coded entry
              ticket. The QR code is scanned once at registration.
            </p>
          ),
        },
        {
          heading: 'Payment Methods And Currency',
          body: (
            <p>
              We accept M-Pesa, Visa and Mastercard, and bank transfer including
              RTGS and EFT. Prices are shown in Kenya Shillings and US Dollars.
              Institutional buyers may request a pro-forma invoice carrying a
              unique bank reference; quoting that reference on the transfer
              allows the booking to reconcile automatically.
            </p>
          ),
        },
        {
          heading: 'Pro-Forma Invoices',
          body: (
            <p>
              A pro-forma invoice generated from the corporate training request
              is indicative. It is valid for thirty days and is confirmed by our
              training team before a tax invoice is raised. Final pricing, tax
              treatment and invoice numbering are subject to confirmation.
            </p>
          ),
        },
        {
          heading: 'Transfers And Substitutions',
          body: (
            <p>
              Notice periods for transferring to a later cohort, and the
              conditions for substituting a delegate, are being confirmed. In
              the meantime, contact the training team as early as possible and
              we will accommodate where the cohort allows.
            </p>
          ),
        },
        {
          heading: 'Cancellations And Refunds',
          body: (
            <p>
              Refund eligibility, notice windows and any administration charge
              are being confirmed with the finance team. Where CaliberCode
              cancels or reschedules an event, delegates may transfer to the
              next available date or receive a full refund.
            </p>
          ),
        },
        {
          heading: 'Failed And Duplicate Payments',
          body: (
            <p>
              If a payment fails, is cancelled or times out, no booking is
              created and no charge is retained. Where a duplicate charge occurs
              through a repeated payment callback, the duplicate is reversed
              automatically.
            </p>
          ),
        },
        {
          heading: 'Credentials',
          body: (
            <p>
              Certificates are issued on completion of the assessed requirements
              for the programme and carry a unique identifier verifiable at{' '}
              <span className="text-ink-800">
                {site.url.replace(/^https?:\/\//, '')}/verify
              </span>
              . We may revoke a credential where it was obtained improperly;
              revoked credentials report as revoked on the verification page.
            </p>
          ),
        },
        {
          heading: 'Delivery And Changes To Programmes',
          body: (
            <p>
              We may substitute faculty or adjust venue, running order and
              delivery mode where circumstances require, provided the learning
              outcomes are preserved. Material changes are notified to
              registered delegates in advance.
            </p>
          ),
        },
      ]}
    />
  )
}
