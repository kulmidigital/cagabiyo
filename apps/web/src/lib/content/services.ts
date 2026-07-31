/**
 * The eight consulting practice areas (§4.4).
 *
 * Each entry carries a stated methodology (SERV-02), the regional search intent
 * it targets (SERV-05) and the training focus areas it maps onto so service
 * pages can cross-link into the catalog (SERV-06).
 */

import { photos } from '@/lib/images'
import type { Photo } from '@/lib/images'

export type MethodologyStep = {
  title: string
  body: string
}

export type Service = {
  slug: string
  name: string
  /** Short label for dense navigation and cards. */
  shortName: string
  discipline: 'Assurance & risk' | 'Finance & strategy'
  summary: string
  intro: string
  photo: Photo
  /** SERV-02 — the stated approach for this practice. */
  methodology: Array<MethodologyStep>
  capabilities: Array<string>
  outcomes: Array<string>
  /** Typical engagement shapes, used to set buyer expectations. */
  engagements: Array<string>
  /** Indices into the training taxonomy (§8). */
  relatedTaxonomy: Array<number>
  seo: {
    title: string
    description: string
    /** SERV-05 — regional intent, e.g. "Tax Advisory Kenya". */
    keywords: Array<string>
  }
}

export const services: Array<Service> = [
  {
    slug: 'tax-advisory',
    name: 'Tax Advisory',
    shortName: 'Tax',
    discipline: 'Finance & strategy',
    summary:
      'Corporate tax strategy, transfer pricing and dispute management across the East African Community.',
    intro:
      'We advise groups operating across Kenya, Uganda, Tanzania, Rwanda and Ethiopia on structuring, pricing intra-group transactions, and defending positions under review by a revenue authority.',
    photo: photos.deskReview,
    methodology: [
      {
        title: 'Position review',
        body: 'We reconstruct the filed position from source records rather than the return, and identify where the technical basis is weak.',
      },
      {
        title: 'Exposure quantification',
        body: 'Each finding is quantified as principal, interest and penalty, so the board has a figure to decide against.',
      },
      {
        title: 'Structuring & documentation',
        body: "Arrangements are restructured where that is worthwhile, and the arm's-length basis is documented to the standard the authority applies.",
      },
      {
        title: 'Defence & resolution',
        body: 'We carry the position through objection, ADR and appeal, and hand over a complete file.',
      },
    ],
    capabilities: [
      'East African corporate tax planning',
      'Transfer pricing policy and local-file documentation',
      'VAT administration and refund recovery',
      'Tax dispute management, objections and ADR',
      'Withholding tax and cross-border payments',
      'Tax health checks and pre-audit readiness',
    ],
    outcomes: [
      'A defensible, documented position for every material transaction',
      'Quantified exposure the board can plan against',
      'Reduced assessment risk at audit',
    ],
    engagements: [
      'Group tax health check',
      'Transfer pricing documentation cycle',
      'Dispute and objection support',
      'Board-level tax strategy review',
    ],
    relatedTaxonomy: [3, 1, 2],
    seo: {
      title: 'Tax Advisory Kenya & East Africa',
      description:
        'Corporate tax strategy, transfer pricing, VAT administration and tax dispute management for groups operating across Kenya and East Africa.',
      keywords: [
        'Tax Advisory Kenya',
        'transfer pricing East Africa',
        'tax dispute resolution Kenya',
        'VAT consultants Nairobi',
      ],
    },
  },
  {
    slug: 'internal-audit-risk',
    name: 'Internal Audit & Risk',
    shortName: 'Internal Audit',
    discipline: 'Assurance & risk',
    summary:
      'Risk-based internal audit, forensic investigation and fraud analytics for boards and audit committees.',
    intro:
      'We build and run risk-based internal audit programmes, and conduct forensic investigations where something has already gone wrong.',
    photo: photos.strategyTable,
    methodology: [
      {
        title: 'Risk universe',
        body: "We map the entity's risk universe process by process, and rank it by exposure.",
      },
      {
        title: 'Plan & calibrate',
        body: 'The annual plan is built from that ranking and agreed with the audit committee, with coverage gaps stated explicitly.',
      },
      {
        title: 'Fieldwork & analytics',
        body: 'Full-population testing where the data allows it, sampling where it does not. Findings are evidenced to source.',
      },
      {
        title: 'Report & follow-through',
        body: 'Each finding carries an owner, a date and a verification step. Closure is re-tested rather than asserted.',
      },
    ],
    capabilities: [
      'Risk-based internal audit planning and execution',
      'Internal audit function set-up and quality assessment',
      'Forensic accounting and investigation',
      'Fraud prevention and detection analytics',
      'Continuous control monitoring',
      'Audit committee reporting and training',
    ],
    outcomes: [
      'Audit coverage aligned to actual exposure',
      'Findings that close instead of recurring',
      'An audit committee briefed to challenge management',
    ],
    engagements: [
      'Outsourced or co-sourced internal audit',
      'Forensic investigation',
      'External quality assessment (EQA)',
      'Fraud risk assessment',
    ],
    relatedTaxonomy: [4, 5, 2],
    seo: {
      title: 'Internal Audit & Risk Services Kenya',
      description:
        'Risk-based internal audit, forensic accounting and fraud analytics for boards and audit committees across East Africa.',
      keywords: [
        'internal audit Kenya',
        'forensic accounting Nairobi',
        'risk based internal auditing East Africa',
        'fraud investigation Kenya',
      ],
    },
  },
  {
    slug: 'governance-risk-compliance',
    name: 'Governance, Risk & Compliance',
    shortName: 'GRC',
    discipline: 'Assurance & risk',
    summary:
      'Board effectiveness, enterprise risk frameworks, ESG reporting and regulatory compliance programmes.',
    intro:
      'We assess the gap between what a charter sets out and what the board does in practice, then build the frameworks, calendars and reporting that close it.',
    photo: photos.boardroomWide,
    methodology: [
      {
        title: 'Diagnostic',
        body: 'Board papers, minutes, charters and committee composition are reviewed against the applicable code and observed practice.',
      },
      {
        title: 'Framework design',
        body: 'Risk appetite, escalation thresholds and committee mandates are written to be usable at board level.',
      },
      {
        title: 'Embedding',
        body: 'We run the first cycles alongside the client: risk register, compliance calendar and board pack template.',
      },
      {
        title: 'Assurance',
        body: 'Independent review after two cycles, testing whether the framework is being applied.',
      },
    ],
    capabilities: [
      'Board effectiveness and governance reviews',
      'Enterprise risk management frameworks',
      'Corporate governance code compliance',
      'ESG and sustainability reporting readiness',
      'Regulatory compliance programmes',
      'Board and committee charters',
    ],
    outcomes: [
      'Board papers that support decisions',
      'A risk register maintained by management',
      'Demonstrable compliance at the next regulatory review',
    ],
    engagements: [
      'Board effectiveness evaluation',
      'ERM framework build',
      'ESG reporting readiness',
      'Governance code gap assessment',
    ],
    relatedTaxonomy: [6, 5, 11],
    seo: {
      title: 'Governance, Risk & Compliance Advisory East Africa',
      description:
        'Board effectiveness reviews, enterprise risk management frameworks, ESG reporting and regulatory compliance programmes across East Africa.',
      keywords: [
        'corporate governance Kenya',
        'enterprise risk management East Africa',
        'ESG reporting Kenya',
        'board effectiveness review Nairobi',
      ],
    },
  },
  {
    slug: 'information-systems-audit',
    name: 'Information Systems Audit',
    shortName: 'IS Audit',
    discipline: 'Assurance & risk',
    summary:
      'IT general controls, COBIT-aligned assurance and ISO 27001 information security auditing.',
    intro:
      'We audit the systems that carry financial controls: access, change, operations and the interfaces between them, reported in terms an audit committee can act on.',
    photo: photos.dataCentre,
    methodology: [
      {
        title: 'Scope to the ledger',
        body: 'Scoping starts from the financially significant applications and works outward.',
      },
      {
        title: 'Control testing',
        body: 'ITGC testing across access, change management, operations and backup — evidenced from the systems themselves.',
      },
      {
        title: 'Framework mapping',
        body: 'Findings are mapped to COBIT and, where relevant, to ISO 27001 Annex A, so remediation feeds certification rather than duplicating it.',
      },
      {
        title: 'Remediation support',
        body: 'We stay through remediation and re-test the controls afterwards.',
      },
    ],
    capabilities: [
      'IT general controls (ITGC) audit',
      'COBIT-aligned IT governance assurance',
      'ISO 27001 ISMS audit and readiness',
      'Application and interface controls review',
      'Cybersecurity control assessment',
      'Data privacy controls under the Data Protection Act 2019',
    ],
    outcomes: [
      'Assurance that system controls support the financial statements',
      'A remediation path that feeds certification',
      'Reduced audit findings at the statutory audit',
    ],
    engagements: [
      'Annual ITGC audit',
      'ISO 27001 readiness assessment',
      'Pre-implementation system review',
      'Data protection controls audit',
    ],
    relatedTaxonomy: [7, 8, 6],
    seo: {
      title: 'IS Audit Training & Advisory East Africa',
      description:
        'Information systems audit, IT general controls, COBIT assurance and ISO 27001 auditing for institutions across East Africa.',
      keywords: [
        'IS Audit Training East Africa',
        'IT audit Kenya',
        'ISO 27001 audit Nairobi',
        'COBIT assurance East Africa',
      ],
    },
  },
  {
    slug: 'cryptocurrency-compliance',
    name: 'Cryptocurrency Compliance',
    shortName: 'Crypto Compliance',
    discipline: 'Assurance & risk',
    summary:
      'AML/CFT programmes, travel-rule readiness and risk management for virtual asset service providers.',
    intro:
      'We build AML/CFT programmes for digital-asset businesses that meet supervisory expectations while remaining workable in operation.',
    photo: photos.nightWork,
    methodology: [
      {
        title: 'Regulatory positioning',
        body: 'We establish which permissions the activity requires in each market before anything is built.',
      },
      {
        title: 'Risk assessment',
        body: 'A documented enterprise-wide AML/CFT risk assessment covering customer, product, channel, geography and counterparty risk.',
      },
      {
        title: 'Programme build',
        body: 'Policies, KYC/CDD thresholds, transaction monitoring rules, travel-rule handling and blockchain analytics tooling.',
      },
      {
        title: 'Independent testing',
        body: 'Periodic independent review of the programme, which supervisors increasingly expect to see evidenced.',
      },
    ],
    capabilities: [
      'AML/CFT programmes for virtual asset service providers',
      'Travel rule implementation and counterparty due diligence',
      'Blockchain analytics and transaction monitoring design',
      'Digital asset risk management frameworks',
      'Regulatory engagement and licensing support',
      'Independent AML programme testing',
    ],
    outcomes: [
      'A programme that withstands supervisory review',
      'Documented, defensible customer risk ratings',
      'Monitoring calibrated to observed typologies',
    ],
    engagements: [
      'AML/CFT programme build',
      'Licensing and regulatory readiness',
      'Independent AML review',
      'Board briefing on digital asset risk',
    ],
    relatedTaxonomy: [9, 8, 6],
    seo: {
      title: 'Cryptocurrency & Digital Asset Compliance Kenya',
      description:
        'AML/CFT programmes, travel rule readiness and risk management for virtual asset service providers operating in Kenya and East Africa.',
      keywords: [
        'crypto compliance Kenya',
        'AML CFT digital assets East Africa',
        'virtual asset service provider Kenya',
        'blockchain risk management Nairobi',
      ],
    },
  },
  {
    slug: 'business-advisory',
    name: 'Business Advisory',
    shortName: 'Business',
    discipline: 'Finance & strategy',
    summary:
      'Strategy execution, operating model design and performance improvement for growing institutions.',
    intro:
      'Strategy usually fails in the operating model rather than in the plan. We work on structure, decision rights, metrics and review cadence.',
    photo: photos.boardroomBrief,
    methodology: [
      {
        title: 'Baseline',
        body: 'Where margin is made, unit by unit, without the allocation conventions that obscure it.',
      },
      {
        title: 'Choice set',
        body: 'A small number of distinct options, each costed, each with its failure mode stated.',
      },
      {
        title: 'Operating model',
        body: 'Structure, decision rights, and the metrics reviewed monthly.',
      },
      {
        title: 'Execution cadence',
        body: 'We attend the first two quarters of review meetings to establish the cadence.',
      },
    ],
    capabilities: [
      'Corporate and business unit strategy',
      'Operating model and organisational design',
      'Performance improvement and cost optimisation',
      'Market entry across East African markets',
      'SME scale-up advisory',
      'Post-merger integration',
    ],
    outcomes: [
      'A strategy with an owner and a review cadence',
      'Clear visibility of where margin is made and lost',
      'Faster, better-evidenced management decisions',
    ],
    engagements: [
      'Strategy review and refresh',
      'Operating model redesign',
      'Market entry assessment',
      'Performance improvement programme',
    ],
    relatedTaxonomy: [12, 14, 15],
    seo: {
      title: 'Business Advisory & Strategy Consulting Kenya',
      description:
        'Strategy execution, operating model design, market entry and performance improvement advisory for institutions across East Africa.',
      keywords: [
        'business advisory Kenya',
        'management consulting Nairobi',
        'market entry East Africa',
        'operating model design Kenya',
      ],
    },
  },
  {
    slug: 'financial-advisory',
    name: 'Financial Advisory',
    shortName: 'Financial',
    discipline: 'Finance & strategy',
    summary:
      'Valuation, financial modelling, treasury operations and transaction support.',
    intro:
      'We build financial models and valuations that are transparent, auditable and defensible under diligence.',
    photo: photos.analystLaptop,
    methodology: [
      {
        title: 'Model architecture',
        body: 'One input sheet, one calculation engine, one output set, with no hardcoded values inside formulas and every assumption sourced.',
      },
      {
        title: 'Valuation',
        body: 'Income, market and asset approaches run in parallel, with divergence explained rather than averaged.',
      },
      {
        title: 'Sensitivity & stress',
        body: 'The variables that move the answer are identified and stressed to their limits.',
      },
      {
        title: 'Diligence readiness',
        body: 'We prepare the file as a buy-side team would review it, and rehearse management on the difficult questions.',
      },
    ],
    capabilities: [
      'Advanced financial modelling',
      'Corporate and business valuation',
      'Treasury operations and cash management',
      'Transaction support and due diligence',
      'Capital raising and investor readiness',
      'IFRS-compliant financial reporting support',
    ],
    outcomes: [
      'Models that withstand investor diligence',
      'Valuations with an explainable basis',
      'Treasury visibility across entities and currencies',
    ],
    engagements: [
      'Valuation engagement',
      'Financial model build or review',
      'Transaction due diligence',
      'Investor readiness programme',
    ],
    relatedTaxonomy: [1, 2, 16],
    seo: {
      title: 'Financial Advisory, Valuation & Modelling Kenya',
      description:
        'Business valuation, advanced financial modelling, treasury operations and transaction support for institutions in Kenya and East Africa.',
      keywords: [
        'business valuation Kenya',
        'financial modelling Nairobi',
        'transaction advisory East Africa',
        'treasury advisory Kenya',
      ],
    },
  },
  {
    slug: 'policy-research',
    name: 'Policy Research',
    shortName: 'Policy',
    discipline: 'Finance & strategy',
    summary:
      'Evidence-based policy analysis, regulatory impact assessment and public sector advisory.',
    intro:
      'We produce research for regulators setting rules, associations arguing a position, and institutions deciding how to respond. Method is stated, data is published, and the limits of each finding are named.',
    photo: photos.panelDiscussion,
    methodology: [
      {
        title: 'Question framing',
        body: 'The research question is narrowed until it is answerable with available data. Where it is not, we say so.',
      },
      {
        title: 'Evidence gathering',
        body: 'Primary collection where required, combined with administrative and published data, with provenance recorded throughout.',
      },
      {
        title: 'Analysis',
        body: 'The method is stated up front. Where the data does not support a conclusion, the paper says so.',
      },
      {
        title: 'Publication & engagement',
        body: 'A policy brief for decision-makers, a full paper for reviewers, and direct engagement with the relevant authority.',
      },
    ],
    capabilities: [
      'Regulatory impact assessment',
      'Sector and market studies',
      'Public finance and IPSAS advisory',
      'Policy briefs and position papers',
      'Stakeholder consultation design',
      'Monitoring and evaluation frameworks',
    ],
    outcomes: [
      'Evidence a regulator can engage with',
      'Position papers that stand up in consultation',
      'Programme evaluation with a stated method',
    ],
    engagements: [
      'Commissioned policy study',
      'Regulatory impact assessment',
      'Sector position paper',
      'Programme monitoring & evaluation',
    ],
    relatedTaxonomy: [2, 10, 13],
    seo: {
      title: 'Policy Research & Public Sector Advisory East Africa',
      description:
        'Evidence-based policy research, regulatory impact assessment and public sector advisory across Kenya and East Africa.',
      keywords: [
        'policy research Kenya',
        'regulatory impact assessment East Africa',
        'public sector advisory Nairobi',
        'IPSAS advisory Kenya',
      ],
    },
  },
]

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)

export const serviceDisciplines = [
  'Assurance & risk',
  'Finance & strategy',
] as const
