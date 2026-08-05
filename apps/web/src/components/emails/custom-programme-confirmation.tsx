import { SITE_HOST } from './theme'
import { BulletList, DetailTable, EmailLayout, Paragraph } from './layout'
import type { CustomProgrammePayload } from './types'

export function CustomProgrammeConfirmation({
  payload,
}: Readonly<{ payload: CustomProgrammePayload }>) {
  return (
    <EmailLayout
      preview="Your custom programme outline — CaliberCode"
      eyebrow="Programme submitted"
      heading="We have your programme outline."
      footerNote={`You are receiving this because you submitted a custom programme on ${SITE_HOST}.`}
    >
      <Paragraph>
        Thank you. Our training team will come back to you with a costed
        proposal and a suggested cohort schedule.
      </Paragraph>

      <DetailTable
        rows={[
          { label: 'Organisation', value: payload.organisation },
          { label: 'Modules', value: String(payload.modules.length) },
          { label: 'Focus areas', value: String(payload.focusAreas.length) },
          { label: 'Estimated days', value: String(payload.estimatedDays) },
        ]}
      />

      <Paragraph>
        <strong>Modules you selected</strong>
      </Paragraph>
      <BulletList items={payload.modules} />

      <Paragraph muted>
        The duration above assumes half a day per module. Final structure and
        pricing are confirmed by our training team.
      </Paragraph>
    </EmailLayout>
  )
}

export default CustomProgrammeConfirmation
