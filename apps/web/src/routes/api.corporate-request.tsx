import { createFileRoute } from '@tanstack/react-router'

import { CorporateRequestNotification } from '@/components/emails/corporate-request-notification'
import { CorporateRequestConfirmation } from '@/components/emails/corporate-request-confirmation'
import { handleSubmission } from '@/lib/server/handle'
import { internalRecipient, sendPair } from '@/lib/server/mailer'
import { corporateRequestSchema } from '@/lib/server/schemas'
import { formatReceivedAt } from '@/lib/server/format'

export const Route = createFileRoute('/api/corporate-request')({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleSubmission({
          request,
          schema: corporateRequestSchema,
          kind: 'corporate-request',
          send: (input) => {
            const submittedAt = formatReceivedAt()
            const { consent: _consent, website: _website, ...payload } = input

            return sendPair({
              notification: {
                to: internalRecipient(),
                replyTo: input.email,
                subject: `Corporate training — ${input.company} (${input.headcount} delegates)`,
                template: (
                  <CorporateRequestNotification
                    payload={payload}
                    submittedAt={submittedAt}
                  />
                ),
              },
              acknowledgement: {
                to: input.email,
                subject: `Your training request — ${input.reference}`,
                template: <CorporateRequestConfirmation payload={payload} />,
              },
            })
          },
          redact: ({ consent: _c, website: _w, ...rest }) => rest,
        }),
    },
  },
})
