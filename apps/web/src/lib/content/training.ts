/**
 * Training taxonomy (§8) and the public course catalog (§4.5).
 *
 * The 16 focus areas below are fixed by the proposal — the catalog, the custom
 * programme builder, related content and search filters all categorise against
 * this list (CAP-07). Prices are carried in both KES and USD because the
 * platform transacts in both at launch (CAP-08, PAY-08).
 */

import { photos } from '@/lib/images'
import type { Photo } from '@/lib/images'

// -- Taxonomy (§8) -----------------------------------------------------------

export type FocusArea = {
  /** 1-16, matching the numbering in the requirements table. */
  id: number
  name: string
  shortName: string
  blurb: string
  modules: Array<string>
}

export const focusAreas: Array<FocusArea> = [
  {
    id: 1,
    name: 'Finance & Corporate Treasury',
    shortName: 'Finance & Treasury',
    blurb: 'Modelling, valuation and treasury operations for finance teams.',
    modules: [
      'Advanced Financial Modeling',
      'Corporate Valuation',
      'Treasury Operations',
    ],
  },
  {
    id: 2,
    name: 'Accounting & IFRS Compliance',
    shortName: 'Accounting & IFRS',
    blurb:
      'Standards updates and reporting practice, private and public sector.',
    modules: [
      'IFRS Standards Updates',
      'Public Sector Accounting (IPSAS)',
      'Financial Reporting',
    ],
  },
  {
    id: 3,
    name: 'Taxation & Tax Advisory',
    shortName: 'Taxation',
    blurb: 'Regional corporate tax, transfer pricing and dispute practice.',
    modules: [
      'East African Corporate Tax',
      'Transfer Pricing',
      'VAT Administration',
      'Tax Dispute Management',
    ],
  },
  {
    id: 4,
    name: 'Internal Audit & Risk',
    shortName: 'Internal Audit',
    blurb: 'Risk-based auditing, forensics and fraud analytics.',
    modules: [
      'Risk-Based Internal Auditing',
      'Forensic Accounting',
      'Fraud Prevention Analytics',
    ],
  },
  {
    id: 5,
    name: 'Risk Management & ERM',
    shortName: 'Risk & ERM',
    blurb: 'Enterprise, credit and operational risk frameworks.',
    modules: [
      'Enterprise Risk Management Frameworks',
      'Credit Risk',
      'Operational Risk Management',
    ],
  },
  {
    id: 6,
    name: 'Governance & Compliance',
    shortName: 'Governance',
    blurb: 'Board leadership, governance codes and ESG reporting.',
    modules: [
      'Board Leadership',
      'Corporate Governance Code',
      'ESG & Sustainability Reporting',
    ],
  },
  {
    id: 7,
    name: 'Information Systems (IS) Audit',
    shortName: 'IS Audit',
    blurb: 'IT controls, COBIT and ISO 27001 assurance.',
    modules: [
      'IT General Controls',
      'COBIT Framework',
      'ISMS / ISO 27001 Auditing',
    ],
  },
  {
    id: 8,
    name: 'Cybersecurity Awareness',
    shortName: 'Cybersecurity',
    blurb: 'Cyber governance and executive-level security literacy.',
    modules: [
      'Corporate Cybersecurity Governance',
      'Incident Response',
      'Executive Cyber Literacy',
    ],
  },
  {
    id: 9,
    name: 'Cryptocurrency & Digital Assets',
    shortName: 'Digital Assets',
    blurb: 'Compliance, AML/CFT and risk for virtual assets.',
    modules: [
      'Crypto Compliance',
      'AML/CFT for Digital Assets',
      'Blockchain Risk Management',
    ],
  },
  {
    id: 10,
    name: 'Procurement & Supply Chain',
    shortName: 'Procurement',
    blurb: 'Public procurement regulation and sourcing strategy.',
    modules: [
      'Public Procurement Regulation',
      'Strategic Sourcing',
      'Supply Chain Risk',
    ],
  },
  {
    id: 11,
    name: 'Human Resource Management',
    shortName: 'Human Resources',
    blurb: 'Strategic HR, performance and labour law compliance.',
    modules: [
      'Strategic HR Management',
      'Executive Performance Appraisal',
      'Labor Law Compliance',
    ],
  },
  {
    id: 12,
    name: 'Leadership & Executive Strategy',
    shortName: 'Leadership',
    blurb: 'Change, strategic thinking and executive negotiation.',
    modules: [
      'Change Management',
      'Strategic Thinking',
      'Executive Negotiation Masterclass',
    ],
  },
  {
    id: 13,
    name: 'Project Management',
    shortName: 'Project Management',
    blurb: 'PMP-aligned delivery, agile practice and M&E.',
    modules: [
      'PMP Alignment',
      'Agile Project Management',
      'Monitoring & Evaluation',
    ],
  },
  {
    id: 14,
    name: 'SME Scale-Up Development',
    shortName: 'SME Scale-Up',
    blurb: 'Financial management and governance for growing firms.',
    modules: [
      'SME Financial Management',
      'Access to Capital',
      'SME Governance Frameworks',
    ],
  },
  {
    id: 15,
    name: 'Entrepreneurship & Growth',
    shortName: 'Entrepreneurship',
    blurb: 'Venture building, investor pitching and model innovation.',
    modules: [
      'Venture Building',
      'Pitching to Investors',
      'Business Model Innovation',
    ],
  },
  {
    id: 16,
    name: 'Personal Financial Literacy',
    shortName: 'Personal Finance',
    blurb: 'Wealth, retirement and personal investment strategy.',
    modules: [
      'Wealth Management',
      'Executive Retirement Planning',
      'Personal Investment Strategy',
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
  {
    slug: 'east-african-corporate-tax',
    title: 'East African Corporate Tax',
    focusAreaId: 3,
    summary:
      'Corporate tax across the EAC partner states — residence, permanent establishment, allowable deductions and cross-border withholding.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 24,
    modules: 8,
    priceKes: 48000,
    priceUsd: 375,
    photo: photos.deskReview,
    featured: true,
    credential: 'Certificate in East African Corporate Tax',
    outcomes: [
      'Determine residence and PE exposure across EAC states',
      'Compute corporate tax with confidence on disallowables',
      'Apply the correct withholding treatment to cross-border payments',
    ],
    published: true,
  },
  {
    slug: 'transfer-pricing-documentation',
    title: 'Transfer Pricing & Documentation',
    focusAreaId: 3,
    summary:
      'Build a local file that withstands review: functional analysis, method selection, benchmarking and defence.',
    level: 'Advanced',
    delivery: 'Live virtual',
    hours: 18,
    modules: 6,
    priceKes: 62000,
    priceUsd: 485,
    photo: photos.tabletGlass,
    credential: 'Certificate in Transfer Pricing',
    outcomes: [
      'Run a defensible functional and risk analysis',
      'Select and justify the appropriate pricing method',
      'Assemble a local file to regional authority standards',
    ],
    published: true,
  },
  {
    slug: 'risk-based-internal-auditing',
    title: 'Risk-Based Internal Auditing',
    focusAreaId: 4,
    summary:
      'Plan and execute an internal audit programme driven by the entity’s real risk universe rather than by last year’s plan.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 30,
    modules: 10,
    priceKes: 55000,
    priceUsd: 430,
    photo: photos.strategyTable,
    featured: true,
    credential: 'Certificate in Risk-Based Internal Auditing',
    outcomes: [
      'Build a risk universe and rank it by exposure',
      'Design fieldwork that evidences to source',
      'Report findings an audit committee will act on',
    ],
    published: true,
  },
  {
    slug: 'forensic-accounting-fraud-analytics',
    title: 'Forensic Accounting & Fraud Analytics',
    focusAreaId: 4,
    summary:
      'Detection, investigation and evidence handling — including full-population analytics for common fraud typologies.',
    level: 'Advanced',
    delivery: 'Blended',
    hours: 28,
    modules: 9,
    priceKes: 68000,
    priceUsd: 530,
    photo: photos.nightWork,
    credential: 'Certificate in Forensic Accounting',
    outcomes: [
      'Design analytics that surface known fraud typologies',
      'Preserve evidence to an admissible standard',
      'Structure an investigation report for legal review',
    ],
    published: true,
  },
  {
    slug: 'board-leadership-governance',
    title: 'Board Leadership & Corporate Governance',
    focusAreaId: 6,
    summary:
      'For directors and those preparing for board service: duties, committee mandates, board papers and effectiveness.',
    level: 'Executive',
    delivery: 'In person',
    hours: 16,
    modules: 5,
    priceKes: 125000,
    priceUsd: 975,
    photo: photos.boardroomWide,
    featured: true,
    credential: 'Executive Certificate in Board Leadership',
    outcomes: [
      'Discharge director duties under the applicable code',
      'Chair and contribute to effective committee work',
      'Read and challenge a board pack properly',
    ],
    published: true,
  },
  {
    slug: 'esg-sustainability-reporting',
    title: 'ESG & Sustainability Reporting',
    focusAreaId: 6,
    summary:
      'Materiality assessment, data collection and assurance-ready ESG disclosure for East African institutions.',
    level: 'Intermediate',
    delivery: 'Live virtual',
    hours: 20,
    modules: 7,
    priceKes: 52000,
    priceUsd: 405,
    photo: photos.portraitYellow,
    credential: 'Certificate in ESG & Sustainability Reporting',
    outcomes: [
      'Run a defensible materiality assessment',
      'Build an ESG data collection process that survives audit',
      'Prepare disclosure aligned to recognised frameworks',
    ],
    published: true,
  },
  {
    slug: 'it-general-controls-cobit',
    title: 'IT General Controls & COBIT',
    focusAreaId: 7,
    summary:
      'ITGC audit across access, change, operations and backup, mapped to the COBIT governance framework.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 26,
    modules: 8,
    priceKes: 58000,
    priceUsd: 455,
    photo: photos.dataCentre,
    featured: true,
    credential: 'Certificate in IS Audit Fundamentals',
    outcomes: [
      'Scope an ITGC audit from the financially significant systems',
      'Test access and change controls with system evidence',
      'Map findings to COBIT objectives',
    ],
    published: true,
  },
  {
    slug: 'iso-27001-isms-auditing',
    title: 'ISMS & ISO 27001 Auditing',
    focusAreaId: 7,
    summary:
      'Audit an information security management system against ISO 27001, from scoping through Annex A control testing.',
    level: 'Advanced',
    delivery: 'Live virtual',
    hours: 24,
    modules: 8,
    priceKes: 72000,
    priceUsd: 560,
    photo: photos.collabDesk,
    credential: 'Certificate in ISO 27001 Auditing',
    outcomes: [
      'Scope an ISMS audit correctly',
      'Test Annex A controls with appropriate evidence',
      'Report non-conformities to certification standard',
    ],
    published: true,
  },
  {
    slug: 'crypto-compliance-aml-cft',
    title: 'Crypto Compliance & AML/CFT for Digital Assets',
    focusAreaId: 9,
    summary:
      'Build and test an AML/CFT programme for virtual asset activity, including travel rule and blockchain analytics.',
    level: 'Advanced',
    delivery: 'Live virtual',
    hours: 22,
    modules: 7,
    priceKes: 78000,
    priceUsd: 610,
    photo: photos.execPhone,
    featured: true,
    credential: 'Certificate in Digital Asset Compliance',
    outcomes: [
      'Produce an enterprise-wide AML/CFT risk assessment',
      'Implement travel rule and counterparty due diligence',
      'Calibrate monitoring to real typologies',
    ],
    published: true,
  },
  {
    slug: 'enterprise-risk-management',
    title: 'Enterprise Risk Management Frameworks',
    focusAreaId: 5,
    summary:
      'Risk appetite, registers, escalation and reporting — an ERM framework management can run.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 22,
    modules: 7,
    priceKes: 50000,
    priceUsd: 390,
    photo: photos.boardroomBrief,
    credential: 'Certificate in Enterprise Risk Management',
    outcomes: [
      'Articulate risk appetite in measurable terms',
      'Run a risk register that management owns',
      'Escalate and report risk to the board usefully',
    ],
    published: true,
  },
  {
    slug: 'advanced-financial-modeling',
    title: 'Advanced Financial Modeling',
    focusAreaId: 1,
    summary:
      'Build auditable three-statement models with scenario and sensitivity architecture that survives diligence.',
    level: 'Advanced',
    delivery: 'Blended',
    hours: 32,
    modules: 10,
    priceKes: 65000,
    priceUsd: 505,
    photo: photos.analystLaptop,
    credential: 'Certificate in Advanced Financial Modeling',
    outcomes: [
      'Architect a model with clean input–calculation–output separation',
      'Build scenario and sensitivity layers correctly',
      'Audit and stress-test another analyst’s model',
    ],
    published: true,
  },
  {
    slug: 'ifrs-standards-update',
    title: 'IFRS Standards Update',
    focusAreaId: 2,
    summary:
      'Current and forthcoming IFRS changes with worked application to East African reporting entities.',
    level: 'Intermediate',
    delivery: 'Self-paced',
    hours: 14,
    modules: 6,
    priceKes: 32000,
    priceUsd: 250,
    photo: photos.portraitBlue,
    credential: 'Certificate in IFRS Compliance',
    outcomes: [
      'Apply recent standards changes to live balances',
      'Identify transition impacts early',
      'Prepare disclosure that satisfies the auditor',
    ],
    published: true,
  },
  {
    slug: 'public-sector-accounting-ipsas',
    title: 'Public Sector Accounting (IPSAS)',
    focusAreaId: 2,
    summary:
      'Accrual IPSAS for county and national government entities, agencies and state corporations.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 26,
    modules: 8,
    priceKes: 45000,
    priceUsd: 350,
    photo: photos.workshopRoom,
    credential: 'Certificate in Public Sector Accounting',
    outcomes: [
      'Apply accrual IPSAS to public sector balances',
      'Manage the cash-to-accrual transition',
      'Prepare IPSAS-compliant financial statements',
    ],
    published: true,
  },
  {
    slug: 'executive-cyber-literacy',
    title: 'Executive Cyber Literacy',
    focusAreaId: 8,
    summary:
      'What a board needs to understand about cyber risk to govern it — without becoming engineers.',
    level: 'Executive',
    delivery: 'Live virtual',
    hours: 8,
    modules: 4,
    priceKes: 42000,
    priceUsd: 330,
    photo: photos.execChair,
    credential: 'Executive Certificate in Cyber Governance',
    outcomes: [
      'Ask management the right questions about cyber posture',
      'Interpret an incident report as a director',
      'Govern cyber risk without technical depth',
    ],
    published: true,
  },
  {
    slug: 'public-procurement-regulation',
    title: 'Public Procurement Regulation',
    focusAreaId: 10,
    summary:
      'Procurement law and practice for public entities and the suppliers who bid to them.',
    level: 'Foundation',
    delivery: 'Self-paced',
    hours: 12,
    modules: 5,
    priceKes: 28000,
    priceUsd: 220,
    photo: photos.twoAdvisors,
    credential: 'Certificate in Public Procurement',
    outcomes: [
      'Navigate the statutory procurement process',
      'Prepare compliant tender documentation',
      'Handle review and appeal correctly',
    ],
    published: true,
  },
  {
    slug: 'strategic-hr-labor-law',
    title: 'Strategic HR & Labour Law Compliance',
    focusAreaId: 11,
    summary:
      'Employment law, performance management and workforce planning for HR leadership.',
    level: 'Intermediate',
    delivery: 'Blended',
    hours: 20,
    modules: 7,
    priceKes: 44000,
    priceUsd: 345,
    photo: photos.portraitOrange,
    credential: 'Certificate in Strategic HR Management',
    outcomes: [
      'Apply employment law to live workforce decisions',
      'Design performance management that holds up on review',
      'Plan workforce capability against strategy',
    ],
    published: true,
  },
  {
    slug: 'executive-negotiation',
    title: 'Executive Negotiation Masterclass',
    focusAreaId: 12,
    summary:
      'High-stakes negotiation for senior leaders — preparation, leverage, concession design and closing.',
    level: 'Executive',
    delivery: 'In person',
    hours: 12,
    modules: 4,
    priceKes: 115000,
    priceUsd: 895,
    photo: photos.execOutdoor,
    credential: 'Executive Certificate in Negotiation',
    outcomes: [
      'Prepare a negotiation with a defined walk-away',
      'Design concessions that buy something',
      'Close without leaving obvious value behind',
    ],
    published: true,
  },
  {
    slug: 'agile-project-management',
    title: 'Agile Project Management',
    focusAreaId: 13,
    summary:
      'Agile delivery for institutions that still need governance, reporting and audit trails.',
    level: 'Intermediate',
    delivery: 'Self-paced',
    hours: 18,
    modules: 6,
    priceKes: 36000,
    priceUsd: 280,
    photo: photos.teamCouch,
    credential: 'Certificate in Agile Project Management',
    outcomes: [
      'Run agile delivery inside a governed environment',
      'Report progress meaningfully to a steering committee',
      'Maintain an audit trail without killing cadence',
    ],
    published: true,
  },
  {
    slug: 'sme-financial-management',
    title: 'SME Financial Management',
    focusAreaId: 14,
    summary:
      'Working capital, pricing and management accounts for owner-managed and growing businesses.',
    level: 'Foundation',
    delivery: 'Self-paced',
    hours: 15,
    modules: 6,
    priceKes: 24000,
    priceUsd: 190,
    photo: photos.portraitWhite,
    credential: 'Certificate in SME Financial Management',
    outcomes: [
      'Manage working capital deliberately',
      'Price with knowledge of true unit cost',
      'Produce management accounts that guide decisions',
    ],
    published: true,
  },
  {
    slug: 'pitching-to-investors',
    title: 'Pitching to Investors',
    focusAreaId: 15,
    summary:
      'Investor narrative, data room preparation and the diligence questions that decide the round.',
    level: 'Intermediate',
    delivery: 'Live virtual',
    hours: 10,
    modules: 4,
    priceKes: 30000,
    priceUsd: 235,
    photo: photos.portraitCityWindow,
    credential: 'Certificate in Investor Readiness',
    outcomes: [
      'Build a narrative an investor can underwrite',
      'Prepare a data room before diligence starts',
      'Answer the questions that end rounds',
    ],
    published: true,
  },
  {
    slug: 'wealth-retirement-planning',
    title: 'Wealth & Executive Retirement Planning',
    focusAreaId: 16,
    summary:
      'Personal investment strategy, retirement structuring and estate basics for senior professionals.',
    level: 'Foundation',
    delivery: 'Self-paced',
    hours: 10,
    modules: 5,
    priceKes: 22000,
    priceUsd: 175,
    photo: photos.portraitStudio,
    credential: 'Certificate in Personal Financial Planning',
    outcomes: [
      'Build a personal investment policy',
      'Structure retirement provision tax-efficiently',
      'Understand estate planning fundamentals',
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
