import { SITE_HOST } from './theme'
import { DetailTable, EmailLayout, Paragraph } from './layout'
import type { ConsultancyPayload } from './types'

export function ConsultancyConfirmation({
  payload,
}: Readonly<{ payload: ConsultancyPayload }>) {
  const firstName = payload.name.split(' ')[0] ?? payload.name

  return (
    <EmailLayout
      preview="Your advisory session request — CaliberCode"
      eyebrow="Booking request received"
      heading={`Thank you, ${firstName}.`}
      footerNote={`You are receiving this because you requested an advisory session on ${SITE_HOST}.`}
    >
      <Paragraph>
        We have your request. The partner who would lead the work will come back
        to you within one working day with times that suit.
      </Paragraph>

      <DetailTable
        rows={[
          { label: 'Practice', value: payload.service || 'To be confirmed' },
          {
            label: 'Preferred date',
            value: payload.preferredDate || 'Flexible',
          },
        ]}
      />

      <Paragraph muted>
        Nothing is confirmed until you receive a calendar invitation from us.
      </Paragraph>
    </EmailLayout>
  )
}

export default ConsultancyConfirmation
