/**
 * The advisory practice areas.
 *
 * Source: the client's CaliberCode corporate overview, which supersedes the
 * nine-practice / four-pillar structure taken from Company Profile v3. That
 * structure carried practices the overview does not offer (Business Advisory,
 * Financial Advisory, Human Capital, standalone IS Audit) and split ones it
 * treats as a single engagement. The overview organises the advisory offering
 * as three practices, and that is what this module now carries.
 *
 * Because there are three practices rather than nine, the `Pillar` grouping is
 * gone: it existed to make a long list navigable, and grouping three items
 * under three headings communicates nothing. The services index renders the
 * list directly.
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

export type Service = {
  slug: string
  name: string
  /** Short label for dense navigation and cards. */
  shortName: string
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
    slug: 'statutory-tax-compliance',
    name: 'Statutory & Tax Compliance',
    shortName: 'Statutory & Tax',
    summary:
      'Hands-on KRA registration, filing and statutory payroll compliance, run as execution rather than as advice.',
    intro:
      'Most compliance failures are not decisions — they are deadlines that passed. We take on the registration, filing and reconciliation work directly, and run a calendar that makes the next deadline someone’s named responsibility.',
    photo: photos.deskReview,
    methodology: [
      {
        title: 'Obligation Map',
        body: 'We establish which obligations the entity actually carries — income tax, VAT, TOT, excise, PAYE, MRI and the payroll levies — rather than which ones it has been filing.',
      },
      {
        title: 'Health Check',
        body: 'A pre-audit review of filed positions, statutory records and payroll practice, with each gap quantified as principal, penalty and interest.',
      },
      {
        title: 'Remediation & Filing',
        body: 'We execute: registrations and amendments, obligation applications, back-filing, reconciliations and eTIMS setup, working alongside your finance team.',
      },
      {
        title: 'Compliance Calendar',
        body: 'A dated calendar per obligation with an owner and a reminder cycle, so the position holds after the engagement ends.',
      },
    ],
    capabilities: [
      'KRA registration and setup — new PIN registrations and detail amendments',
      'Obligation applications — VAT, Turnover Tax, Excise Duty and business tax obligations',
      'Direct tax returns — Income Tax (individual and corporate), TOT and Monthly Rental Income',
      'Indirect tax and operations — VAT compliance and returns, PAYE, eTIMS setup and management',
      'Statutory payroll compliance — NSSF, SHA, Affordable Housing Levy and Tourism Fund',
      'Statutory health checks — pre-audit reviews and compliance gap analysis',
      'Statutory records management and reconciliation',
      'Deadline management through a customised corporate compliance calendar',
    ],
    deliverables: [
      'A compliance gap analysis with each exposure quantified',
      'Completed registrations, amendments and obligation applications',
      'Filed returns with the supporting reconciliation pack',
      'An eTIMS configuration handed over documented',
      'A dated compliance calendar with an owner against every obligation',
    ],
    outcomes: [
      'Late-filing penalties and interest eliminated rather than negotiated',
      'Payroll levies reconciled to the ledger and to the statutory portals',
      'An audit-ready statutory file at any point in the year',
    ],
    engagements: [
      'Statutory health check and gap analysis',
      'Retained monthly compliance and filing',
      'eTIMS and VAT implementation',
      'Payroll statutory clean-up',
    ],
    relatedTaxonomy: [1, 2],
    seo: {
      title: 'Statutory & Tax Compliance Services Kenya',
      description:
        'KRA registration, VAT, PAYE, TOT and eTIMS compliance, statutory payroll for NSSF, SHA and the Affordable Housing Levy, and compliance calendars for businesses in Kenya.',
      keywords: [
        'tax compliance Kenya',
        'KRA filing services Nairobi',
        'eTIMS setup Kenya',
        'statutory payroll compliance NSSF SHA',
      ],
    },
  },
  {
    slug: 'governance-risk-internal-audit',
    name: 'Governance, Risk & Internal Audit Advisory',
    shortName: 'Governance & Audit',
    summary:
      'Board effectiveness, enterprise risk frameworks, risk-based internal audit and the policy set underneath them.',
    intro:
      'A charter describes how a board should work; the minutes record how it did. We work on the distance between the two — then build the risk framework, audit function and control documentation that keep it closed.',
    photo: photos.boardroomWide,
    methodology: [
      {
        title: 'Diagnostic',
        body: 'Board papers, minutes, charters and committee composition are reviewed against the applicable code and against observed practice.',
      },
      {
        title: 'Framework Design',
        body: 'Risk appetite, escalation thresholds and committee mandates are written to be usable at board level rather than filed.',
      },
      {
        title: 'Audit Execution',
        body: 'A risk-based plan built from the entity’s own risk universe, with coverage gaps stated explicitly and fieldwork evidenced to source.',
      },
      {
        title: 'Embedding & Assurance',
        body: 'We run the first cycles alongside management, then review independently after two cycles to test whether the framework is actually applied.',
      },
    ],
    standards: [
      {
        name: 'International Professional Practices Framework (IPPF)',
        issuer: 'The Institute of Internal Auditors',
        note: 'The recognised authority for internal audit practice, and the basis on which an audit function is quality-assessed.',
      },
      {
        name: 'COSO Enterprise Risk Management',
        issuer:
          'Committee of Sponsoring Organizations of the Treadway Commission',
        note: 'The reference framework for enterprise risk management and for the internal control model audit committees expect.',
      },
      {
        name: 'ISO 31000 — Risk management',
        issuer: 'International Organization for Standardization',
        note: 'Used where a client needs risk management expressed in a form that maps onto its other ISO management systems.',
      },
    ],
    capabilities: [
      'Corporate governance and board structure evaluation',
      'Committee effectiveness and fiduciary practice review',
      'Enterprise risk management frameworks tailored to the industry risk landscape',
      'Risk register design, calibration and escalation thresholds',
      'Internal audit function set-up, audit charters and annual plans',
      'Risk-based internal audit execution and audit committee reporting',
      'Policy, SOP and internal control framework development and review',
      'Governance and risk assessments',
    ],
    deliverables: [
      'A governance diagnostic against the applicable code, with findings ranked',
      'An ERM framework with a documented risk appetite statement',
      'A board-approved internal audit charter and risk-based annual plan',
      'Audit reports carrying an owner, a date and a verification step per finding',
      'A reviewed policy and SOP set with a control matrix',
    ],
    outcomes: [
      'Board papers that support decisions instead of recording them',
      'A risk register management maintains without being asked',
      'Audit findings that close and stay closed on re-test',
    ],
    engagements: [
      'Board effectiveness evaluation',
      'ERM framework build',
      'Outsourced or co-sourced internal audit',
      'Policy and control framework review',
    ],
    relatedTaxonomy: [2, 5],
    seo: {
      title: 'Governance, Risk & Internal Audit Advisory Kenya',
      description:
        'Board effectiveness reviews, enterprise risk management frameworks, risk-based internal audit and policy and control frameworks for organisations across East Africa.',
      keywords: [
        'corporate governance Kenya',
        'enterprise risk management East Africa',
        'internal audit Kenya',
        'board effectiveness review Nairobi',
      ],
    },
  },
  {
    slug: 'fraud-financial-crime-digital-assets',
    name: 'Fraud, Financial Crime & Digital Asset Advisory',
    shortName: 'Fraud & Financial Crime',
    summary:
      'Anti-fraud controls, AML/CFT and KYC programmes, whistleblowing channels, and data protection and virtual asset posture.',
    intro:
      'Fraud is a control failure before it is a loss. We find where the controls give way, harden those points, build the disclosure route that surfaces the next one early, and cover the financial-crime and digital-asset obligations that sit alongside them.',
    photo: photos.nightWork,
    methodology: [
      {
        title: 'Fraud Risk Assessment',
        body: 'Scheme by scheme, we establish which frauds the current control set would fail to prevent or detect — and which it would catch.',
      },
      {
        title: 'Exposure Mapping',
        body: 'Procurement, vendor master, payroll and expense cycles are traced end to end, because that is where value leaves an organisation.',
      },
      {
        title: 'Programme Build',
        body: 'Anti-fraud controls, AML/CFT policies, KYC and CDD thresholds, screening design, and a whistleblowing channel staff will actually use.',
      },
      {
        title: 'Response & Testing',
        body: 'A documented response plan so the first hours of an incident are not improvised, and independent testing that evidences the programme works rather than that a policy exists.',
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
      'Fraud risk assessments and fraud risk registers',
      'Proactive anti-fraud control design and monitoring',
      'Procurement, vendor master and payroll integrity review',
      'AML, CFT and KYC programme implementation',
      'Customer due diligence, screening and suspicious transaction reporting workflows',
      'Secure whistleblowing channels and incident response frameworks',
      'Fraud investigation, evidence handling and case management',
      'Data protection and privacy posture assessment',
      'Virtual asset and cryptocurrency regulatory positioning',
    ],
    deliverables: [
      'A fraud risk register with red flags and monitoring indicators',
      'AML/CFT programme documentation — policies, thresholds and stated risk appetite',
      'A whistleblowing policy with the channel configured and staff briefed',
      'A documented fraud response plan with escalation and legal routes',
      'Investigation reports with evidence preserved to a defensible standard',
    ],
    outcomes: [
      'A named owner and a control at every point of leakage',
      'A disclosure channel that receives real reports',
      'A financial-crime programme that withstands supervisory review',
    ],
    engagements: [
      'Fraud risk assessment',
      'AML/CFT and KYC programme build',
      'Whistleblower programme design',
      'Fraud investigation and case management',
    ],
    relatedTaxonomy: [3, 4],
    seo: {
      title: 'Fraud, Financial Crime & Digital Asset Advisory Kenya',
      description:
        'Fraud risk assessments, anti-fraud controls, AML/CFT and KYC programmes, whistleblowing channels, data protection posture and virtual asset compliance across East Africa.',
      keywords: [
        'fraud risk advisory Kenya',
        'AML CFT compliance Nairobi',
        'whistleblowing policy Kenya',
        'virtual asset compliance East Africa',
      ],
    },
  },
]

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)
