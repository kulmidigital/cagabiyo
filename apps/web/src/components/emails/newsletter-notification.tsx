import { DetailTable, EmailLayout } from './layout'
import type { NewsletterPayload } from './types'

export function NewsletterNotification({
  payload,
}: Readonly<{ payload: NewsletterPayload }>) {
  return (
    <EmailLayout
      preview={`New newsletter subscriber: ${payload.email}`}
      eyebrow="Newsletter"
      heading="New subscriber"
    >
      <DetailTable
        rows={[
          { label: 'Email', value: payload.email },
          { label: 'Consent given', value: payload.consentAt },
        ]}
      />
    </EmailLayout>
  )
}

export default NewsletterNotification
