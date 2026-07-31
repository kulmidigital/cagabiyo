import { createFileRoute } from '@tanstack/react-router'

import { CustomProgrammeNotification } from '@/components/emails/custom-programme-notification'
import { CustomProgrammeConfirmation } from '@/components/emails/custom-programme-confirmation'
import { handleSubmission } from '@/lib/server/handle'
import { internalRecipient, sendPair } from '@/lib/server/mailer'
import { customProgrammeSchema } from '@/lib/server/schemas'
import { formatReceivedAt } from '@/lib/server/format'

export const Route = createFileRoute('/api/custom-programme')({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleSubmission({
          request,
          schema: customProgrammeSchema,
          kind: 'custom-programme',
          send: (input) => {
            const submittedAt = formatReceivedAt()
            const { consent: _consent, website: _website, ...payload } = input

            return sendPair({
              notification: {
                to: internalRecipient(),
                replyTo: input.email,
                subject: `Custom programme — ${input.organisation} (${input.modules.length} modules)`,
                template: (
                  <CustomProgrammeNotification
                    payload={payload}
                    submittedAt={submittedAt}
                  />
                ),
              },
              acknowledgement: {
                to: input.email,
                subject: 'Your custom programme outline — CaliberCode',
                template: <CustomProgrammeConfirmation payload={payload} />,
              },
            })
          },
          redact: ({ consent: _c, website: _w, ...rest }) => rest,
        }),
    },
  },
})
