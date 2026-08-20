/**
 * Public certificate verification (§4.9).
 *
 * VERIFY-06 is a *decision required* item: the proposal does not settle which
 * credential fields may be shown publicly without breaching learner privacy.
 * The conservative set below is what this implementation exposes — enough for a
 * recruiter to confirm a claim, and nothing more (SEC-07):
 *
 *   holder name · credential title · issue date · status · issuing body
 *
 * Deliberately withheld pending that decision: email address, grades, scores,
 * attendance records, employer, and cohort membership.
 *
 * The records here are fixtures. In production this resolves against the LMS
 * credential store; the identifier is a hash (VERIFY-03), so it is not
 * guessable and enumerating it yields nothing.
 */

export type CertificateStatus = 'valid' | 'revoked' | 'expired'

export type Certificate = {
  /** VERIFY-03 — unique hash identifier printed on the certificate. */
  id: string
  holderName: string
  credential: string
  issuedOn: string
  /** Present where the credential requires periodic renewal. */
  expiresOn?: string
  status: CertificateStatus
  cpdHours?: number
}

export const certificates: Array<Certificate> = [
  {
    id: 'CERT-CC-2026-89421',
    holderName: 'Collins Barasa',
    credential: 'Certificate In Data Protection & Privacy Compliance',
    issuedOn: '2026-05-18',
    status: 'valid',
    cpdHours: 21,
  },
  {
    id: 'CERT-CC-2026-71330',
    holderName: 'Mercy Adhiambo',
    credential: 'Certificate In Corporate Governance & Board Effectiveness',
    issuedOn: '2026-03-02',
    status: 'valid',
    cpdHours: 16,
  },
  {
    id: 'CERT-CC-2025-40218',
    holderName: 'Peter Wanyama',
    credential: 'Certificate In Risk-Based Internal Auditing',
    issuedOn: '2025-09-11',
    expiresOn: '2028-09-11',
    status: 'valid',
    cpdHours: 30,
  },
  {
    id: 'CERT-CC-2024-11907',
    holderName: 'Withheld',
    credential: 'Certificate In Fraud Risk Management',
    issuedOn: '2024-07-22',
    status: 'revoked',
  },
  {
    id: 'CERT-CC-2022-55014',
    holderName: 'Withheld',
    credential: 'Certificate In Virtual Asset Compliance',
    issuedOn: '2022-02-14',
    expiresOn: '2025-02-14',
    status: 'expired',
  },
]

export type VerificationResult =
  | { outcome: 'valid'; certificate: Certificate }
  | { outcome: 'revoked'; certificate: Certificate }
  | { outcome: 'expired'; certificate: Certificate }
  | { outcome: 'not-found'; query: string }
  | { outcome: 'malformed'; query: string }

/** Identifiers follow CERT-CC-<year>-<serial>. */
const ID_PATTERN = /^CERT-CC-\d{4}-\d{4,6}$/i

/** VERIFY-05 — returns a clear valid / invalid / not-found outcome. */
export function verifyCertificate(rawQuery: string): VerificationResult {
  const query = rawQuery.trim().toUpperCase()

  if (!ID_PATTERN.test(query))
    return { outcome: 'malformed', query: rawQuery.trim() }

  const certificate = certificates.find(
    (item) => item.id.toUpperCase() === query,
  )
  if (!certificate) return { outcome: 'not-found', query }

  return { outcome: certificate.status, certificate }
}

export function formatCertificateDate(iso: string): string {
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Nairobi',
  }).format(new Date(iso))
}

/**
 * VERIFY-04 — one-click "Add to LinkedIn Profile".
 *
 * Uses LinkedIn's public add-to-profile parameters; `certUrl` points back at
 * the public verification page so anyone checking the profile lands on proof.
 */
export function linkedInAddUrl(
  certificate: Certificate,
  siteUrl: string,
): string {
  const issued = new Date(certificate.issuedOn)
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: certificate.credential,
    organizationName: 'CaliberCode',
    issueYear: String(issued.getFullYear()),
    issueMonth: String(issued.getMonth() + 1),
    certUrl: `${siteUrl}/verify/${certificate.id}`,
    certId: certificate.id,
  })

  if (certificate.expiresOn) {
    const expires = new Date(certificate.expiresOn)
    params.set('expirationYear', String(expires.getFullYear()))
    params.set('expirationMonth', String(expires.getMonth() + 1))
  }

  return `https://www.linkedin.com/profile/add?${params.toString()}`
}
