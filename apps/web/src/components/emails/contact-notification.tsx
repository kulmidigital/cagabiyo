import { ActionButton, DetailTable, EmailLayout, Paragraph } from './layout'
import type { ContactPayload } from './types'

const intentLabel: Record<ContactPayload['intent'], string> = {
  advisory: 'Advisory',
  training: 'Training',
  events: 'Events',
  careers: 'Careers',
  general: 'General',
}

export function ContactNotification({
  payload,
  submittedAt,
}: Readonly<{ payload: ContactPayload; submittedAt: string }>) {
  const rows = [
    { label: 'Desk', value: intentLabel[payload.intent] },
    { label: 'Name', value: payload.name },
    { label: 'Organisation', value: payload.organisation || '—' },
    { label: 'Email', value: payload.email },
    { label: 'Phone', value: payload.phone || '—' },
    ...(payload.service ? [{ label: 'Practice', value: payload.service }] : []),
    ...(payload.headcount
      ? [{ label: 'Headcount', value: payload.headcount }]
      : []),
    { label: 'Received', value: submittedAt },
  ]

  return (
    <EmailLayout
      preview={`${intentLabel[payload.intent]} enquiry from ${payload.name}`}
      eyebrow={`${intentLabel[payload.intent]} enquiry`}
      heading={`New enquiry from ${payload.name}`}
    >
      <DetailTable rows={rows} />

      <Paragraph>
        <strong>Message</strong>
      </Paragraph>
      <Paragraph muted>{payload.message}</Paragraph>

      <ActionButton href={`mailto:${payload.email}`}>
        Reply to {payload.name.split(' ')[0]}
      </ActionButton>
    </EmailLayout>
  )
}

export default ContactNotification
