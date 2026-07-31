/**
 * Insights hub content (§4.7): thought-leadership articles, policy commentary,
 * research whitepapers and policy briefs (RES-01, RES-02).
 *
 * `access` records how a resource is released. The proposal does not decide
 * whether whitepapers are open, email-gated or authenticated (§18.2 item 6), so
 * the field is modelled and surfaced in the UI but every item currently ships
 * as `open` pending that decision.
 */

import { photos } from '@/lib/images'
import type { Photo } from '@/lib/images'

export type InsightType =
  'Article' | 'Policy brief' | 'Whitepaper' | 'Commentary'
export type InsightAccess = 'open' | 'email-gated' | 'authenticated'

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
  /** Present on whitepapers and policy briefs. */
  pages?: number
}

export const insights: Array<Insight> = [
  {
    slug: 'transfer-pricing-enforcement-eac-2026',
    title:
      'Transfer pricing enforcement is tightening across the EAC. Most local files are not ready.',
    type: 'Whitepaper',
    summary:
      'A review of 60 transfer pricing files prepared for East African taxpayers, and the four documentation failures that appear in almost all of them.',
    publishedAt: '2026-07-14',
    readingMinutes: 18,
    author: 'Kwame Mensah',
    authorRole: 'Partner, Tax',
    photo: photos.deskReview,
    topics: ['Taxation', 'Transfer Pricing', 'Regional'],
    access: 'open',
    featured: true,
    pages: 34,
  },
  {
    slug: 'board-papers-that-decide',
    title: 'Why your board papers are not producing decisions',
    type: 'Article',
    summary:
      'Length is not the problem. Papers fail when they present analysis without a recommendation the board can accept or reject.',
    publishedAt: '2026-07-02',
    readingMinutes: 7,
    author: 'Dr. Amara Ochieng',
    authorRole: 'Managing Partner',
    photo: photos.boardroomWide,
    topics: ['Governance', 'Board Leadership'],
    access: 'open',
    featured: true,
  },
  {
    slug: 'virtual-asset-supervision-kenya',
    title:
      'Virtual asset supervision in Kenya: what the draft framework will require',
    type: 'Policy brief',
    summary:
      'The obligations most likely to land first — registration, AML/CFT programmes, travel rule and independent testing — and what to build now.',
    publishedAt: '2026-06-24',
    readingMinutes: 11,
    author: 'David Njoroge',
    authorRole: 'Director, Digital Assets',
    photo: photos.execPhone,
    topics: ['Digital Assets', 'Compliance', 'Regulation'],
    access: 'open',
    featured: true,
    pages: 12,
  },
  {
    slug: 'ipsas-accrual-transition-counties',
    title:
      'The accrual transition is a data problem before it is an accounting problem',
    type: 'Article',
    summary:
      'County entities that struggled with IPSAS adoption did not fail on standards knowledge. They failed on asset registers.',
    publishedAt: '2026-06-11',
    readingMinutes: 9,
    author: 'Wanjiru Kamau',
    authorRole: 'Partner, Financial Reporting',
    photo: photos.workshopRoom,
    topics: ['Public Sector', 'IPSAS', 'Accounting'],
    access: 'open',
  },
  {
    slug: 'itgc-findings-that-recur',
    title:
      'Five IT general control findings that recur in every East African bank we audit',
    type: 'Article',
    summary:
      'Privileged access reviews, change approval evidence, and three other controls that fail for structural rather than technical reasons.',
    publishedAt: '2026-05-28',
    readingMinutes: 8,
    author: 'Brian Kiptoo',
    authorRole: 'Director, Technology Assurance',
    photo: photos.dataCentre,
    topics: ['IS Audit', 'Banking', 'Controls'],
    access: 'open',
  },
  {
    slug: 'esg-assurance-readiness-east-africa',
    title: 'ESG assurance readiness in East Africa: a baseline study',
    type: 'Whitepaper',
    summary:
      'How prepared listed and large private institutions in the region are for assured sustainability disclosure, based on a survey of 120 reporting entities.',
    publishedAt: '2026-05-09',
    readingMinutes: 22,
    author: 'Fatuma Abdi',
    authorRole: 'Director, Sustainability',
    photo: photos.portraitYellow,
    topics: ['ESG', 'Reporting', 'Research'],
    access: 'open',
    pages: 46,
  },
  {
    slug: 'fraud-typologies-procurement',
    title: 'Procurement fraud typologies you can test for on full population',
    type: 'Commentary',
    summary:
      'Split awards, round-number bids and supplier-bank overlaps — three tests any internal audit function can run this quarter.',
    publishedAt: '2026-04-22',
    readingMinutes: 6,
    author: 'Samuel Otieno',
    authorRole: 'Partner, Assurance',
    photo: photos.nightWork,
    topics: ['Forensics', 'Procurement', 'Analytics'],
    access: 'open',
  },
  {
    slug: 'risk-appetite-statements',
    title: 'Risk appetite statements that survive contact with the business',
    type: 'Article',
    summary:
      'Most appetite statements are unusable because they are unmeasurable. A short guide to writing thresholds management can breach.',
    publishedAt: '2026-04-08',
    readingMinutes: 7,
    author: 'Dr. Amara Ochieng',
    authorRole: 'Managing Partner',
    photo: photos.strategyTable,
    topics: ['Risk', 'ERM', 'Governance'],
    access: 'open',
  },
  {
    slug: 'vat-refund-recovery-kenya',
    title: 'VAT refund recovery: where claims stall',
    type: 'Commentary',
    summary:
      'An analysis of stalled refund claims and the documentation gaps that cause the delay in the majority of cases.',
    publishedAt: '2026-03-19',
    readingMinutes: 5,
    author: 'Kwame Mensah',
    authorRole: 'Partner, Tax',
    photo: photos.analystLaptop,
    topics: ['Taxation', 'VAT'],
    access: 'open',
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
