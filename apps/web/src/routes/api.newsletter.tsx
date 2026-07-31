import { createFileRoute } from '@tanstack/react-router'

import { NewsletterWelcome } from '@/components/emails/newsletter-welcome'
import { NewsletterNotification } from '@/components/emails/newsletter-notification'
import { handleSubmission } from '@/lib/server/handle'
import { internalRecipient, sendPair } from '@/lib/server/mailer'
import { newsletterSchema } from '@/lib/server/schemas'
import { formatReceivedAt } from '@/lib/server/format'

/**
 * NOT YET ON A MAILING PROVIDER.
 *
 * Requirement 4 asks for the address to be added to Mailchimp / Brevo / Resend
 * Audiences. Only RESEND_API_KEY, FROM_NAME, FROM_EMAIL and TO_EMAIL exist in
 * the environment, and a Resend Audience write needs an audience id — so no
 * list write is attempted rather than one being guessed at.
 *
 * What is here: the consent timestamp is captured and logged, the subscriber
 * gets a welcome, the team is notified, and every message carries RFC 8058
 * unsubscribe headers pointing at the contact address. Add
 * `RESEND_AUDIENCE_ID` and a `resend.contacts.create()` call to complete it.
 */
export const Route = createFileRoute('/api/newsletter')({
  server: {
    handlers: {
      POST: ({ request }) =>
        handleSubmission({
          request,
          schema: newsletterSchema,
          kind: 'newsletter',
          send: (input) => {
            const consentAt = formatReceivedAt()
            const payload = { email: input.email, consentAt }
            const unsubscribe = `mailto:${internalRecipient()}?subject=Unsubscribe%20${encodeURIComponent(input.email)}`

            return sendPair({
              notification: {
                to: internalRecipient(),
                subject: `Newsletter subscription — ${input.email}`,
                template: <NewsletterNotification payload={payload} />,
              },
              acknowledgement: {
                to: input.email,
                subject: 'You are subscribed — CaliberCode monthly briefing',
                template: (
                  <NewsletterWelcome
                    payload={payload}
                    unsubscribeUrl={unsubscribe}
                  />
                ),
                headers: {
                  'List-Unsubscribe': `<${unsubscribe}>`,
                  'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
                },
              },
            })
          },
          redact: (input) => ({
            email: input.email,
            consent: true,
          }),
        }),
    },
  },
})
