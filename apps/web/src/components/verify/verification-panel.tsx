import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiSearch,
  FiXCircle,
  FiExternalLink,
} from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/common/button-link'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'
import {
  formatCertificateDate,
  linkedInAddUrl,
  verifyCertificate,
} from '@/lib/content/certificates'
import type { VerificationResult } from '@/lib/content/certificates'

export function VerificationPanel({
  initialResult,
  initialQuery = '',
}: Readonly<{
  initialResult?: VerificationResult
  initialQuery?: string
}>) {
  const [query, setQuery] = useState(initialQuery)
  const [result, setResult] = useState<VerificationResult | null>(
    initialResult ?? null,
  )

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!query.trim()) return
    setResult(verifyCertificate(query))
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="verify-input" className="sr-only">
            Certificate identifier
          </label>
          <FiSearch
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="verify-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="CERT-CC-2026-89421"
            spellCheck={false}
            autoComplete="off"
            aria-describedby="verify-hint"
            className="numeric h-13 w-full border border-input bg-white pr-4 pl-11 text-sm tracking-wide outline-none transition-colors focus:border-signal-500"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-13 bg-signal-500 text-ink-950 hover:bg-signal-400"
        >
          Verify
        </Button>
      </form>

      <p id="verify-hint" className="mt-3 text-xs text-muted-foreground">
        The identifier is printed on the certificate and encoded in its QR code.
        Scanning the code brings you straight to the result.
      </p>

      {result ? (
        <div className="mt-8 sm:mt-10" role="status" aria-live="polite">
          <ResultCard result={result} />
        </div>
      ) : null}
    </div>
  )
}

export function ResultCard({
  result,
}: Readonly<{ result: VerificationResult }>) {
  if (result.outcome === 'malformed') {
    return (
      <Outcome
        tone="warn"
        icon={FiAlertCircle}
        title="That does not look like a CaliberCode identifier"
        body={
          <>
            Identifiers take the form{' '}
            <span className="numeric font-medium">CERT-CC-2026-89421</span>.
            Check the certificate and try again.
          </>
        }
      />
    )
  }

  if (result.outcome === 'not-found') {
    return (
      <Outcome
        tone="warn"
        icon={FiAlertCircle}
        title="No certificate found"
        body={
          <>
            We hold no record of{' '}
            <span className="numeric font-medium">{result.query}</span>. If you
            believe this credential is genuine, contact us and we will check the
            register directly.
          </>
        }
      />
    )
  }

  const { certificate } = result
  const revoked = result.outcome === 'revoked'
  const expired = result.outcome === 'expired'

  if (revoked || expired) {
    return (
      <Outcome
        tone="invalid"
        icon={FiXCircle}
        title={
          revoked
            ? 'This credential has been revoked'
            : 'This credential has expired'
        }
        body={
          revoked ? (
            <>
              The certificate{' '}
              <span className="numeric font-medium">{certificate.id}</span> was
              issued but has since been withdrawn by the Ethics & Quality Panel.
              It should not be relied upon.
            </>
          ) : (
            <>
              The certificate{' '}
              <span className="numeric font-medium">{certificate.id}</span> was
              valid until {formatCertificateDate(certificate.expiresOn!)} and
              now requires renewal.
            </>
          )
        }
      >
        <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-current/15 pt-6 sm:grid-cols-2">
          <Detail label="Credential" value={certificate.credential} />
          <Detail
            label="Issued"
            value={formatCertificateDate(certificate.issuedOn)}
          />
        </dl>
      </Outcome>
    )
  }

  return (
    <div className="border border-signal-300 bg-white">
      <div className="flex items-start gap-4 border-b border-signal-200 bg-signal-50 p-6 sm:p-7">
        <span className="inline-flex size-11 flex-none items-center justify-center bg-signal-500">
          <FiCheckCircle className="size-5 text-ink-950" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-ink-900">
            Credential verified
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This certificate was issued by {site.name} and remains valid.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        {/* VERIFY-06 / SEC-07 — approved public fields only. */}
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          <Detail label="Holder" value={certificate.holderName} />
          <Detail label="Credential" value={certificate.credential} />
          <Detail
            label="Issued on"
            value={formatCertificateDate(certificate.issuedOn)}
          />
          <Detail
            label="Valid until"
            value={
              certificate.expiresOn
                ? formatCertificateDate(certificate.expiresOn)
                : 'No expiry'
            }
          />
          <Detail label="Issued by" value={site.legalName} />
          <Detail label="Certificate ID" value={certificate.id} numeric />
          {certificate.cpdHours ? (
            <Detail
              label="CPD hours"
              value={String(certificate.cpdHours)}
              numeric
            />
          ) : null}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-7">
          {/* VERIFY-04 */}
          <ButtonLink href={linkedInAddUrl(certificate, site.url)}>
            Add to LinkedIn profile
            <FiExternalLink
              className="size-3.5"
              data-icon="inline-end"
              aria-hidden="true"
            />
          </ButtonLink>
          <Button variant="outline" onClick={() => window.print()}>
            Print this result
          </Button>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Only the fields above are published. Assessment records, contact
          details and cohort membership are never exposed through verification.
        </p>
      </div>
    </div>
  )
}

function Outcome({
  tone,
  icon: Icon,
  title,
  body,
  children,
}: Readonly<{
  tone: 'warn' | 'invalid'
  icon: typeof FiAlertCircle
  title: string
  body: React.ReactNode
  children?: React.ReactNode
}>) {
  return (
    <div
      className={cn(
        'border p-6 sm:p-7',
        tone === 'invalid'
          ? 'border-destructive/40 bg-destructive/5 text-destructive'
          : 'border-ink-200 bg-sand-50 text-ink-900',
      )}
    >
      <div className="flex items-start gap-4">
        <Icon className="mt-0.5 size-6 flex-none" aria-hidden="true" />
        <div className="flex-1">
          <h2 className="text-lg font-bold">{title}</h2>
          <p
            className={cn(
              'mt-2 text-sm leading-relaxed',
              tone === 'invalid'
                ? 'text-destructive/85'
                : 'text-muted-foreground',
            )}
          >
            {body}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}

function Detail({
  label,
  value,
  numeric,
}: Readonly<{
  label: string
  value: string
  numeric?: boolean
}>) {
  return (
    <div>
      <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={cn('mt-1.5 font-medium text-ink-900', numeric && 'numeric')}
      >
        {value}
      </dd>
    </div>
  )
}
