import { EmailLayout, Paragraph } from './layout'
import type { NewsletterPayload } from './types'

export function NewsletterWelcome({
  payload,
  unsubscribeUrl,
}: Readonly<{ payload: NewsletterPayload; unsubscribeUrl: string }>) {
  return (
    <EmailLayout
      preview="You are subscribed to the CaliberCode monthly briefing"
      eyebrow="Newsletter"
      heading="You are on the list."
      footerNote={`You subscribed on ${payload.consentAt}. Unsubscribe at any time using the link in any email we send — your consent record is kept only to evidence this subscription, per the Kenya Data Protection Act, 2019.`}
    >
      <Paragraph>
        Once a month you will get regulatory change across East Africa, plus new
        programmes and open masterclass dates. Nothing else.
      </Paragraph>

      <Paragraph muted>
        If this was not you, <a href={unsubscribeUrl}>unsubscribe here</a> and
        we will remove the address immediately.
      </Paragraph>
    </EmailLayout>
  )
}

export default NewsletterWelcome
