import { FiDownload, FiPrinter } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { site, offices } from '@/lib/site'
import {
  formatAmount,
  formatQuoteDate,
  VAT_RATE,
  VALIDITY_DAYS,
} from '@/lib/pricing'
import type { Quote } from '@/lib/pricing'

export type ProformaDetails = {
  company: string
  contactName: string
  email: string
  phone: string
  headcount: number
  delivery: string
  location: string
  timeframe: string
}

export function ProformaInvoice({
  quote,
  details,
}: Readonly<{
  quote: Quote
  details: ProformaDetails
}>) {
  const hq = offices.find((office) => office.headquarters) ?? offices[0]

  const download = () => {
    const blob = new Blob([proformaHtml(quote, details, hq.lines.join(', '))], {
      type: 'text/html;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${quote.reference}-proforma.html`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="border border-border bg-white">
      {/* Header */}
      <div className="surface-ink flex flex-wrap items-start justify-between gap-6 p-6 sm:p-8">
        <div>
          <img
            src="/logo.png"
            alt={site.name}
            width={125}
            height={60}
            className="h-9 w-auto"
          />
          <p className="mt-4 text-xs leading-relaxed text-ink-300">
            {site.legalName}
            <br />
            {hq.lines.join(', ')}
            <br />
            {site.contact.email}
          </p>
        </div>
        <div className="text-right">
          <p className="eyebrow justify-end text-signal-400">
            Pro-forma invoice
          </p>
          <p className="numeric mt-3 text-lg font-bold text-white">
            {quote.reference}
          </p>
          <p className="numeric mt-2 text-xs text-ink-300">
            Issued {formatQuoteDate(quote.issuedOn)}
            <br />
            Valid until {formatQuoteDate(quote.validUntil)}
          </p>
        </div>
      </div>

      {/* Parties */}
      <div className="grid gap-6 border-b border-border p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
        <div>
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Billed to
          </p>
          <p className="mt-3 text-sm font-bold text-ink-900">
            {details.company}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {details.contactName}
            <br />
            {details.email}
            <br />
            {details.phone}
          </p>
        </div>
        <div>
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Delivery
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <Row label="Mode" value={details.delivery} />
            <Row label="Location" value={details.location || '—'} />
            <Row label="Delegates" value={String(details.headcount)} />
            <Row
              label="Timeframe"
              value={details.timeframe || 'To be agreed'}
            />
          </dl>
        </div>
      </div>

      {/* Lines */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-125 text-sm">
          <thead>
            <tr className="border-b border-border bg-sand-50 text-left">
              <th
                scope="col"
                className="px-8 py-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase"
              >
                Module
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase"
              >
                Delegates
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase"
              >
                Unit
              </th>
              <th
                scope="col"
                className="px-8 py-3 text-right text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {quote.lines.map((line) => (
              <tr key={line.description}>
                <td className="px-8 py-4 text-ink-900">{line.description}</td>
                <td className="numeric px-4 py-4 text-right text-muted-foreground">
                  {line.quantity}
                </td>
                <td className="numeric px-4 py-4 text-right text-muted-foreground">
                  {formatAmount(line.unitPrice, quote.currency)}
                </td>
                <td className="numeric px-8 py-4 text-right font-medium text-ink-900">
                  {formatAmount(line.amount, quote.currency)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-ink-900">
            <tr>
              <td
                colSpan={3}
                className="px-8 py-3 text-right text-muted-foreground"
              >
                Subtotal{' '}
                <span className="text-xs">({quote.discountLabel})</span>
              </td>
              <td className="numeric px-8 py-3 text-right font-medium text-ink-900">
                {formatAmount(quote.subtotal, quote.currency)}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="px-8 py-3 text-right text-muted-foreground"
              >
                VAT at {Math.round(VAT_RATE * 100)}%
              </td>
              <td className="numeric px-8 py-3 text-right font-medium text-ink-900">
                {formatAmount(quote.vat, quote.currency)}
              </td>
            </tr>
            <tr className="bg-sand-100">
              <td
                colSpan={3}
                className="px-8 py-4 text-right font-bold text-ink-900"
              >
                Total due
              </td>
              <td className="numeric px-8 py-4 text-right text-lg font-bold text-ink-900">
                {formatAmount(quote.total, quote.currency)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Settlement (PAY-06, PAY-07) */}
      <div className="grid gap-6 border-t border-border p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
        <div>
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Settlement
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Payable by bank transfer, RTGS or EFT. Quote the reference below on
            the transfer so your booking reconciles automatically. M-Pesa and
            card payment are also available.
          </p>
          <p className="numeric mt-4 border border-signal-300 bg-signal-50 px-4 py-3 text-sm font-bold text-signal-800">
            {quote.reference}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            This pro-forma is{' '}
            <strong className="text-ink-900">indicative</strong> and valid for{' '}
            {VALIDITY_DAYS} days. Final pricing, tax treatment and cohort
            scheduling are confirmed by our training team before an invoice is
            raised.
          </p>
          <div className="flex flex-wrap gap-3 print:hidden">
            <Button onClick={download}>
              <FiDownload
                className="size-3.5"
                data-icon="inline-start"
                aria-hidden="true"
              />
              Download
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <FiPrinter
                className="size-3.5"
                data-icon="inline-start"
                aria-hidden="true"
              />
              Print / save as PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-ink-900">{value}</dd>
    </div>
  )
}

function proformaHtml(
  quote: Quote,
  details: ProformaDetails,
  address: string,
): string {
  const rows = quote.lines
    .map(
      (line) => `<tr>
        <td>${escapeHtml(line.description)}</td>
        <td class="r">${line.quantity}</td>
        <td class="r">${formatAmount(line.unitPrice, quote.currency)}</td>
        <td class="r b">${formatAmount(line.amount, quote.currency)}</td>
      </tr>`,
    )
    .join('')

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${escapeHtml(quote.reference)} — Pro-forma invoice</title>
<style>
  :root { color-scheme: light }
  body { font: 14px/1.55 -apple-system, "Segoe UI", Inter, sans-serif; color: #07182f; margin: 0; padding: 40px; }
  .wrap { max-width: 780px; margin: 0 auto; border: 1px solid #e3e8ef; }
  .head { background: #040e1d; color: #fff; padding: 28px 32px; display: flex; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
  .head p { margin: 6px 0 0; font-size: 12px; color: #a5c1e2; }
  .brand { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
  .brand span { color: #f79229; }
  .ref { font-size: 17px; font-weight: 700; margin: 8px 0 0; }
  .parties { display: flex; gap: 32px; flex-wrap: wrap; padding: 28px 32px; border-bottom: 1px solid #e3e8ef; }
  .parties > div { flex: 1 1 240px; }
  .lbl { font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: #55657d; margin: 0 0 10px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #55657d; padding: 12px 32px; background: #f5f2ed; border-bottom: 1px solid #e3e8ef; }
  td { padding: 14px 32px; border-bottom: 1px solid #eef1f5; }
  .r { text-align: right; } .b { font-weight: 600; }
  tfoot td { border: 0; padding: 10px 32px; }
  tfoot .total td { background: #f5f2ed; font-weight: 700; font-size: 16px; padding: 16px 32px; }
  .settle { padding: 28px 32px; border-top: 1px solid #e3e8ef; }
  .code { display: inline-block; margin-top: 12px; border: 1px solid #fdba74; background: #fff7ed; color: #944914; font-weight: 700; padding: 10px 16px; }
  .note { font-size: 12px; color: #55657d; margin-top: 20px; }
</style></head>
<body><div class="wrap">
  <div class="head">
    <div>
      <div class="brand">Caliber<span>Code</span></div>
      <p>${escapeHtml(site.legalName)}<br>${escapeHtml(address)}<br>${escapeHtml(site.contact.email)}</p>
    </div>
    <div style="text-align:right">
      <div class="lbl" style="color:#f79229">Pro-forma invoice</div>
      <div class="ref">${escapeHtml(quote.reference)}</div>
      <p>Issued ${formatQuoteDate(quote.issuedOn)}<br>Valid until ${formatQuoteDate(quote.validUntil)}</p>
    </div>
  </div>
  <div class="parties">
    <div>
      <p class="lbl">Billed to</p>
      <strong>${escapeHtml(details.company)}</strong><br>
      ${escapeHtml(details.contactName)}<br>${escapeHtml(details.email)}<br>${escapeHtml(details.phone)}
    </div>
    <div>
      <p class="lbl">Delivery</p>
      Mode: ${escapeHtml(details.delivery)}<br>
      Location: ${escapeHtml(details.location || '—')}<br>
      Delegates: ${details.headcount}<br>
      Timeframe: ${escapeHtml(details.timeframe || 'To be agreed')}
    </div>
  </div>
  <table>
    <thead><tr><th>Module</th><th class="r">Delegates</th><th class="r">Unit</th><th class="r">Amount</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot>
      <tr><td colspan="3" class="r">Subtotal (${escapeHtml(quote.discountLabel)})</td><td class="r b">${formatAmount(quote.subtotal, quote.currency)}</td></tr>
      <tr><td colspan="3" class="r">VAT at ${Math.round(VAT_RATE * 100)}%</td><td class="r b">${formatAmount(quote.vat, quote.currency)}</td></tr>
      <tr class="total"><td colspan="3" class="r">Total due</td><td class="r">${formatAmount(quote.total, quote.currency)}</td></tr>
    </tfoot>
  </table>
  <div class="settle">
    <p class="lbl">Settlement</p>
    Payable by bank transfer, RTGS or EFT. Quote this reference on the transfer:
    <div class="code">${escapeHtml(quote.reference)}</div>
    <p class="note">This pro-forma is indicative and valid for ${VALIDITY_DAYS} days. Final pricing, tax treatment and cohort scheduling are confirmed by the CaliberCode training team before an invoice is raised.</p>
  </div>
</div></body></html>`
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!,
  )
}
