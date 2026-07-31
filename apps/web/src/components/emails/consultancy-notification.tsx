import { ActionButton, DetailTable, EmailLayout, Paragraph } from './layout'
import type { ConsultancyPayload } from './types'

export function ConsultancyNotification({
  payload,
  submittedAt,
}: Readonly<{ payload: ConsultancyPayload; submittedAt: string }>) {
  return (
    <EmailLayout
      preview={`Advisory session request from ${payload.name}`}
      eyebrow="Advisory booking"
      heading={`${payload.name} has requested a session`}
    >
      <DetailTable
        rows={[
          { label: 'Name', value: payload.name },
          { label: 'Organisation', value: payload.organisation || '—' },
          { label: 'Email', value: payload.email },
          { label: 'Phone', value: payload.phone || '—' },
          { label: 'Practice', value: payload.service || 'Not specified' },
          {
            label: 'Preferred date',
            value: payload.preferredDate || 'Flexible',
          },
          { label: 'Received', value: submittedAt },
        ]}
      />

      <Paragraph>
        <strong>What they want to discuss</strong>
      </Paragraph>
      <Paragraph muted>{payload.message}</Paragraph>

      <Paragraph muted>
        Calendar integration is not wired yet — confirm the slot by reply and
        send the invitation manually.
      </Paragraph>

      <ActionButton href={`mailto:${payload.email}`}>
        Confirm a slot
      </ActionButton>
    </EmailLayout>
  )
}

export default ConsultancyNotification
