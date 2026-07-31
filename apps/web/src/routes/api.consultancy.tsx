import { createFileRoute } from '@tanstack/react-router'

import { ConsultancyNotification } from '@/components/emails/consultancy-notification'
import { ConsultancyConfirmation } from '@/components/emails/consultancy-confirmation'
import { handleSubmission } from '@/lib/server/handle'
import { internalRecipient, sendPair } from '@/lib/server/mailer'
import { consultancySchema } from '@/lib/server/schemas'
import { formatReceivedAt } from '@/lib/server/format'

export const Route = createFileRoute('/api/consultancy')({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleSubmission({
          request,
          schema: consultancySchema,
          kind: 'consultancy',
          send: (input) => {
            const submittedAt = formatReceivedAt()
            const { consent: _consent, company: _company, ...payload } = input

            return sendPair({
              notification: {
                to: internalRecipient(),
                replyTo: input.email,
                subject: `Advisory session request — ${input.name}`,
                template: (
                  <ConsultancyNotification
                    payload={payload}
                    submittedAt={submittedAt}
                  />
                ),
              },
              acknowledgement: {
                to: input.email,
                subject: 'Your advisory session request — CaliberCode',
                template: <ConsultancyConfirmation payload={payload} />,
              },
            })
          },
          redact: ({ consent: _c, company: _h, ...rest }) => rest,
        }),
    },
  },
})
