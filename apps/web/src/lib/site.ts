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
    role: 'Head office & training centre',
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
        heading: 'The institution',
        links: [
          {
            label: 'Who we are',
            to: '/about',
            description: 'Mandate, history and reach',
          },
          {
            label: 'Leadership & faculty',
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
        heading: 'Working with us',
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
            label: 'Verify a certificate',
            to: '/verify',
            description: 'Check a credential is genuine',
          },
        ],
      },
    ],
  },
  {
    label: 'Advisory',
    to: '/services',
    // Profile v3 §2 pillars, in the profile's own order. No feature panel here:
    // nine practices across four columns already fill the panel, and the header
    // carries the advisory CTA anyway.
    columns: [
      {
        heading: 'Strategy & Advisory',
        links: [
          { label: 'Business Advisory', to: '/services/business-advisory' },
        ],
      },
      {
        heading: 'Financial Leadership',
        links: [
          { label: 'Tax Advisory', to: '/services/tax-advisory' },
          {
            label: 'Internal Audit & Risk',
            to: '/services/internal-audit-risk',
          },
          { label: 'Financial Advisory', to: '/services/financial-advisory' },
        ],
      },
      {
        heading: 'Governance, Risk & Digital',
        links: [
          {
            label: 'Governance, Risk & Compliance',
            to: '/services/governance-risk-compliance',
          },
          {
            label: 'Information Systems Audit',
            to: '/services/information-systems-audit',
          },
          {
            label: 'Cryptocurrency Compliance',
            to: '/services/cryptocurrency-compliance',
          },
          {
            label: 'Forensic Advisory',
            to: '/services/forensic-advisory',
          },
        ],
      },
      {
        heading: 'Human Capital & Talent',
        links: [
          { label: 'Human Capital & Talent', to: '/services/human-capital' },
        ],
      },
    ],
  },
  {
    label: 'Capacity Building',
    to: '/capacity-building',
    columns: [
      {
        heading: 'Programmes',
        links: [
          {
            label: 'Corporate training',
            to: '/capacity-building#corporate',
            description: 'Cohort programmes for teams',
          },
          {
            label: 'Executive masterclasses',
            to: '/capacity-building#masterclasses',
            description: 'Board and C-suite intensives',
          },
          {
            label: 'Course catalog',
            to: '/capacity-building/courses',
            description: 'Self-paced and blended e-learning',
          },
        ],
      },
      {
        heading: 'Build your own',
        links: [
          {
            label: 'Custom programme builder',
            to: '/capacity-building/builder',
            description: 'Assemble modules, get a quote',
          },
          {
            label: 'Request corporate training',
            to: '/capacity-building/corporate-request',
            description: 'Headcount, modules, delivery',
          },
          {
            label: 'Training taxonomy',
            to: '/capacity-building#taxonomy',
            description: 'All 16 focus areas',
          },
        ],
      },
    ],
    feature: {
      eyebrow: 'For HR & L&D',
      title: 'Pro-forma invoice in one step',
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
      { label: 'Business Advisory', to: '/services/business-advisory' },
      { label: 'Financial Advisory', to: '/services/financial-advisory' },
      { label: 'Tax Advisory', to: '/services/tax-advisory' },
      { label: 'Internal Audit & Risk', to: '/services/internal-audit-risk' },
      {
        label: 'Governance, Risk & Compliance',
        to: '/services/governance-risk-compliance',
      },
      {
        label: 'Information Systems Audit',
        to: '/services/information-systems-audit',
      },
      {
        label: 'Cryptocurrency Compliance',
        to: '/services/cryptocurrency-compliance',
      },
      { label: 'Forensic Advisory', to: '/services/forensic-advisory' },
      { label: 'Human Capital & Talent', to: '/services/human-capital' },
    ],
  },
  {
    heading: 'Capacity building',
    links: [
      { label: 'Course catalog', to: '/capacity-building/courses' },
      { label: 'Corporate training', to: '/capacity-building#corporate' },
      {
        label: 'Executive masterclasses',
        to: '/capacity-building#masterclasses',
      },
      { label: 'Custom programme builder', to: '/capacity-building/builder' },
      { label: 'Events & workshops', to: '/events' },
    ],
  },
  {
    heading: 'Institution',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Leadership & faculty', to: '/about#leadership' },
      { label: 'Governance', to: '/about#governance' },
      { label: 'Accreditation', to: '/about#accreditation' },
      { label: 'Careers', to: '/about#careers' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Insights & research', to: '/resources' },
      { label: 'Whitepapers', to: '/resources?type=whitepaper' },
      { label: 'Gallery', to: '/resources#gallery' },
      { label: 'FAQs', to: '/resources#faq' },
      { label: 'Verify a certificate', to: '/verify' },
    ],
  },
]
