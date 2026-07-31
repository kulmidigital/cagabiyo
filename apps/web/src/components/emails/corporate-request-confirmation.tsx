import { BulletList, DetailTable, EmailLayout, Paragraph } from './layout'
import type { CorporateRequestPayload } from './types'

export function CorporateRequestConfirmation({
  payload,
}: Readonly<{ payload: CorporateRequestPayload }>) {
  const firstName = payload.contactName.split(' ')[0] ?? payload.contactName

  return (
    <EmailLayout
      preview={`Your corporate training request — reference ${payload.reference}`}
      eyebrow="Request received"
      heading={`Thank you, ${firstName}.`}
      footerNote="You are receiving this because you submitted a corporate training request on calibercode.co.ke."
    >
      <Paragraph>
        We have your request for {payload.company}. Our training team confirms
        scheduling and final pricing within two working days.
      </Paragraph>

      <DetailTable
        rows={[
          { label: 'Reference', value: payload.reference },
          { label: 'Delegates', value: String(payload.headcount) },
          { label: 'Delivery', value: payload.delivery },
          { label: 'Modules', value: String(payload.modules.length) },
          {
            label: 'Indicative total',
            value: `${payload.total} (${payload.currency})`,
          },
        ]}
      />

      <Paragraph>
        <strong>Modules you selected</strong>
      </Paragraph>
      <BulletList items={payload.modules} />

      <Paragraph muted>
        The figure above is indicative and valid for thirty days. Quote the
        reference on any bank transfer so your booking reconciles automatically.
        Final pricing and tax treatment are confirmed before an invoice is
        raised.
      </Paragraph>
    </EmailLayout>
  )
}

export default CorporateRequestConfirmation
