/**
 * The consulting practice areas, grouped by the four strategic pillars set out
 * in Company Profile v3 §2.
 *
 * The profile supersedes the two-discipline split ("Assurance & risk" /
 * "Finance & strategy") this module used to carry. It also adds Forensic
 * Advisory and Human Capital as practices in their own right, and drops Policy
 * Research, which the profile does not offer.
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

export type Standard = {
  name: string
  issuer: string
  note: string
}

/** Profile v3 §2 — the four domains the practice is organised across. */
export type Pillar =
  | 'Strategy & Advisory'
  | 'Financial Leadership'
  | 'Governance, Risk & Digital'
  | 'Human Capital & Talent'

export type Service = {
  slug: string
  name: string
  /** Short label for dense navigation and cards. */
  shortName: string
  discipline: Pillar
  summary: string
  intro: string
  photo: Photo
  /** SERV-02 — the stated approach for this practice. */
  methodology: Array<MethodologyStep>
  /**
   * Published standards the work is tested against.
   *
   * Only set this where a named standard is the recognised authority for the
   * discipline. It says what the engagement is measured by, which is a
   * different claim from what we cover — do not fill it in for its own sake,
   * and do not name a national statute here without sign-off.
   */
  standards?: Array<Standard>
  capabilities: Array<string>
  /** The artefacts handed over — distinct from `outcomes`, which is the effect. */
  deliverables?: Array<string>
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
    discipline: 'Financial Leadership',
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
      'VAT and PAYE administration and refund recovery',
      'Digital tax systems and eTIMS integration',
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
    discipline: 'Financial Leadership',
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
    discipline: 'Governance, Risk & Digital',
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
    discipline: 'Governance, Risk & Digital',
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
    discipline: 'Governance, Risk & Digital',
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
        body: 'Control testing, sample validation and a review of monitoring-rule logic — evidence that the programme works, not confirmation that a policy exists.',
      },
    ],
    standards: [
      {
        name: 'FATF Recommendations',
        issuer: 'Financial Action Task Force',
        note: 'The global AML/CFT standard that national regimes are themselves assessed against.',
      },
      {
        name: 'FATF Guidance for Virtual Assets and VASPs',
        issuer: 'Financial Action Task Force',
        note: 'Applies the standard to virtual asset businesses, including Recommendation 16 — the travel rule.',
      },
    ],
    capabilities: [
      'AML/CFT programmes for virtual asset service providers',
      'Enterprise-wide AML/CFT risk assessment',
      'Customer due diligence and source-of-funds frameworks',
      'Travel rule implementation and counterparty due diligence',
      'Blockchain analytics and transaction monitoring design',
      'Sanctions and PEP screening design and testing',
      'Suspicious transaction reporting workflows',
      'Digital asset risk management frameworks',
      'Regulatory engagement and licensing support',
      'Independent AML programme testing',
    ],
    deliverables: [
      'Programme documentation — policies, procedures and stated risk appetite',
      'A documented enterprise-wide AML/CFT risk assessment',
      'Risk-rated findings with a prioritised remediation plan',
      'A board summary stating exposure and the decisions required',
      'An evidence pack assembled for supervisory review',
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
    discipline: 'Strategy & Advisory',
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
      'Corporate turnaround and performance improvement',
      'Market entry across East African markets',
      'Post-merger integration and setup',
      'SME scale-up and governance',
      'Investor readiness and capital matching',
      'Succession planning for founder-led businesses',
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
    discipline: 'Financial Leadership',
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
    slug: 'forensic-advisory',
    name: 'Forensic Advisory & Fraud Mitigation',
    shortName: 'Forensics',
    discipline: 'Governance, Risk & Digital',
    summary:
      'Fraud risk diagnosis, procurement safeguards and disclosure channels that people will actually use.',
    intro:
      'Fraud is a control failure before it is a loss. We find where the controls give way, harden those points, and build the reporting route that surfaces the next one early.',
    photo: photos.nightWork,
    methodology: [
      {
        title: 'Fraud risk diagnosis',
        body: 'Scheme by scheme, we establish which frauds the current control set would fail to prevent or detect, and which it would catch.',
      },
      {
        title: 'Exposure mapping',
        body: 'Procurement, vendor master, payroll and expense cycles are traced end to end, because that is where value leaves an organisation.',
      },
      {
        title: 'Control redesign',
        body: 'Safeguards are placed at the points of leakage rather than spread evenly, and each one is tested against the scheme it is meant to stop.',
      },
      {
        title: 'Disclosure & response',
        body: 'A whistleblower channel staff will trust, and a documented response plan so the first hours of an incident are not improvised.',
      },
    ],
    capabilities: [
      'Corporate fraud risk diagnosis',
      'Procurement and supply chain fraud safeguards',
      'Vendor master and payroll integrity review',
      'Whistleblower and incident reporting systems',
      'Forensic investigation and evidence handling',
      'Fraud awareness training for staff and management',
    ],
    outcomes: [
      'A named owner and a control at every point of leakage',
      'A disclosure channel that receives real reports',
      'Investigations that produce evidence which holds up',
    ],
    engagements: [
      'Fraud risk assessment',
      'Procurement integrity review',
      'Whistleblower programme design',
      'Forensic investigation',
    ],
    relatedTaxonomy: [4, 10, 6],
    seo: {
      title: 'Forensic Advisory & Fraud Investigation Kenya',
      description:
        'Fraud risk diagnosis, procurement safeguards, whistleblower systems and forensic investigation for institutions across Kenya and East Africa.',
      keywords: [
        'forensic advisory Kenya',
        'fraud investigation Nairobi',
        'procurement fraud East Africa',
        'whistleblower policy Kenya',
      ],
    },
  },
  {
    slug: 'human-capital',
    name: 'Human Capital & Talent',
    shortName: 'Human capital',
    discipline: 'Human Capital & Talent',
    summary:
      'Organisation redesign, workforce planning, HR audit and labour law compliance.',
    intro:
      'Strategy is delivered by an organisation chart, a pay structure and a set of decision rights. We work on those, and on the statutory exposure that sits underneath them.',
    photo: photos.teamCouch,
    methodology: [
      {
        title: 'Structure review',
        body: 'Reporting lines, spans of control and decision rights are set against what the strategy actually requires.',
      },
      {
        title: 'Workforce plan',
        body: 'Roles are costed and sequenced against the plan, so hiring follows capability gaps rather than headcount budget.',
      },
      {
        title: 'HR audit',
        body: 'Contracts, policies, records and payroll practice are tested against labour law, and exposure is quantified.',
      },
      {
        title: 'Leadership capability',
        body: 'The management layer is developed against the structure it has to run, not against a generic competency list.',
      },
    ],
    capabilities: [
      'Organisation design and restructuring',
      'Workforce and succession planning',
      'HR audit and labour law compliance',
      'Performance management and KPI alignment',
      'Reward and job evaluation frameworks',
      'Executive and management development',
    ],
    outcomes: [
      'A structure that matches the strategy it has to deliver',
      'Quantified and closed labour law exposure',
      'A management layer capable of running the organisation',
    ],
    engagements: [
      'Organisation design review',
      'HR compliance audit',
      'Succession and workforce plan',
      'Executive development programme',
    ],
    relatedTaxonomy: [11, 12, 14],
    seo: {
      title: 'Human Capital & HR Advisory Kenya',
      description:
        'Organisation design, workforce planning, HR audit and labour law compliance for institutions across Kenya and East Africa.',
      keywords: [
        'HR advisory Kenya',
        'organisation design Nairobi',
        'HR audit East Africa',
        'labour law compliance Kenya',
      ],
    },
  },
]

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)

/**
 * Profile v3 §2. Order is the profile's own; the services index renders the
 * pillars in this sequence and the heading travels with the data rather than
 * being branched on in the route.
 */
export const servicePillars: Array<{ name: Pillar; title: string }> = [
  {
    name: 'Strategy & Advisory',
    title: 'Enterprise strategy, market entry and turnaround.',
  },
  {
    name: 'Financial Leadership',
    title: 'Tax, corporate finance and risk-based audit.',
  },
  {
    name: 'Governance, Risk & Digital',
    title: 'Governance, compliance, cyber and digital assets.',
  },
  {
    name: 'Human Capital & Talent',
    title: 'Organisation design and executive capability.',
  },
]
