/**
 * Site-wide configuration: identity, navigation and contact points.
 *
 * Values marked PLACEHOLDER are stand-ins for content listed in §14 of the
 * requirements ("Content inventory required before launch") that has not been
 * supplied yet. They are collected here rather than scattered through the
 * components so they can be replaced in one pass — and later swapped for CMS
 * reads without touching the presentation layer (CMS-01).
 */

export const site = {
  name: 'CaliberCode',
  legalName: 'CaliberCode Limited',
  tagline: 'Advisory and professional training across East Africa.',
  description:
    'CaliberCode provides advisory services and professional training across tax, audit, governance, risk, compliance and digital assets in Kenya and East Africa.',
  url: 'https://calibercode.co.ke', // PLACEHOLDER — confirm production domain
  locale: 'en_KE',

  contact: {
    whatsapp: '254722603130',
    phone: '+254 722 603130',
    email: 'info@calibercode.co.ke',
    advisoryEmail: 'advisory@calibercode.co.ke',
    trainingEmail: 'training@calibercode.co.ke',
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

export const offices: Array<Office> = [
  {
    city: 'Nairobi',
    country: 'Kenya',
    role: 'Group headquarters & training centre',
    lines: ['Delta Corner, Ring Road Westlands', 'PO Box 00100, Nairobi'],
    phone: '+254 722 603130',
    mapQuery: 'Delta Corner Westlands Nairobi Kenya',
    headquarters: true,
  },
  {
    city: 'Kampala',
    country: 'Uganda',
    role: 'Advisory & corporate training',
    lines: ['Rwenzori Towers, Nakasero', 'Kampala'],
    phone: '+256 700 000 000',
    mapQuery: 'Rwenzori Towers Nakasero Kampala Uganda',
  },
  {
    city: 'Dar es Salaam',
    country: 'Tanzania',
    role: 'Advisory & corporate training',
    lines: ['Msasani Peninsula', 'Dar es Salaam'],
    phone: '+255 700 000 000',
    mapQuery: 'Msasani Peninsula Dar es Salaam Tanzania',
  },
  {
    city: 'Kigali',
    country: 'Rwanda',
    role: 'Regional liaison',
    lines: ['Kigali Heights, KG 7 Ave', 'Kigali'],
    phone: '+250 700 000 000',
    mapQuery: 'Kigali Heights KG 7 Ave Kigali Rwanda',
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
    columns: [
      {
        heading: 'Assurance & risk',
        links: [
          {
            label: 'Internal Audit & Risk',
            to: '/services/internal-audit-risk',
          },
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
        ],
      },
      {
        heading: 'Finance & strategy',
        links: [
          { label: 'Business Advisory', to: '/services/business-advisory' },
          { label: 'Financial Advisory', to: '/services/financial-advisory' },
          { label: 'Tax Advisory', to: '/services/tax-advisory' },
          { label: 'Policy Research', to: '/services/policy-research' },
        ],
      },
    ],
    feature: {
      eyebrow: 'Executive advisory',
      title: 'Book a partner-led session',
      body: 'Board retreats, tax strategy reviews and compliance readiness — scheduled directly with the partner who will lead the work.',
      to: '/contact?intent=advisory',
      cta: 'Request a session',
    },
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
      { label: 'Policy Research', to: '/services/policy-research' },
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
