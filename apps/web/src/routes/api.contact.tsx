import { createFileRoute } from '@tanstack/react-router'

import { ContactNotification } from '@/components/emails/contact-notification'
import { ContactAcknowledgement } from '@/components/emails/contact-acknowledgement'
import { handleSubmission } from '@/lib/server/handle'
import { internalRecipient, sendPair } from '@/lib/server/mailer'
import { contactSchema } from '@/lib/server/schemas'
import { formatReceivedAt } from '@/lib/server/format'

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleSubmission({
          request,
          schema: contactSchema,
          kind: 'contact',
          send: (input) => {
            const submittedAt = formatReceivedAt()
            const payload = {
              intent: input.intent,
              name: input.name,
              organisation: input.organisation,
              email: input.email,
              phone: input.phone,
              service: input.service,
              headcount: input.headcount,
              message: input.message,
            }

            return sendPair({
              notification: {
                to: internalRecipient(),
                replyTo: input.email,
                subject: `[${input.intent}] Enquiry from ${input.name}`,
                template: (
                  <ContactNotification
                    payload={payload}
                    submittedAt={submittedAt}
                  />
                ),
              },
              acknowledgement: {
                to: input.email,
                subject: 'We have your enquiry — CaliberCode',
                template: <ContactAcknowledgement payload={payload} />,
              },
            })
          },
          redact: (input) => ({
            intent: input.intent,
            name: input.name,
            organisation: input.organisation,
            email: input.email,
            phone: input.phone,
            service: input.service,
            headcount: input.headcount,
            message: input.message,
          }),
        }),
    },
  },
})
