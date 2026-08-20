/**
 * Training taxonomy and the public course catalog (§4.5).
 *
 * Source: the client's CaliberCode corporate overview, whose "Executive
 * Training & Capacity Building" table defines five focus areas and the modules
 * under each. That table supersedes the sixteen-area taxonomy this module used
 * to carry, which came from the original proposal and listed areas the firm
 * does not deliver (project management, procurement strategy, personal wealth).
 *
 * The five areas below are the taxonomy — the catalog, the custom programme
 * builder, related content and search filters all categorise against this list
 * (CAP-07). Prices are carried in both KES and USD because the platform
 * transacts in both at launch (CAP-08, PAY-08).
 *
 * The Fraud & Financial Crime Awareness area additionally carries the five-part
 * fraud series from the client's training proposal, which is sold as a
 * progression: culture, then risk management, then detection, then
 * investigation, then response.
 */

import { photos } from '@/lib/images'
import type { Photo } from '@/lib/images'

// -- Taxonomy ----------------------------------------------------------------

export type FocusArea = {
  /** 1-5, matching the order of the overview's training table. */
  id: number
  name: string
  shortName: string
  blurb: string
  modules: Array<string>
}

export const focusAreas: Array<FocusArea> = [
  {
    id: 1,
    name: 'Finance, Tax & Business Management',
    shortName: 'Finance & Tax',
    blurb:
      'Commercial and tax literacy for managers who own a budget but not a finance qualification.',
    modules: [
      'Finance For Non-Finance Managers',
      'Practical Tax Training',
      'Financial Literacy (Individuals & SMEs)',
      'Budgeting & Financial Planning',
      'Financial Analysis & Business Performance',
    ],
  },
  {
    id: 2,
    name: 'Governance, Risk & Internal Audit',
    shortName: 'Governance & Audit',
    blurb:
      'Board effectiveness, enterprise risk and the audit discipline that tests both.',
    modules: [
      'Corporate Governance & Board Effectiveness',
      'Enterprise Risk Management (ERM)',
      'Risk-Based Internal Auditing',
      'Internal Controls & Compliance',
      'Governance & Risk Assessments',
    ],
  },
  {
    id: 3,
    name: 'Fraud & Financial Crime Awareness',
    shortName: 'Fraud & Financial Crime',
    blurb:
      'Preventing, detecting, investigating and responding to fraud and financial crime.',
    modules: [
      'Fraud Risk Management',
      'Fraud Prevention & Detection',
      'Procurement Fraud Prevention',
      'AML/CFT & KYC',
      'Fraud & Compliance Assessments',
      'Whistleblowing & Incident Management',
    ],
  },
  {
    id: 4,
    name: 'Data Protection & Digital Assets',
    shortName: 'Data & Digital Assets',
    blurb:
      'Privacy compliance, virtual asset regulation and cyber oversight at board level.',
    modules: [
      'Data Protection & Privacy Compliance',
      'Cryptocurrency & Virtual Asset Compliance',
      'Digital Asset Risk Awareness',
      'Cybersecurity Oversight',
    ],
  },
  {
    id: 5,
    name: 'SME Growth & Executive Leadership',
    shortName: 'Growth & Leadership',
    blurb:
      'Strategy execution, performance management and leadership for growing firms.',
    modules: [
      'Strategic Planning & Execution',
      'KPI & Performance Management',
      'Investor Readiness',
      'Succession & SME Governance',
      'Business Process Improvement',
      'Leadership Development',
    ],
  },
]

export const focusAreaById = (id: number): FocusArea | undefined =>
  focusAreas.find((a) => a.id === id)

// -- Courses (§4.5) ----------------------------------------------------------

export type DeliveryMode =
  'Self-paced' | 'Blended' | 'Live virtual' | 'In person'
export type CourseLevel =
  'Foundation' | 'Intermediate' | 'Advanced' | 'Executive'

export type Course = {
  slug: string
  title: string
  /** Taxonomy focus area id (CAP-07). */
  focusAreaId: number
  summary: string
  level: CourseLevel
  delivery: DeliveryMode
  /** Total learning hours. */
  hours: number
  modules: number
  /** CAP-08 / PAY-08 — dual currency at launch. */
  priceKes: number
  priceUsd: number
  photo: Photo
  featured?: boolean
  /** Credential awarded on completion, verifiable at /verify (VERIFY-01). */
  credential: string
  outcomes: Array<string>
  /** CAP-09 — publish state controlled from the CMS. */
  published: boolean
}

export const courses: Array<Course> = [
  // -- 1. Finance, Tax & Business Management ---------------------------------
  {
    slug: 'finance-for-non-finance-managers',
    title: 'Finance For Non-Finance Managers',
    focusAreaId: 1,
    summary:
      'Read a set of accounts, defend a budget and understand what your decisions do to cash — without a finance qualification.',
    level: 'Foundation',
    delivery: 'Blended',
    hours: 21,
    modules: 7,
    priceKes: 42000,
    priceUsd: 330,
    photo: photos.collabDesk,
    credential: 'Certificate In Finance For Non-Finance Managers',
    outcomes: [
      'Interpret a balance sheet, income statement and cash flow statement',
      'Distinguish profit from cash and explain why they diverge',
      'Build and defend a departmental budget',
    ],
    published: true,
  },
  {
    slug: 'practical-tax-training',
    title: 'Practical Tax Training',
    focusAreaId: 1,
    summary:
      'Working knowledge of the Kenyan tax obligations a business actually files — VAT, PAYE, TOT, MRI and eTIMS — taught in the portal.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 24,
    modules: 8,
    priceKes: 48000,
    priceUsd: 375,
    photo: photos.deskReview,
    featured: true,
    credential: 'Certificate In Practical Tax Compliance',
    outcomes: [
      'Determine which obligations an entity carries and when each falls due',
      'Prepare and file VAT, PAYE, TOT and income tax returns',
      'Configure and operate eTIMS against the sales ledger',
    ],
    published: true,
  },
  {
    slug: 'financial-literacy-individuals-smes',
    title: 'Financial Literacy For Individuals & SMEs',
    focusAreaId: 1,
    summary:
      'The separation of personal and business money, basic record keeping, and the numbers a small business owner needs monthly.',
    level: 'Foundation',
    delivery: 'Self-paced',
    hours: 12,
    modules: 6,
    priceKes: 22000,
    priceUsd: 175,
    photo: photos.tabletGlass,
    credential: 'Certificate In Financial Literacy',
    outcomes: [
      'Keep books that survive a lender or revenue authority review',
      'Separate owner drawings from business cash',
      'Read a monthly position and act on it',
    ],
    published: true,
  },
  {
    slug: 'budgeting-financial-planning',
    title: 'Budgeting & Financial Planning',
    focusAreaId: 1,
    summary:
      'Build a budget that holds: driver-based assumptions, rolling forecasts and variance analysis that changes behaviour.',
    level: 'Intermediate',
    delivery: 'Live virtual',
    hours: 18,
    modules: 6,
    priceKes: 38000,
    priceUsd: 300,
    photo: photos.analystLaptop,
    credential: 'Certificate In Budgeting & Financial Planning',
    outcomes: [
      'Build a driver-based budget rather than a percentage uplift',
      'Run a rolling forecast cycle',
      'Investigate variance to cause instead of to blame',
    ],
    published: true,
  },
  {
    slug: 'financial-analysis-business-performance',
    title: 'Financial Analysis & Business Performance',
    focusAreaId: 1,
    summary:
      'Ratio and margin analysis, unit economics and the diagnostics that show where a business actually makes and loses money.',
    level: 'Advanced',
    delivery: 'Blended',
    hours: 24,
    modules: 8,
    priceKes: 52000,
    priceUsd: 410,
    photo: photos.boardroomBrief,
    credential: 'Certificate In Financial Analysis & Performance',
    outcomes: [
      'Analyse profitability by unit, product and channel',
      'Identify the drivers that move enterprise performance',
      'Present a financial diagnosis to a management team',
    ],
    published: true,
  },

  // -- 2. Governance, Risk & Internal Audit ----------------------------------
  {
    slug: 'corporate-governance-board-effectiveness',
    title: 'Corporate Governance & Board Effectiveness',
    focusAreaId: 2,
    summary:
      'Fiduciary duty, committee mandates and the practice of running a board that decides rather than receives.',
    level: 'Executive',
    delivery: 'In person',
    hours: 16,
    modules: 5,
    priceKes: 65000,
    priceUsd: 510,
    photo: photos.boardroomWide,
    featured: true,
    credential: 'Certificate In Corporate Governance & Board Effectiveness',
    outcomes: [
      'Apply fiduciary duty to a live board decision',
      'Assess committee composition and mandate against the applicable code',
      'Challenge management on a board paper with the right questions',
    ],
    published: true,
  },
  {
    slug: 'enterprise-risk-management',
    title: 'Enterprise Risk Management (ERM)',
    focusAreaId: 2,
    summary:
      'Design an ERM framework, set a risk appetite the board will actually use, and keep a risk register that management maintains.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 24,
    modules: 8,
    priceKes: 55000,
    priceUsd: 430,
    photo: photos.strategyTable,
    credential: 'Certificate In Enterprise Risk Management',
    outcomes: [
      'Build a risk universe and rank it by exposure',
      'Write a risk appetite statement with usable thresholds',
      'Run an escalation route that reaches the board in time',
    ],
    published: true,
  },
  {
    slug: 'risk-based-internal-auditing',
    title: 'Risk-Based Internal Auditing',
    focusAreaId: 2,
    summary:
      'Plan and execute an internal audit programme driven by the entity’s real risk universe rather than by last year’s plan.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 30,
    modules: 10,
    priceKes: 55000,
    priceUsd: 430,
    photo: photos.workshopRoom,
    featured: true,
    credential: 'Certificate In Risk-Based Internal Auditing',
    outcomes: [
      'Build a risk universe and rank it by exposure',
      'Design fieldwork that evidences to source',
      'Report findings an audit committee will act on',
    ],
    published: true,
  },
  {
    slug: 'internal-controls-compliance',
    title: 'Internal Controls & Compliance',
    focusAreaId: 2,
    summary:
      'Control design, testing and the documentation that lets you demonstrate compliance rather than assert it.',
    level: 'Intermediate',
    delivery: 'Live virtual',
    hours: 18,
    modules: 6,
    priceKes: 40000,
    priceUsd: 315,
    photo: photos.twoAdvisors,
    credential: 'Certificate In Internal Controls & Compliance',
    outcomes: [
      'Map controls to the risks they are meant to address',
      'Test a control and evidence the result',
      'Maintain a control matrix that survives audit',
    ],
    published: true,
  },
  {
    slug: 'governance-risk-assessments',
    title: 'Governance & Risk Assessments',
    focusAreaId: 2,
    summary:
      'Run a governance and risk assessment end to end: scoping, evidence gathering, rating and the report that lands.',
    level: 'Advanced',
    delivery: 'In person',
    hours: 16,
    modules: 5,
    priceKes: 58000,
    priceUsd: 455,
    photo: photos.panelDiscussion,
    credential: 'Certificate In Governance & Risk Assessment',
    outcomes: [
      'Scope an assessment against the applicable governance code',
      'Rate findings consistently and defensibly',
      'Write a report the board can act on directly',
    ],
    published: true,
  },

  // -- 3. Fraud & Financial Crime Awareness ----------------------------------
  // The five-part series from the client's training proposal, in its stated
  // order, followed by the standalone modules from the overview.
  {
    slug: 'building-a-fraud-resilient-organization',
    title: 'Building A Fraud-Resilient Organization',
    focusAreaId: 3,
    summary:
      'Culture, governance and ethical leadership: the tone at the top that determines whether every other anti-fraud control holds.',
    level: 'Executive',
    delivery: 'In person',
    hours: 14,
    modules: 4,
    priceKes: 58000,
    priceUsd: 455,
    photo: photos.boardroomBrief,
    credential: 'Certificate In Fraud-Resilient Organizational Leadership',
    outcomes: [
      'Develop an anti-fraud culture with leadership accountability behind it',
      'Manage ethics, integrity and conflicts of interest as a standing process',
      'Establish whistleblowing and reporting mechanisms staff trust',
    ],
    published: true,
  },
  {
    slug: 'fraud-risk-management',
    title: 'Fraud Risk Management',
    focusAreaId: 3,
    summary:
      'Identify, assess and mitigate organizational fraud risk: assessment methodology, risk registers and the controls that close the gaps.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 21,
    modules: 4,
    priceKes: 52000,
    priceUsd: 410,
    photo: photos.strategyTable,
    featured: true,
    credential: 'Certificate In Fraud Risk Management',
    outcomes: [
      'Run a fraud risk assessment to a repeatable methodology',
      'Build a fraud risk register with usable risk indicators',
      'Identify control weaknesses and design the prevention strategy around them',
    ],
    published: true,
  },
  {
    slug: 'advanced-fraud-detection',
    title: 'Advanced Fraud Detection',
    focusAreaId: 3,
    summary:
      'Data analytics, red flags and emerging schemes — including technology-enabled and AI-related fraud — with continuous monitoring.',
    level: 'Advanced',
    delivery: 'Blended',
    hours: 24,
    modules: 5,
    priceKes: 62000,
    priceUsd: 485,
    photo: photos.analystLaptop,
    credential: 'Certificate In Advanced Fraud Detection',
    outcomes: [
      'Recognise fraud red flags and behavioural indicators',
      'Apply transaction and data analytics to full populations',
      'Design early-warning systems for digital and AI-related fraud risk',
    ],
    published: true,
  },
  {
    slug: 'fraud-investigation-case-management',
    title: 'Professional Fraud Investigation & Case Management',
    focusAreaId: 3,
    summary:
      'Plan and conduct an investigation: evidence handling, interviewing, digital and documentary evidence, and the report that follows.',
    level: 'Advanced',
    delivery: 'In person',
    hours: 28,
    modules: 5,
    priceKes: 72000,
    priceUsd: 565,
    photo: photos.nightWork,
    credential: 'Certificate In Fraud Investigation & Case Management',
    outcomes: [
      'Plan and conduct a fraud investigation without compromising it',
      'Identify, preserve and document evidence to a defensible standard',
      'Conduct interviews and write reports that hold up under challenge',
    ],
    published: true,
  },
  {
    slug: 'organizational-fraud-response-recovery',
    title: 'Strengthening Organizational Response To Fraud',
    focusAreaId: 3,
    summary:
      'Investigation, recovery and lessons learned: coordinating management, internal audit, HR, legal and investigators after an incident.',
    level: 'Advanced',
    delivery: 'Blended',
    hours: 18,
    modules: 5,
    priceKes: 58000,
    priceUsd: 455,
    photo: photos.twoAdvisors,
    credential: 'Certificate In Fraud Response & Recovery',
    outcomes: [
      'Coordinate management, internal audit, HR, legal and investigators',
      'Pursue asset tracing, recovery and the disciplinary or legal route',
      'Run a post-investigation review that strengthens the failed control',
    ],
    published: true,
  },
  {
    slug: 'procurement-fraud-prevention',
    title: 'Procurement Fraud Prevention',
    focusAreaId: 3,
    summary:
      'Bid rigging, vendor master manipulation, split awards and kickbacks — the schemes procurement is exposed to, and the safeguards that stop them.',
    level: 'Intermediate',
    delivery: 'Live virtual',
    hours: 16,
    modules: 5,
    priceKes: 40000,
    priceUsd: 315,
    photo: photos.workshopRoom,
    credential: 'Certificate In Procurement Fraud Prevention',
    outcomes: [
      'Recognise the common procurement fraud schemes by their indicators',
      'Harden the vendor master and the award process',
      'Test procurement controls against the scheme each is meant to stop',
    ],
    published: true,
  },
  {
    slug: 'aml-cft-kyc',
    title: 'AML/CFT & KYC',
    focusAreaId: 3,
    summary:
      'Anti-money laundering, counter-terrorist financing and customer due diligence as an operating programme, not a policy document.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 21,
    modules: 7,
    priceKes: 55000,
    priceUsd: 430,
    photo: photos.deskReview,
    credential: 'Certificate In AML/CFT & KYC Compliance',
    outcomes: [
      'Apply a risk-based approach to customer due diligence',
      'Operate screening, monitoring and suspicious transaction reporting',
      'Evidence the programme to a supervisor’s satisfaction',
    ],
    published: true,
  },
  {
    slug: 'whistleblowing-incident-management',
    title: 'Whistleblowing & Incident Management',
    focusAreaId: 3,
    summary:
      'Designing a disclosure channel people will use, and handling what comes through it without losing the case.',
    level: 'Foundation',
    delivery: 'Live virtual',
    hours: 12,
    modules: 4,
    priceKes: 28000,
    priceUsd: 220,
    photo: photos.teamCouch,
    credential: 'Certificate In Whistleblowing & Incident Management',
    outcomes: [
      'Design a channel that protects the reporter',
      'Triage and escalate a disclosure without tipping off',
      'Run the first 48 hours of an incident to a documented plan',
    ],
    published: true,
  },

  // -- 4. Data Protection & Digital Assets -----------------------------------
  {
    slug: 'data-protection-privacy-compliance',
    title: 'Data Protection & Privacy Compliance',
    focusAreaId: 4,
    summary:
      'Lawful basis, data subject rights, retention and breach response — built into how the organisation already processes data.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 21,
    modules: 7,
    priceKes: 48000,
    priceUsd: 375,
    photo: photos.dataCentre,
    featured: true,
    credential: 'Certificate In Data Protection & Privacy Compliance',
    outcomes: [
      'Establish lawful basis and maintain a record of processing',
      'Handle data subject requests within the statutory window',
      'Run a breach assessment and notification decision',
    ],
    published: true,
  },
  {
    slug: 'cryptocurrency-virtual-asset-compliance',
    title: 'Cryptocurrency & Virtual Asset Compliance',
    focusAreaId: 4,
    summary:
      'Regulatory positioning, AML/CFT for virtual assets, travel-rule handling and blockchain analytics for digital-asset businesses.',
    level: 'Advanced',
    delivery: 'Live virtual',
    hours: 24,
    modules: 8,
    priceKes: 68000,
    priceUsd: 535,
    photo: photos.nightWork,
    credential: 'Certificate In Virtual Asset Compliance',
    outcomes: [
      'Establish which permissions an activity requires in each market',
      'Design monitoring rules calibrated to observed typologies',
      'Apply the travel rule and counterparty due diligence',
    ],
    published: true,
  },
  {
    slug: 'digital-asset-risk-cybersecurity-oversight',
    title: 'Digital Asset Risk & Cybersecurity Oversight',
    focusAreaId: 4,
    summary:
      'What a board needs to understand about digital asset exposure and cyber risk to oversee it — without becoming technical.',
    level: 'Executive',
    delivery: 'Live virtual',
    hours: 12,
    modules: 4,
    priceKes: 45000,
    priceUsd: 355,
    photo: photos.tabletGlass,
    credential: 'Certificate In Digital Asset & Cyber Oversight',
    outcomes: [
      'Interrogate a cyber risk report at board level',
      'Understand custody, key management and counterparty exposure',
      'Set oversight expectations for management and internal audit',
    ],
    published: true,
  },

  // -- 5. SME Growth & Executive Leadership ----------------------------------
  {
    slug: 'strategic-planning-execution',
    title: 'Strategic Planning & Execution',
    focusAreaId: 5,
    summary:
      'Strategy usually fails in execution, not in the plan. Structure, decision rights, metrics and the review cadence that carries them.',
    level: 'Executive',
    delivery: 'In person',
    hours: 18,
    modules: 6,
    priceKes: 62000,
    priceUsd: 485,
    photo: photos.strategyTable,
    credential: 'Certificate In Strategic Planning & Execution',
    outcomes: [
      'Translate strategy into an operating model with decision rights',
      'Set the small number of metrics reviewed monthly',
      'Establish a review cadence that survives the first quarter',
    ],
    published: true,
  },
  {
    slug: 'kpi-performance-management',
    title: 'KPI & Performance Management',
    focusAreaId: 5,
    summary:
      'Choosing measures that drive behaviour, cascading them without distortion, and running the appraisal conversation.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 16,
    modules: 5,
    priceKes: 38000,
    priceUsd: 300,
    photo: photos.teamCouch,
    credential: 'Certificate In KPI & Performance Management',
    outcomes: [
      'Select measures that cannot be gamed into meaninglessness',
      'Cascade objectives without losing their intent',
      'Run a performance conversation on evidence',
    ],
    published: true,
  },
  {
    slug: 'investor-readiness',
    title: 'Investor Readiness',
    focusAreaId: 5,
    summary:
      'What a funder tests before it commits: the model, the governance, the records and the story — rehearsed under diligence conditions.',
    level: 'Advanced',
    delivery: 'Blended',
    hours: 18,
    modules: 6,
    priceKes: 55000,
    priceUsd: 430,
    photo: photos.keynote,
    credential: 'Certificate In Investor Readiness',
    outcomes: [
      'Prepare a data room a buy-side team can work through',
      'Defend the model assumptions that move the valuation',
      'Present the investment case under real questioning',
    ],
    published: true,
  },
  {
    slug: 'succession-sme-governance',
    title: 'Succession & SME Governance',
    focusAreaId: 5,
    summary:
      'Getting a founder-led business governed: boards that function at small scale, and a succession plan that is written down.',
    level: 'Intermediate',
    delivery: 'In person',
    hours: 14,
    modules: 5,
    priceKes: 42000,
    priceUsd: 330,
    photo: photos.boardroomWide,
    credential: 'Certificate In Succession & SME Governance',
    outcomes: [
      'Stand up a board that adds oversight without adding bureaucracy',
      'Separate ownership, governance and management roles',
      'Document a succession plan with a tested handover',
    ],
    published: true,
  },
  {
    slug: 'business-process-improvement',
    title: 'Business Process Improvement',
    focusAreaId: 5,
    summary:
      'Mapping a process as it runs, finding where cost and delay accumulate, and redesigning it so the improvement holds.',
    level: 'Intermediate',
    delivery: 'Live virtual',
    hours: 18,
    modules: 6,
    priceKes: 40000,
    priceUsd: 315,
    photo: photos.collabDesk,
    credential: 'Certificate In Business Process Improvement',
    outcomes: [
      'Map a process to what actually happens, not the SOP',
      'Quantify the cost of delay, rework and handoffs',
      'Redesign and embed the change with a control on it',
    ],
    published: true,
  },
  {
    slug: 'leadership-development',
    title: 'Leadership Development',
    focusAreaId: 5,
    summary:
      'Developing the management layer against the organisation it actually has to run, rather than a generic competency list.',
    level: 'Executive',
    delivery: 'Blended',
    hours: 24,
    modules: 8,
    priceKes: 60000,
    priceUsd: 470,
    photo: photos.delegates,
    featured: true,
    credential: 'Certificate In Executive Leadership Development',
    outcomes: [
      'Lead through a structure rather than around it',
      'Delegate with decision rights attached',
      'Hold a team to a standard without managing every task',
    ],
    published: true,
  },
]

/** CAP-09 — only published courses reach the public catalog. */
export const publishedCourses = courses.filter((c) => c.published)

export const featuredCourses = publishedCourses.filter((c) => c.featured)

export const courseBySlug = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug)

export const coursesByFocusArea = (id: number): Array<Course> =>
  publishedCourses.filter((c) => c.focusAreaId === id)

export const courseLevels: Array<CourseLevel> = [
  'Foundation',
  'Intermediate',
  'Advanced',
  'Executive',
]

export const deliveryModes: Array<DeliveryMode> = [
  'Self-paced',
  'Blended',
  'Live virtual',
  'In person',
]

// -- Currency ----------------------------------------------------------------

export type Currency = 'KES' | 'USD'

export function formatPrice(course: Course, currency: Currency): string {
  const amount = currency === 'KES' ? course.priceKes : course.priceUsd
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatMoney(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
