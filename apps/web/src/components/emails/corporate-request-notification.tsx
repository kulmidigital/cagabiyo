import {
  ActionButton,
  BulletList,
  DetailTable,
  EmailLayout,
  Paragraph,
} from './layout'
import type { CorporateRequestPayload } from './types'

export function CorporateRequestNotification({
  payload,
  submittedAt,
}: Readonly<{ payload: CorporateRequestPayload; submittedAt: string }>) {
  const rows = [
    { label: 'Company', value: payload.company },
    { label: 'Industry', value: payload.industry || '—' },
    { label: 'Contact', value: payload.contactName },
    { label: 'Role', value: payload.role || '—' },
    { label: 'Email', value: payload.email },
    { label: 'Phone', value: payload.phone || '—' },
    { label: 'Delegates', value: String(payload.headcount) },
    { label: 'Delivery', value: payload.delivery },
    { label: 'Location', value: payload.location || '—' },
    { label: 'Timeframe', value: payload.timeframe || 'To be agreed' },
    { label: 'Reference', value: payload.reference },
    {
      label: 'Indicative total',
      value: `${payload.total} (${payload.currency})`,
    },
    { label: 'Received', value: submittedAt },
  ]

  return (
    <EmailLayout
      preview={`Corporate training request from ${payload.company}`}
      eyebrow="Corporate training request"
      heading={`${payload.company} — ${payload.headcount} delegates`}
    >
      <DetailTable rows={rows} />

      <Paragraph>
        <strong>Modules selected ({payload.modules.length})</strong>
      </Paragraph>
      <BulletList items={payload.modules} />

      {payload.notes ? (
        <>
          <Paragraph>
            <strong>Notes</strong>
          </Paragraph>
          <Paragraph muted>{payload.notes}</Paragraph>
        </>
      ) : null}

      <Paragraph muted>
        The pro-forma shown to the requester is indicative. Confirm scheduling
        and final pricing within two working days.
      </Paragraph>

      <ActionButton href={`mailto:${payload.email}`}>
        Reply to {payload.company}
      </ActionButton>
    </EmailLayout>
  )
}

export default CorporateRequestNotification
