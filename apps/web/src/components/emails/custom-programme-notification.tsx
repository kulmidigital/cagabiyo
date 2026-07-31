import {
  ActionButton,
  BulletList,
  DetailTable,
  EmailLayout,
  Paragraph,
} from './layout'
import type { CustomProgrammePayload } from './types'

export function CustomProgrammeNotification({
  payload,
  submittedAt,
}: Readonly<{ payload: CustomProgrammePayload; submittedAt: string }>) {
  return (
    <EmailLayout
      preview={`Custom programme request from ${payload.organisation}`}
      eyebrow="Custom programme"
      heading={`${payload.organisation} — ${payload.modules.length} modules`}
    >
      <DetailTable
        rows={[
          { label: 'Organisation', value: payload.organisation },
          { label: 'Email', value: payload.email },
          { label: 'Audience', value: payload.audience || '—' },
          { label: 'Focus areas', value: payload.focusAreas.join(', ') || '—' },
          { label: 'Modules', value: String(payload.modules.length) },
          { label: 'Estimated days', value: String(payload.estimatedDays) },
          { label: 'Received', value: submittedAt },
        ]}
      />

      <Paragraph>
        <strong>Modules selected</strong>
      </Paragraph>
      <BulletList items={payload.modules} />

      <Paragraph muted>
        Duration is estimated at half a day per module and is not a commitment.
        Price this against the agreed rate card before replying.
      </Paragraph>

      <ActionButton href={`mailto:${payload.email}`}>
        Send a costed proposal
      </ActionButton>
    </EmailLayout>
  )
}

export default CustomProgrammeNotification
