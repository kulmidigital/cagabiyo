import { createFileRoute } from '@tanstack/react-router'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section } from '@/components/common/section'
import {
  ResultCard,
  VerificationPanel,
} from '@/components/verify/verification-panel'
import { verifyCertificate } from '@/lib/content/certificates'

/**
 * QR-scan landing route (VERIFY-01, VERIFY-02).
 *
 * `/verify/CERT-CC-2026-89421` resolves the identifier server-side and renders
 * the outcome on first paint, so a scan produces an answer without a round trip
 * or a client-side flash.
 *
 * Marked `noIndex`: individual credential pages are for the person holding the
 * link, not for search engines to index against a learner's name (SEC-07).
 */
export const Route = createFileRoute('/verify/$certificateId')({
  loader: ({ params }) => ({ result: verifyCertificate(params.certificateId) }),
  head: ({ params }) =>
    seo({
      title: `Verify certificate ${params.certificateId}`,
      description: 'Confirm that this CaliberCode credential is genuine.',
      path: `/verify/${params.certificateId}`,
      noIndex: true,
    }),
  component: VerifyResultPage,
})

function VerifyResultPage() {
  const { result } = Route.useLoaderData()
  const { certificateId } = Route.useParams()

  const found = result.outcome !== 'not-found' && result.outcome !== 'malformed'

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Verify A Certificate', path: '/verify' },
        ])}
      />

      <PageHero
        eyebrow="Credential verification"
        title={found ? 'Verification Result' : 'Identifier Not Recognised'}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Verify', href: '/verify' },
          { label: certificateId },
        ]}
        align="wide"
      />

      <Section className="py-6 sm:py-10">
        <div className="shell">
          <div className="mx-auto max-w-2xl">
            <ResultCard result={result} />

            <div className="mt-8 border-t border-border pt-8 sm:mt-10 sm:pt-10">
              <h2 className="mb-4 text-sm font-bold text-ink-900 sm:mb-5">
                Check Another Certificate
              </h2>
              <VerificationPanel />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
