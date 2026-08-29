/**
 * Insights hub content (§4.7).
 *
 * Practitioner articles written under the Managing Director's byline, grounded
 * in Kenyan statute and KRA practice. They are articles, not whitepapers —
 * eight minutes, one argument each — so `pages` is gone along with the
 * whitepaper page counts it carried.
 *
 * IMPORTANT — rates and thresholds move with every Finance Act. Anything
 * numeric in `body` needs checking against the current Act before publication,
 * and the byline is a real person, so nothing here should go live without his
 * review. Where a figure was avoidable the article argues from process
 * instead, which is what dates well.
 *
 * `access` records how a resource is released. The proposal does not decide
 * whether gated releases exist (§18.2 item 6), so everything ships as `open`.
 */

import { photos } from '@/lib/images'
import type { Photo } from '@/lib/images'

export type InsightType =
  'Article' | 'Policy brief' | 'Whitepaper' | 'Commentary'
export type InsightAccess = 'open' | 'email-gated' | 'authenticated'

/** A run of body copy under one subheading. */
export type InsightSection = {
  heading: string
  paragraphs: Array<string>
}

export type Insight = {
  slug: string
  title: string
  type: InsightType
  summary: string
  /** ISO date. */
  publishedAt: string
  readingMinutes: number
  author: string
  authorRole: string
  photo: Photo
  topics: Array<string>
  access: InsightAccess
  featured?: boolean
  /** Opening paragraph, set above the body at a larger size. */
  standfirst: string
  /** What a reader should leave with, listed before the body. */
  keyPoints: Array<string>
  body: Array<InsightSection>
}

const AUTHOR = 'Mohamed Ahmed'
const AUTHOR_ROLE = 'Managing Director'

export const insights: Array<Insight> = [
  {
    slug: 'etims-sales-ledger-reconciliation',
    title: 'eTIMS: The Reconciliation, Not The Invoice',
    type: 'Article',
    summary:
      'Onboarding onto eTIMS is a morning of work. Keeping the sales ledger tied to it, month after month, is the part that fails at audit.',
    standfirst:
      'Most businesses that get an eTIMS finding did not fail to issue invoices. They failed to reconcile what they issued against what they booked — and the two drift apart quietly, in ordinary operating conditions, until an audit puts them side by side.',
    publishedAt: '2026-08-12',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.deskReview,
    topics: ['Taxation', 'eTIMS', 'Compliance'],
    access: 'open',
    featured: true,
    keyPoints: [
      'Onboarding is a one-off; reconciliation is a monthly control with an owner and a date',
      'Credit notes, manual invoices and cancelled sales are where the two records separate',
      'An expense without a compliant supplier invoice is a deduction you cannot claim',
    ],
    body: [
      {
        heading: 'The finding is almost never a missing invoice',
        paragraphs: [
          'When the Kenya Revenue Authority reviews a taxpayer on electronic invoicing, the finding that costs money is rarely "you did not issue an invoice". It is that the value transmitted through eTIMS for a period does not agree with the revenue recognised in the ledger for the same period, and the taxpayer cannot explain the difference line by line.',
          'That difference is not usually fraud. It accumulates from ordinary operating events: a sale invoiced and later cancelled, a credit note raised in the accounting system but never transmitted, a deposit recognised as revenue on a different date than it was invoiced, a branch issuing manual documents during a network outage and never catching up. Each is defensible on its own. Together, and undocumented, they read as unexplained variance.',
        ],
      },
      {
        heading: 'Treat it as a control, not a system',
        paragraphs: [
          'The mistake is to treat eTIMS as an IT integration that finishes when the invoices start flowing. It is a control, and controls have owners, frequencies and evidence.',
          'The reconciliation is simple to specify and unglamorous to run. Each month, extract the total value transmitted through eTIMS. Extract the revenue recognised in the general ledger for the same period. Explain the difference in a schedule with a named reason and a reference for every reconciling item. Sign it. File it with the VAT return working papers so the two are never separated.',
          'A business that can produce twelve of those schedules for a year under review is having a different conversation with a revenue officer than one that is reconstructing the position after the fact.',
        ],
      },
      {
        heading: 'The purchase side is the expensive half',
        paragraphs: [
          'Attention concentrates on the sales side because that is where the invoicing obligation sits. The exposure that actually removes money from the accounts is on the purchase side, because an expense that is not supported by a compliant supplier invoice is not deductible when the corporation tax computation is prepared.',
          'That has a practical consequence most finance teams underestimate: your tax position now depends on your suppliers’ compliance, not only your own. A supplier who is not onboarded, or who issues documents outside the system, does not just create an inconvenience — they hand you a disallowed expense.',
          'Vendor onboarding therefore has to carry the check. Confirm the supplier can issue a compliant invoice before the first purchase order, not after the first payment. Where a supplier cannot, that is a commercial decision with a quantifiable tax cost attached to it, and it should be taken by someone who knows the number.',
        ],
      },
      {
        heading: 'What good looks like',
        paragraphs: [
          'A business in reasonable shape can answer four questions without preparing anything: which entity and which branches are onboarded; who runs the monthly reconciliation and when; where the reconciliation schedules are filed; and how the purchase ledger confirms supplier compliance before payment.',
          'None of that requires new software. It requires the same discipline any other monthly control gets — and it is a great deal cheaper to install now than to reconstruct across three years under assessment.',
        ],
      },
    ],
  },
  {
    slug: 'payroll-levies-one-payslip',
    title: 'Four Deductions, One Payslip',
    type: 'Article',
    summary:
      'PAYE, NSSF, the health levy and the housing levy each have their own base, ceiling and portal. Reconciling them is now a monthly job in its own right.',
    standfirst:
      'Statutory payroll in Kenya is no longer one deduction with one filing. Employers that fell behind did not misread a rate — their payroll simply stopped reconciling to the portals, and nobody owned the difference.',
    publishedAt: '2026-07-29',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.collabDesk,
    topics: ['Payroll', 'Statutory Compliance', 'PAYE'],
    access: 'open',
    featured: true,
    keyPoints: [
      'Each levy has a different base — gross, pensionable, or capped — and they do not move together',
      'The reconciliation that matters is payroll to portal to bank, monthly, per levy',
      'Penalties compound on the employer, not the employee, and they run per month',
    ],
    body: [
      {
        heading: 'Four bases, not one',
        paragraphs: [
          'A payslip now carries PAYE, NSSF contributions under the tiered structure, the statutory health deduction administered by the Social Health Authority, and the affordable housing levy. Each is calculated on its own base. Some run on gross emoluments, some on pensionable pay, some are capped at an upper earnings limit that has been moving upward in phases.',
          'Because the bases differ, the deductions do not move together. A change in how a single allowance is classified — housing, transport, a bonus, a benefit in kind — can shift one levy and leave the others untouched. Payroll systems configured before the current structure existed frequently apply the wrong base to at least one of them, and the error is invisible on the payslip because every line still looks plausible.',
        ],
      },
      {
        heading: 'The reconciliation employers skip',
        paragraphs: [
          'Most employers reconcile payroll to the bank: the net pay leaving the account matches the payroll register. Far fewer reconcile payroll to the portals, levy by levy — that the amount computed in the payroll run equals the amount declared on the return and equals the amount actually remitted.',
          'Those three figures should be identical and often are not. A mid-month joiner processed after the return was filed, a leaver whose final dues were paid outside the payroll run, a correction posted to a prior period: each creates a difference between computed, declared and paid. Left unreconciled for a year, the aggregate is material and there is no contemporaneous record explaining any of it.',
          'The fix is a single monthly schedule per levy with three columns — computed, declared, paid — and a stated reason for every variance. It takes an hour a month and it is the document that ends an audit conversation early.',
        ],
      },
      {
        heading: 'Exposure sits with the employer',
        paragraphs: [
          'Statutory payroll deductions are employer obligations. Where a deduction is under-remitted, the employer carries the principal, the penalty and the interest — not the employee, and not the payroll bureau, whatever the service agreement says about accuracy.',
          'Penalties on payroll obligations generally run per month and per return. That structure matters: a small monthly under-declaration that nobody notices for two years does not produce one penalty, it produces twenty-four. The cost of the error is driven by how long it ran, not by how large it was in any single month, which is precisely why a monthly reconciliation is worth an hour.',
        ],
      },
      {
        heading: 'Where to start if you are behind',
        paragraphs: [
          'Start with a health check rather than a back-filing exercise. Establish, for each levy, which base your payroll is actually applying and whether it matches the current requirement. Then quantify the gap across the periods still open to assessment, as principal, penalty and interest separately, so leadership sees the real number and can decide.',
          'Only then decide the remediation sequence. Voluntary correction is almost always cheaper than an assessment, and it is a materially better conversation to have while you are the one raising it.',
        ],
      },
    ],
  },
  {
    slug: 'turnover-tax-gross-means-gross',
    title: 'Turnover Tax: Gross Means Gross',
    type: 'Article',
    summary:
      'A simplified regime with a hard edge — the tax is on turnover, not profit, so a thin-margin business can owe on a loss-making month.',
    standfirst:
      'Turnover Tax is presented as the simple option for small business, and administratively it is. What catches owners is the base: it is charged on gross receipts, with no deduction for the cost of earning them.',
    publishedAt: '2026-07-15',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.tabletGlass,
    topics: ['Taxation', 'SMEs', 'Turnover Tax'],
    access: 'open',
    keyPoints: [
      'The charge is on gross monthly receipts, with no expense deduction',
      'A high-volume, thin-margin trader can pay more under TOT than under corporation tax',
      'Cross the upper threshold and the regime changes mid-year — plan for it before it happens',
    ],
    body: [
      {
        heading: 'The arithmetic owners miss',
        paragraphs: [
          'Turnover Tax applies to resident businesses whose annual turnover falls within a defined band, and it is charged as a percentage of gross monthly receipts. There is no deduction for purchases, rent, salaries or any other cost of earning that revenue.',
          'For a business with healthy margins, the regime is generous and the administration is light. For a high-volume, low-margin trader — a distributor moving goods at a few points of markup, say — the charge on gross can exceed what the same business would pay on its profit under the ordinary corporation tax rules. It is entirely possible to owe Turnover Tax in a month in which the business lost money.',
          'That is not a defect in the design; it is the trade-off the design makes. Simplicity is bought with a base that ignores costs. The error is not choosing the regime, it is choosing it without running the comparison.',
        ],
      },
      {
        heading: 'Run the comparison before, not after',
        paragraphs: [
          'The comparison is a single spreadsheet. Take twelve months of actual gross receipts and actual net profit. Compute the liability under Turnover Tax on gross, and under the ordinary regime on profit. Compare the totals, and then stress the answer against a bad year — a margin squeeze, a slow quarter — because the regimes diverge most sharply when margins compress.',
          'Do this before electing, and revisit it annually. A business whose margin structure has changed may be sitting in the wrong regime and paying for the privilege.',
        ],
      },
      {
        heading: 'The threshold is a cliff, not a slope',
        paragraphs: [
          'Growth through the upper threshold changes the obligation set mid-year, and it does not change gently. The business moves to the ordinary regime, and depending on its activity may also cross into VAT registration at a different threshold on a different basis.',
          'That is a systems and pricing problem before it is a tax problem. VAT registration changes invoicing, the sales ledger, the treatment of input tax on purchases, and — if the business has been quoting inclusive prices to consumers — its effective margin on every existing contract.',
          'A business approaching either threshold should be modelling the crossing at least two quarters ahead. The businesses that struggle are the ones that discover the change in the month it happens and spend the following year filing corrections.',
        ],
      },
      {
        heading: 'Keep the records the regime does not ask for',
        paragraphs: [
          'Because Turnover Tax is computed on gross receipts, the filing itself demands very little: a monthly figure. That is exactly why record-keeping decays under it.',
          'Keep the full purchase and expense records anyway. You need them the moment you leave the regime, whether by growth or by election; you need them if the gross figure is ever questioned; and you need them to run the comparison above. A business that has kept only its sales totals for three years has no way to demonstrate it was in the right regime, and no basis to argue it should have been in the other one.',
        ],
      },
    ],
  },
  {
    slug: 'objecting-to-a-kra-assessment',
    title: 'The Clock On A KRA Assessment',
    type: 'Article',
    summary:
      'An objection is a document with a deadline and a required form. Miss either and the merits of your position stop mattering.',
    standfirst:
      'Most tax disputes are not lost on the technical argument. They are lost on procedure — a deadline that ran, an objection that was not validly lodged, or a position asserted without the documents that would have proved it.',
    publishedAt: '2026-06-24',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.strategyTable,
    topics: ['Taxation', 'Tax Disputes', 'Compliance'],
    access: 'open',
    featured: true,
    keyPoints: [
      'The objection window runs from the date of the assessment, and it is short',
      'A valid objection states the grounds and the amendments sought — not merely that you disagree',
      'Evidence assembled after the objection is filed is worth far less than evidence filed with it',
    ],
    body: [
      {
        heading: 'The window is procedural, and it is unforgiving',
        paragraphs: [
          'Under the Tax Procedures Act, a taxpayer who disputes an assessment must lodge a notice of objection within a set period running from the date of the assessment. The period is short, it runs on calendar days, and it starts whether or not the assessment reached the person who needed to see it.',
          'That last point is where the damage usually happens. Assessments arrive in the iTax mailbox of whoever registered the PIN — often a former accountant, a departed finance manager, or an address nobody monitors. The clock runs regardless. By the time the assessment surfaces internally, the window may already have closed, and a taxpayer with a strong technical position is arguing for an extension instead of arguing the merits.',
          'The control is trivial and almost nobody has it: a named person who checks the taxpayer mailbox weekly and logs what arrived. Not monthly, and not the external accountant alone.',
        ],
      },
      {
        heading: 'What makes an objection valid',
        paragraphs: [
          'An objection is not a letter expressing disagreement. To be valid it must state the grounds of objection, state the amendments required to the assessment, and give the reasons for them. An objection that fails those requirements can be treated as not validly lodged — which, once the window has closed, is the same outcome as not objecting.',
          'Two disciplines follow. First, be specific: identify the assessment, the period, the line item and the figure you say is wrong, and state the figure you say is right. Second, object on every ground you may need. Grounds not raised are difficult to introduce later, and the objection defines the shape of everything that follows it.',
        ],
      },
      {
        heading: 'Evidence has a shelf life',
        paragraphs: [
          'The Act places the burden on the taxpayer to show the assessment is excessive. That burden is discharged with documents, and documents are far more persuasive when they were assembled before the dispute than when they were produced during it.',
          'Contemporaneous records — the reconciliation prepared at the time, the board minute recording the decision, the contract as executed — carry weight precisely because they were not created for the argument. A schedule prepared two years later to explain a position may be entirely accurate and still land badly, because it demonstrates that no such analysis existed when the return was filed.',
          'This is the practical case for the monthly controls that feel like overhead. They are also the evidence file for a dispute you do not yet know you have.',
        ],
      },
      {
        heading: 'Know the route before you need it',
        paragraphs: [
          'The Commissioner has a defined period to make an objection decision, and where that period passes without one, the objection may be treated as allowed. From the objection decision, the route runs to the Tax Appeals Tribunal within a further short window, and onward from there.',
          'Each stage has its own deadline, and each is capable of ending the matter on procedure alone. Before responding to any assessment, put the full sequence of dates on one page and give it an owner. Alternative dispute resolution is available and frequently the sensible route, but entering it does not suspend a deadline you have not diarised.',
        ],
      },
    ],
  },
  {
    slug: 'monthly-rental-income-landlords',
    title: 'What The Rental Income Return Does Not Ask For',
    type: 'Article',
    summary:
      'A simplified landlord regime with a narrow definition of gross rent — and an agent in the middle who is often deducting on a different basis than the landlord is declaring.',
    standfirst:
      'The monthly rental income return asks for one figure. That simplicity hides three questions landlords routinely get wrong: what counts as rent, who is obliged to withhold, and what happens to the deposit.',
    publishedAt: '2026-06-10',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.nairobiCBD,
    topics: ['Taxation', 'Rental Income', 'Property'],
    access: 'open',
    keyPoints: [
      'The charge is on gross rent received, not on rent invoiced or net of expenses',
      'Where an agent collects, the landlord still owns the declaration',
      'Deposits and service charges need to be separated in the ledger, not at filing',
    ],
    body: [
      {
        heading: 'Received, not receivable',
        paragraphs: [
          'The residential rental income regime charges gross rent received in the month. That is a cash basis, and it differs from how most landlords— and almost all property managers — keep their books, which is on an accruals basis showing rent invoiced.',
          'The gap between the two is arrears. A landlord who declares invoiced rent overpays in a month when tenants are late and creates a reconciling item that nobody tracks. A landlord who declares collections but keeps records on invoices cannot demonstrate the basis of the figure they filed.',
          'Keep a monthly collections schedule that ties to the bank account, separately from the rent roll. The return is prepared from the collections schedule; the rent roll answers a different question.',
        ],
      },
      {
        heading: 'Deposits and service charges',
        paragraphs: [
          'A security deposit held against damage is not rent. It is a liability, and it belongs on the balance sheet until it is either refunded or applied. When it is applied against unpaid rent, it becomes rent in that month, and it should be declared then.',
          'Service charge is the harder one, and the treatment follows the substance of the arrangement. Where the landlord collects a service charge and bears the cost of the services, the character of that receipt needs to be established deliberately, not assumed. Where a separate management company collects it under its own contract, that is a different taxpayer with its own obligations.',
          'The practical control is in the ledger, not at filing. Three accounts — rent, deposits held, service charge — and a rule that nothing moves between them without a documented reason. Landlords who run a single receipts account spend every filing month reconstructing the split from bank narrations.',
        ],
      },
      {
        heading: 'The agent in the middle',
        paragraphs: [
          'Where a managing agent collects rent, the landlord frequently assumes the agent has handled the tax. Sometimes an amount has indeed been withheld and remitted; sometimes what the agent deducted and what the landlord should declare are computed on different bases.',
          'Whatever the agent does, the declaration obligation and the exposure remain with the landlord. Reconcile the agent’s remittance statement to your own collections schedule monthly, and hold the certificates for whatever was withheld. An agent statement is not a substitute for your own record; it is a document to be reconciled against it.',
        ],
      },
      {
        heading: 'When the regime stops fitting',
        paragraphs: [
          'The simplified regime applies within a defined band of annual rental income. Landlords grow past it — by acquiring, by rent review, or by inheriting a property mid-year — and the change is easy to miss because no single month looks different.',
          'Two habits prevent it. Track annualised rental income monthly against the threshold rather than checking once a year. And where the portfolio is held across several entities or family members, look at the position for each taxpayer separately, because the threshold applies to the person, not the building.',
        ],
      },
    ],
  },
  {
    slug: 'data-protection-registration-is-the-easy-part',
    title: 'Registration Is The Easy Part',
    type: 'Article',
    summary:
      'Registering with the Data Commissioner takes an afternoon. Being able to answer what you hold, why, and for how long takes considerably longer.',
    standfirst:
      'Organisations treat the Data Protection Act as a registration exercise because registration is the only part with a form attached. The obligations that generate enforcement risk have no form at all.',
    publishedAt: '2026-05-27',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.dataCentre,
    topics: ['Data Protection', 'Privacy', 'Compliance'],
    access: 'open',
    keyPoints: [
      'A record of processing is the document every other obligation depends on',
      'Lawful basis is chosen per purpose, and consent is usually the weakest option available',
      'Breach response is a clock — decide the escalation route before you need it',
    ],
    body: [
      {
        heading: 'Start with what you actually hold',
        paragraphs: [
          'The Data Protection Act obliges a controller to process personal data lawfully, for a stated purpose, and no longer than necessary. Every one of those tests is applied per category of data and per purpose — which means you cannot answer any of them until you know what you hold and why.',
          'That document is the record of processing, and it is unglamorous: a table listing each category of personal data, the purpose it is processed for, the lawful basis relied on, who it is shared with, where it is stored, and how long it is kept. Most organisations discover, in building it, that they hold considerably more than they thought — CCTV footage, recruitment files for candidates never hired, WhatsApp groups containing customer details, spreadsheets on personal laptops.',
          'Until that table exists, a privacy policy is a statement of intent about data nobody has inventoried.',
        ],
      },
      {
        heading: 'Consent is the weakest basis, not the default',
        paragraphs: [
          'Organisations reach for consent because it feels safest. It is usually the least robust option available, because consent must be freely given and capable of being withdrawn — and when it is withdrawn, the processing must stop.',
          'For most ordinary business processing there is a better basis. Payroll and statutory deductions are processed to comply with a legal obligation. Fulfilling a customer order is performance of a contract. Fraud monitoring on your own systems is generally a legitimate interest, provided it is documented and proportionate.',
          'Pick the basis per purpose, write down why, and stop asking for consent you do not need — an employee cannot meaningfully refuse their employer, and a consent that could not have been refused will not carry weight.',
        ],
      },
      {
        heading: 'Retention is where most organisations fail',
        paragraphs: [
          'Kenyan businesses keep everything, indefinitely, because storage is cheap and deleting feels risky. Under the Act, holding personal data beyond the period necessary for its purpose is itself a breach — and it enlarges every other exposure you have, because a breach reaches whatever you were still holding.',
          'Retention periods are not arbitrary. They fall out of other law: tax records have a statutory retention period, employment records have their own, and company records have theirs. Set the period from the longest applicable obligation, write it into the record of processing, and then actually run the deletion.',
          'The last step is the one that does not happen. A retention schedule nobody executes is evidence that you identified the obligation and did not meet it, which is a worse position than not having written it down.',
        ],
      },
      {
        heading: 'Breach response is a clock',
        paragraphs: [
          'The Act requires notification of the Data Commissioner where a breach presents a real risk of harm to the data subject, within a short window, and communication to affected data subjects in defined circumstances.',
          'A short window is not enough time to decide who decides. Settle it in advance: who is told first, who assesses the risk of harm, who authorises notification, who drafts the communication, and who talks to affected people. Put it on one page and rehearse it once.',
          'Most breaches are not sophisticated attacks. They are a laptop left in a matatu, a payroll file emailed to the wrong distribution list, a departing employee with a copy of the customer database. Each of those is survivable with a plan and expensive without one.',
        ],
      },
    ],
  },
  {
    slug: 'beneficial-ownership-register',
    title: 'The Register Behind The Register',
    type: 'Article',
    summary:
      'Beneficial ownership filing is not a company secretarial formality. It asks who ultimately controls the company, and nominee structures answer it badly.',
    standfirst:
      'A company can have a perfectly accurate register of members and still be non-compliant, because the law is no longer asking whose name is on the share certificate. It is asking who is actually behind it.',
    publishedAt: '2026-05-13',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.boardroomWide,
    topics: ['Governance', 'Companies Act', 'Compliance'],
    access: 'open',
    keyPoints: [
      'Beneficial ownership follows control, not only shareholding',
      'Corporate shareholders have to be traced through to a natural person',
      'The register is a maintenance obligation — changes trigger a filing, not the annual return',
    ],
    body: [
      {
        heading: 'Control, not just shares',
        paragraphs: [
          'A beneficial owner is the natural person who ultimately owns or controls the company. Shareholding is the most common route to that conclusion but it is not the only one. Control exercised through voting rights, through the right to appoint or remove directors, or through significant influence by other means brings a person into scope even where their name appears nowhere in the register of members.',
          'This is where structures that were built for other reasons cause difficulty. A holding company owned by a trust; shares held by a nominee for a beneficial owner; a shareholders’ agreement giving a minority holder a veto over key decisions. Each is lawful, and each requires the filing to look through the structure rather than record its surface.',
        ],
      },
      {
        heading: 'Trace to a natural person',
        paragraphs: [
          'Where a shareholder is itself a company, the obligation is to trace onward until a natural person is identified. A register recording "held by X Holdings Limited" has not discharged the requirement; it has restated the register of members.',
          'For groups with layers across jurisdictions this is real work, and it is work with a deadline attached. Start it before it is needed, because obtaining identification documents and confirmations from an overseas intermediate holder is not a same-week exercise.',
          'Where the company genuinely cannot identify a beneficial owner after reasonable steps, that conclusion needs to be documented with the steps taken. An unexplained gap and a documented dead end are treated very differently.',
        ],
      },
      {
        heading: 'It is a maintenance obligation',
        paragraphs: [
          'The most common failure is not the first filing. It is the second. A company files once, correctly, and then treats the matter as closed — while ownership changes through a share transfer, a new investor, a death, or a restructuring, and nothing is filed.',
          'Changes to beneficial ownership carry their own filing timeline, separate from the annual return. Tie the obligation to the events that trigger it: any share transfer, any change in directors with control rights, any change in the shareholders’ agreement. Put it in the company secretarial checklist alongside the transfer itself so that the two move together.',
        ],
      },
      {
        heading: 'Why it now matters commercially',
        paragraphs: [
          'Beneficial ownership information is increasingly what counterparties ask for rather than what regulators alone require. Banks request it at onboarding and refresh it periodically. Procuring entities ask for it in tender documentation. Institutional investors and lenders ask for it in diligence.',
          'A company that cannot produce a current, coherent beneficial ownership position is not merely exposed to a penalty. It is slower to bank, slower to raise, and occasionally excluded from a bid on a documentation point that had nothing to do with its capability.',
        ],
      },
    ],
  },
  {
    slug: 'aml-cft-reached-the-professions',
    title: 'AML/CFT Reached The Professions',
    type: 'Article',
    summary:
      'Advocates, accountants, company service providers and property agents now carry obligations built for banks — with none of the infrastructure.',
    standfirst:
      'The extension of anti-money laundering obligations beyond financial institutions caught a large group of firms unprepared, and the gap is not knowledge. It is that a professional practice has no compliance function to put the programme into.',
    publishedAt: '2026-04-29',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.twoAdvisors,
    topics: ['AML/CFT', 'Financial Crime', 'Professional Services'],
    access: 'open',
    featured: true,
    keyPoints: [
      'A risk assessment comes first — the programme is built to fit it, not copied from a bank',
      'Customer due diligence is risk-based, and "we have known them for years" is not a control',
      'Reporting obligations are personal, and tipping off is a separate offence',
    ],
    body: [
      {
        heading: 'The programme starts with a risk assessment',
        paragraphs: [
          'The obligation is not to adopt a policy. It is to understand the money laundering and terrorist financing risk your practice is exposed to, and to build controls proportionate to it. That means a documented, enterprise-wide risk assessment covering your clients, your services, your delivery channels and the jurisdictions you touch.',
          'It matters that this comes first, because it determines everything after it. A firm doing residential conveyancing for local clients has a different risk profile from one forming companies for non-resident beneficial owners, and they should not end up with the same procedures. A policy downloaded from a bank and re-badged fails on exactly this point: it describes controls for risks the practice does not run, and misses the ones it does.',
        ],
      },
      {
        heading:
          'Due diligence is risk-based, and familiarity is not diligence',
        paragraphs: [
          'Customer due diligence requires identifying the client, verifying that identity from reliable sources, identifying the beneficial owner where the client is not a natural person, and understanding the purpose of the relationship. Enhanced measures apply where risk is higher — politically exposed persons, unusual structures, higher-risk jurisdictions.',
          'The hardest adjustment for professional firms is cultural rather than technical. Long relationships feel like assurance. In practice, a client of fifteen years whose file was opened before any of this applied is frequently the file with no identification documents at all, and long-standing relationships are precisely how a professional practice gets used.',
          'Remediation of legacy files is unglamorous and it is where most of the work sits. Prioritise by risk rather than alphabetically: highest-risk clients and highest-value matters first.',
        ],
      },
      {
        heading: 'Reporting is personal, and tipping off is separate',
        paragraphs: [
          'Where a suspicion arises, the obligation to report runs to the reporting officer and onward to the Financial Reporting Centre. The threshold is suspicion, not proof — a firm is not required to investigate to a conclusion before reporting, and waiting for certainty is itself a failure.',
          'Disclosing to the client that a report has been made, or is contemplated, is a separate offence. That has a practical implication professionals find uncomfortable: you may not be able to explain to a client why a matter has slowed. Decide in advance how the firm handles that conversation, because improvising it is how tipping off happens.',
          'Appoint a reporting officer with the seniority to stop a transaction, and make sure they are not the person whose fee depends on it completing.',
        ],
      },
      {
        heading: 'Proportionate, but real',
        paragraphs: [
          'None of this requires a bank-scale compliance department. For a small practice it is a documented risk assessment, a client onboarding checklist that actually gets completed, a named reporting officer, a training record, and an annual review with a date on it.',
          'What it does require is evidence. A supervisor assessing a practice will ask to see files, not policies. Five properly documented onboarding files demonstrate more than a fifty-page manual that nobody has applied.',
        ],
      },
    ],
  },
  {
    slug: 'digital-assets-board-oversight',
    title: 'Digital Assets Reach The Board Before The Balance Sheet',
    type: 'Commentary',
    summary:
      'Most Kenyan boards will meet virtual assets through a counterparty, an employee or a payment channel long before they hold any.',
    standfirst:
      'Directors tend to treat digital assets as a question about whether to invest. The exposure that arrives first is indirect, unbudgeted, and already inside the business.',
    publishedAt: '2026-04-15',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.nightWork,
    topics: ['Digital Assets', 'Governance', 'Risk'],
    access: 'open',
    keyPoints: [
      'Indirect exposure — customers, suppliers, staff — arrives before any treasury decision',
      'Custody risk has no chargeback and no reversal; key control is the whole control',
      'Tax and reporting obligations attach to transactions, not to intentions',
    ],
    body: [
      {
        heading: 'The exposure is already indirect',
        paragraphs: [
          'A board that has never discussed digital assets may already be exposed to them. A customer settling an invoice through a third party that converts from crypto. A supplier requesting payment to an offshore processor. An employee running a side operation using company infrastructure. A subsidiary in another market accepting a payment channel that head office has not reviewed.',
          'None of those begins as a treasury decision, which is exactly why none of them reaches the board. They arrive through operations, and they are typically discovered during a reconciliation or an incident rather than through a policy discussion.',
          'The first governance action is not an investment policy. It is a factual question to management: where, if anywhere, does this organisation already touch virtual assets — in receipts, in payments, in payroll, in any subsidiary?',
        ],
      },
      {
        heading: 'Custody is not like cash',
        paragraphs: [
          'Where an organisation does hold digital assets, the control that matters is key management, and it does not resemble any control the finance function already runs. There is no bank to call, no chargeback, no reversal, and no counterparty who can restore a balance. Whoever controls the key controls the asset, completely and finally.',
          'That collapses segregation of duties into a single technical control. The questions a board should be able to get answered are basic and specific: who holds the keys, what happens if that person is unavailable, is there a multi-signature arrangement, where are backups held, and who has ever tested a recovery.',
          'If any answer is "one person knows", the organisation has an unhedged key-person risk sitting on a liquid asset.',
        ],
      },
      {
        heading: 'Obligations attach to transactions',
        paragraphs: [
          'Tax and reporting obligations follow transactions, not intentions. Kenya has legislated in this area and the regime continues to develop; the durable point is that a transaction creates a record-keeping obligation on the day it happens, and reconstructing a history of transfers after the fact is materially harder than recording them as they occur.',
          'Keep the transaction log from the first transaction: date, counterparty, value in shillings at the time, purpose, and the wallet or platform involved. Whatever the specific treatment turns out to be for a given period, no version of it is satisfied by an exchange export retrieved two years later — assuming the exchange is still operating.',
        ],
      },
      {
        heading: 'What to put on the agenda',
        paragraphs: [
          'Three items, once, and then annually. A factual map of existing exposure across the group. A decision on appetite — including a considered decision to have none, which is a legitimate position but should be recorded as a decision rather than left as a silence. And an owner in management with the standing to enforce whatever the board decides.',
          'Boards that treat this as a technology topic delegate it to people without the authority to say no. It is a risk appetite topic, and it belongs where risk appetite is set.',
        ],
      },
    ],
  },
  {
    slug: 'procurement-fraud-control-points',
    title: 'Where Procurement Fraud Actually Starts',
    type: 'Article',
    summary:
      'The schemes that drain procurement budgets are not sophisticated. They exploit five control points, and each is testable on full population data.',
    standfirst:
      'Procurement fraud is rarely clever. It is patient, and it lives in the places where a control was designed for efficiency rather than for integrity — which makes most of it detectable from data the organisation already holds.',
    publishedAt: '2026-04-01',
    readingMinutes: 3,
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    photo: photos.workshopRoom,
    topics: ['Fraud', 'Procurement', 'Internal Audit'],
    access: 'open',
    keyPoints: [
      'The vendor master is the highest-value target and the least monitored file',
      'Threshold analysis finds split awards faster than any tip-off',
      'Test on full population — sampling is designed to miss exactly this',
    ],
    body: [
      {
        heading: 'The vendor master',
        paragraphs: [
          'Every payment fraud needs a payee, and the vendor master is where payees are created. It is typically maintained by whoever has time, changed without independent approval, and never reviewed as a whole.',
          'Four tests find most of what is there, and all four run on data the organisation already holds. Match vendor bank accounts against payroll bank accounts — an exact match is an employee-owned vendor. Look for duplicate vendors under slightly different names, which is how a single supplier evades a spend threshold. Look for vendors created and paid within a short window, and never used again. And look for vendors with no physical address, or an address shared with another vendor.',
          'The preventive control is simpler than the detective one: creating or amending a vendor should require approval by someone who cannot also raise a payment to it.',
        ],
      },
      {
        heading: 'Thresholds and split awards',
        paragraphs: [
          'Every procurement framework sets thresholds above which competition, committee approval or a different process applies. Each threshold creates an incentive to stay beneath it.',
          'Split awards are the result: one requirement divided into several purchases each falling just under the limit. They are visible in the data as clusters of awards immediately below a threshold, repeat awards to the same supplier within a short period, and requirements delivered together that were procured separately.',
          'Plot award values as a distribution. Legitimate procurement produces a broad spread. A pronounced spike just under a threshold is not a coincidence, and it is one chart.',
        ],
      },
      {
        heading: 'Specification and evaluation',
        paragraphs: [
          'The earliest point at which a tender can be directed is the specification, long before any bid is opened. Requirements written around one supplier’s product, unnecessarily narrow technical criteria, or timelines only an incumbent could meet all decide the outcome before competition begins.',
          'At evaluation, the indicators are procedural: scoring criteria that changed after bids were received, subjective criteria carrying disproportionate weight, evaluation committee membership that does not rotate, and awards that consistently diverge from the technical ranking.',
          'Both are reviewable after the fact from documents that must exist anyway. If they do not exist, that is itself the finding.',
        ],
      },
      {
        heading: 'Delivery, and testing the whole population',
        paragraphs: [
          'The last control point is whether what was procured actually arrived. Goods received notes signed by the same person who raised the requisition, deliveries acknowledged on the day of invoice, and contract variations that quietly restore a price competed down at tender are the recurring patterns.',
          'Test all of it on full population rather than by sample. Sampling was designed to give assurance over a population assumed to be homogeneous; fraud is deliberately the exception, and a sample is precisely the tool least likely to contain it. Every test above runs on data the finance system already produces, and once written they can be re-run monthly at almost no cost.',
          'Detection matters, but it is second. The reason to run these tests continuously is that people who know the tests run behave differently.',
        ],
      },
    ],
  },
]

export const insightBySlug = (slug: string): Insight | undefined =>
  insights.find((i) => i.slug === slug)

export const featuredInsights = insights.filter((i) => i.featured)

export const insightTypes: Array<InsightType> = [
  'Article',
  'Policy brief',
  'Whitepaper',
  'Commentary',
]

export function formatInsightDate(iso: string): string {
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Nairobi',
  }).format(new Date(iso))
}
