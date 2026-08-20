/**
 * Site-wide configuration: identity, navigation and contact points.
 *
 * Identity, contact points and the office record come from the client's
 * Company Profile v3, which supersedes the placeholders previously carried
 * here. Values still not covered by that document are marked PLACEHOLDER and
 * are collected in this module rather than scattered through the components,
 * so they can be replaced in one pass — and later swapped for CMS reads
 * without touching the presentation layer (CMS-01).
 */

export const site = {
  name: 'CaliberCode',
  legalName: 'CaliberCode Limited',
  tagline: 'Develop. Comply. Elevate.',
  description:
    'CaliberCode Limited is a NITA-accredited corporate advisory, governance and executive training firm serving boards, C-suite executives, SMEs and institutions across East Africa.',
  url: 'https://calibercode.io',
  locale: 'en_KE',

  contact: {
    // Profile v3 lists two executive lines, 0780333331 and 0733313314, in
    // local format. Stored in E.164 for tel: and wa.me, formatted for display.
    whatsapp: '254780333331',
    phone: '+254 780 333331',
    altPhone: '+254 733 313314',
    email: 'info@calibercode.io',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/calibercode',
    x: 'https://x.com/calibercode',
    youtube: 'https://www.youtube.com/@calibercode',
  },
} as const

/** CONTACT-01: regional office locations. */
export type Office = {
  city: string
  country: string
  role: string
  lines: Array<string>
  phone: string
  /** CONTACT-03: query used for the embedded map. */
  mapQuery: string
  headquarters?: boolean
}

/**
 * Profile v3 records one office. The Kampala, Dar es Salaam and Kigali entries
 * previously here were placeholders carrying invented street addresses and
 * +XXX 700 000 000 phone numbers; the profile does not support them, so they
 * are gone. The region is still served — see `markets` — it is just served
 * from Nairobi until the client supplies further locations.
 */
export const offices: Array<Office> = [
  {
    city: 'Nairobi',
    country: 'Kenya',
    role: 'Head Office & Training Centre',
    lines: [
      'Jubilee Insurance Centre, 1st Floor',
      '113 Wabera Street',
      'Nairobi, Kenya',
    ],
    phone: '+254 780 333331',
    mapQuery: 'Jubilee Insurance Centre Wabera Street Nairobi Kenya',
    headquarters: true,
  },
]

/** GOAL-04: markets the institution serves. */
export const markets = [
  'Kenya',
  'Uganda',
  'Tanzania',
  'Rwanda',
  'Ethiopia',
] as const

// -- Navigation (§4.1) -------------------------------------------------------

export type NavLink = {
  label: string
  to: string
  description?: string
}

export type NavSection = {
  label: string
  to: string
  /** Rendered as a mega-menu when present. */
  columns?: Array<{
    heading: string
    links: Array<NavLink>
  }>
  /** Promoted panel inside the mega-menu. */
  feature?: {
    eyebrow: string
    title: string
    body: string
    to: string
    cta: string
  }
}

export const primaryNav: Array<NavSection> = [
  {
    label: 'About',
    to: '/about',
    columns: [
      {
        heading: 'The Institution',
        links: [
          {
            label: 'Who We Are',
            to: '/about',
            description: 'Mandate, history and reach',
          },
          {
            label: 'Leadership & Faculty',
            to: '/about#leadership',
            description: 'Partners and senior practitioners',
          },
          {
            label: 'Governance',
            to: '/about#governance',
            description: 'How the institute is directed',
          },
          {
            label: 'Accreditation',
            to: '/about#accreditation',
            description: 'Recognition and standing',
          },
        ],
      },
      {
        heading: 'Working With Us',
        links: [
          {
            label: 'Careers',
            to: '/about#careers',
            description: 'Open roles and faculty panel',
          },
          {
            label: 'Contact',
            to: '/contact',
            description: 'Offices across the region',
          },
          {
            label: 'Verify A Certificate',
            to: '/verify',
            description: 'Check a credential is genuine',
          },
        ],
      },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    // The owner asked for advisory and capacity building under one popover.
    // They were two entries because the old structure had nine practices and
    // sixteen focus areas and neither fitted beside the other; the corporate
    // overview reduces both, so one panel now holds the whole offering —
    // three advisory practices, the training routes, and the two request
    // flows — which is also how the overview itself presents the firm.
    columns: [
      {
        heading: 'Advisory',
        links: [
          {
            label: 'Statutory & Tax Compliance',
            to: '/services/statutory-tax-compliance',
            description: 'KRA filings, payroll levies and eTIMS',
          },
          {
            label: 'Governance, Risk & Internal Audit',
            to: '/services/governance-risk-internal-audit',
            description: 'Board effectiveness, ERM and audit',
          },
          {
            label: 'Fraud, Financial Crime & Digital Assets',
            to: '/services/fraud-financial-crime-digital-assets',
            description: 'Anti-fraud, AML/CFT and data protection',
          },
          {
            label: 'All Advisory Practices',
            to: '/services',
            description: 'How each engagement runs',
          },
        ],
      },
      {
        heading: 'Executive Training',
        links: [
          {
            label: 'Corporate Training',
            to: '/capacity-building#corporate',
            description: 'In-house programmes for teams',
          },
          {
            label: 'Executive Masterclasses',
            to: '/capacity-building#masterclasses',
            description: 'Board and C-suite intensives',
          },
          {
            label: 'Course Catalog',
            to: '/capacity-building/courses',
            description: 'Self-paced, blended and live modules',
          },
          {
            label: 'Training Focus Areas',
            to: '/capacity-building#taxonomy',
            description: 'All five focus areas',
          },
        ],
      },
      {
        heading: 'Build Your Own',
        links: [
          {
            label: 'Custom Programme Builder',
            to: '/capacity-building/builder',
            description: 'Assemble modules, get a quote',
          },
          {
            label: 'Request Corporate Training',
            to: '/capacity-building/corporate-request',
            description: 'Headcount, modules, delivery',
          },
          {
            label: 'Book Advisory',
            to: '/contact?intent=advisory',
            description: 'Talk to a practice lead',
          },
        ],
      },
    ],
    feature: {
      eyebrow: 'For HR & L&D',
      title: 'Pro-Forma Invoice In One Step',
      body: 'Tell us your headcount, modules and delivery mode. The request returns a downloadable pro-forma invoice for your procurement cycle.',
      to: '/capacity-building/corporate-request',
      cta: 'Start a request',
    },
  },
  { label: 'Events', to: '/events' },
  { label: 'Insights', to: '/resources' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav: Array<{ heading: string; links: Array<NavLink> }> = [
  {
    heading: 'Advisory',
    links: [
      {
        label: 'Statutory & Tax Compliance',
        to: '/services/statutory-tax-compliance',
      },
      {
        label: 'Governance, Risk & Internal Audit',
        to: '/services/governance-risk-internal-audit',
      },
      {
        label: 'Fraud, Financial Crime & Digital Assets',
        to: '/services/fraud-financial-crime-digital-assets',
      },
      { label: 'All Advisory Practices', to: '/services' },
    ],
  },
  {
    heading: 'Capacity Building',
    links: [
      { label: 'Course Catalog', to: '/capacity-building/courses' },
      { label: 'Corporate Training', to: '/capacity-building#corporate' },
      {
        label: 'Executive Masterclasses',
        to: '/capacity-building#masterclasses',
      },
      { label: 'Custom Programme Builder', to: '/capacity-building/builder' },
      { label: 'Events & Workshops', to: '/events' },
    ],
  },
  {
    heading: 'Institution',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Leadership & Faculty', to: '/about#leadership' },
      { label: 'Governance', to: '/about#governance' },
      { label: 'Accreditation', to: '/about#accreditation' },
      { label: 'Careers', to: '/about#careers' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Insights & Research', to: '/resources' },
      { label: 'Whitepapers', to: '/resources?type=whitepaper' },
      { label: 'Gallery', to: '/resources#gallery' },
      { label: 'FAQs', to: '/resources#faq' },
      { label: 'Verify A Certificate', to: '/verify' },
    ],
  },
]
