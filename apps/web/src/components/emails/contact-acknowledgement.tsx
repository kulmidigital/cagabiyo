import { SITE_HOST } from './theme'
import { EmailLayout, Paragraph } from './layout'
import type { ContactPayload } from './types'

const deskLabel: Record<ContactPayload['intent'], string> = {
  advisory: 'advisory',
  training: 'training',
  events: 'events',
  careers: 'careers',
  general: 'enquiries',
}

export function ContactAcknowledgement({
  payload,
}: Readonly<{ payload: ContactPayload }>) {
  const firstName = payload.name.split(' ')[0] ?? payload.name

  return (
    <EmailLayout
      preview="We have your enquiry — CaliberCode"
      eyebrow="Enquiry received"
      heading={`Thank you, ${firstName}.`}
      footerNote={`You are receiving this because you submitted an enquiry on ${SITE_HOST}. We use these details only to respond to you, in line with the Kenya Data Protection Act, 2019.`}
    >
      <Paragraph>
        Your enquiry has reached our {deskLabel[payload.intent]} desk. We reply
        within one working day. Office hours are 08:30–17:30 EAT, Monday to
        Friday.
      </Paragraph>

      <Paragraph>
        <strong>What you sent us</strong>
      </Paragraph>
      <Paragraph muted>{payload.message}</Paragraph>

      <Paragraph muted>
        If your question is urgent, our WhatsApp desk is quicker than email.
      </Paragraph>
    </EmailLayout>
  )
}

export default ContactAcknowledgement
