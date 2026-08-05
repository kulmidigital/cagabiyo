/**
 * Institutional content: metrics, leadership, governance, accreditation,
 * careers, testimonials, gallery and FAQs (§4.3, §4.7, §5.2).
 *
 * Named individuals, metric values and accreditation statuses are PLACEHOLDER
 * content standing in for §14 items that require sign-off and, in the case of
 * testimonials and portraits, publication permission before launch.
 */

import { photos } from '@/lib/images'
import type { Photo } from '@/lib/images'

// -- ABOUT-01: vision, mission, values (Profile v3 §2) -----------------------

export const institution = {
  vision:
    'To build resilient, compliant, and market-leading enterprises across East Africa.',
  mission:
    'Building resilient, fully compliant institutions through rigorous advisory and regulatory mastery.',
  values: ['Integrity', 'Excellence', 'Partnership', 'Innovation', 'Impact'],
  positioning:
    'Bridging the gap between complex regulatory mandates and high-yield commercial execution.',
} as const

// -- Who the practice serves (Profile v3 §5) ---------------------------------

export type Segment = {
  name: string
  detail: string
}

export const segments: Array<Segment> = [
  {
    name: 'Corporate boards & C-suite',
    detail:
      'Strategic direction, governance oversight and risk mitigation at the top of the organisation.',
  },
  {
    name: 'SMEs & growing enterprises',
    detail:
      'Scaling, professionalising operations and reaching the standard capital markets expect.',
  },
  {
    name: 'Financial institutions & fintechs',
    detail:
      'SACCOs, Tier-2 banks, microfinance institutions and digital asset platforms under regulatory scrutiny.',
  },
  {
    name: 'Public sector & state corporations',
    detail:
      'County governments, state entities and non-governmental organisations meeting statutory obligations.',
  },
]

/**
 * Profile v3 §5 — what an engagement is expected to change. Stated as the
 * client states them: capability delivered, not volume claimed.
 */
export const institutionalImpact: Array<Segment> = [
  {
    name: 'Actionable toolkits',
    detail:
      'Participants leave with templates, policies and analytical models ready to deploy.',
  },
  {
    name: 'Operational de-risking',
    detail:
      'Reduced exposure to tax penalties, fraud losses, cyber threats and regulatory sanction.',
  },
  {
    name: 'Future-proofed talent',
    detail:
      'A workforce able to handle e-invoicing, digital assets and the compliance load that comes with them.',
  },
]

// -- HOME-05: institutional metrics -------------------------------------------

export type Metric = {
  value: string
  /** Rendered small, after the value. */
  suffix?: string
  label: string
  detail: string
}

/**
 * HOME-05 asks for institutional impact metrics. Volumes of the "professionals
 * trained" kind need client-supplied evidence — §14 lists "institutional impact
 * metrics and their evidence/source" as content still to be approved — so none
 * are invented here.
 *
 * Every figure below is instead structural: four strategic pillars and nine
 * practices (Profile v3 §2), sixteen training focus areas (§8), five markets
 * (GOAL-04). Swap these for audited impact figures once the evidence exists.
 */
export const impactMetrics: Array<Metric> = [
  {
    value: '4',
    label: 'Strategic pillars',
    detail:
      'Strategy, financial leadership, governance and digital, human capital.',
  },
  {
    value: '9',
    label: 'Advisory practices',
    detail:
      'From tax and internal audit to forensics, digital assets and human capital.',
  },
  {
    value: '16',
    label: 'Training focus areas',
    detail: 'The taxonomy every course and custom programme is built from.',
  },
  {
    value: '5',
    label: 'Markets served',
    detail: 'Kenya, Uganda, Tanzania, Rwanda and Ethiopia.',
  },
]

// -- ABOUT-02: leadership & senior faculty -----------------------------------

/**
 * No portrait field. Attaching stock photography to a named individual
 * misrepresents a real person, so the roster stays typographic until genuine
 * photographs are supplied (§14).
 */
export type Person = {
  name: string
  role: string
  discipline: string
  bio: string
  credentials: Array<string>
}

export const leadership: Array<Person> = [
  {
    name: 'Dr. Amara Ochieng',
    role: 'Managing Partner',
    discipline: 'Governance, Risk & Compliance',
    bio: 'Twenty-two years across banking supervision and board advisory. Chairs the firm’s technical committee and leads board effectiveness engagements for listed and state-owned institutions.',
    credentials: ['PhD Finance', 'CPA(K)', 'Certified Director'],
  },
  {
    name: 'Samuel Otieno',
    role: 'Partner, Assurance',
    discipline: 'Internal Audit & Forensics',
    bio: 'Leads forensic investigations and internal audit transformation. Previously headed internal audit for a regional banking group operating in four markets.',
    credentials: ['CIA', 'CFE', 'CPA(K)'],
  },
  {
    name: 'Wanjiru Kamau',
    role: 'Partner, Financial Reporting',
    discipline: 'Accounting & IFRS',
    bio: 'Technical lead on IFRS and IPSAS transitions. Advises county governments and state corporations through accrual adoption and first-time reporting.',
    credentials: ['FCCA', 'CPA(K)', 'IPSAS Specialist'],
  },
  {
    name: 'Kwame Mensah',
    role: 'Partner, Tax',
    discipline: 'Taxation & Transfer Pricing',
    bio: 'Handles cross-border structuring and transfer pricing defence across the EAC. Represents clients through objection, ADR and appeal.',
    credentials: ['ADIT', 'CPA', 'LLM Tax'],
  },
  {
    name: 'Brian Kiptoo',
    role: 'Director, Technology Assurance',
    discipline: 'IS Audit & Cybersecurity',
    bio: 'Runs the firm’s IS audit practice, covering ITGC, ISO 27001 readiness and data protection controls for financial institutions.',
    credentials: ['CISA', 'CISM', 'ISO 27001 LA'],
  },
  {
    name: 'Grace Mutiso',
    role: 'Director, Executive Education',
    discipline: 'Leadership & Executive Strategy',
    bio: 'Designs the masterclass portfolio and leads negotiation and change programmes for C-suite cohorts across the region.',
    credentials: ['MBA', 'ICF PCC', 'Certified Director'],
  },
  {
    name: 'Fatuma Abdi',
    role: 'Director, Sustainability',
    discipline: 'Governance & ESG',
    bio: 'Leads ESG assurance readiness and sustainability reporting, with a focus on how disclosure obligations land on financial sector boards.',
    credentials: ['MSc Economics', 'GRI Certified', 'CFA'],
  },
  {
    name: 'David Njoroge',
    role: 'Director, Digital Assets',
    discipline: 'Cryptocurrency Compliance',
    bio: 'Builds AML/CFT programmes for virtual asset service providers and advises on licensing and supervisory engagement.',
    credentials: ['CAMS', 'CFE', 'MSc Fintech'],
  },
]

// -- ABOUT-03: governance model ----------------------------------------------

export type GovernanceOrgan = {
  name: string
  mandate: string
  composition: string
}

export const governanceModel: Array<GovernanceOrgan> = [
  {
    name: 'Board of Directors',
    mandate:
      'Sets institutional strategy, approves the annual plan and budget, and appoints the Managing Partner. Meets quarterly.',
    composition: 'Seven directors, four of whom are independent non-executive.',
  },
  {
    name: 'Academic & Technical Committee',
    mandate:
      'Approves curriculum, sets assessment standards and reviews every credential before it is issued. Owns the faculty admission criteria.',
    composition:
      'Chaired by the Managing Partner; six senior practitioners and two external academics.',
  },
  {
    name: 'Audit & Risk Committee',
    mandate:
      'Oversees internal control, the risk register, data protection compliance and the external audit relationship.',
    composition: 'Three independent non-executive directors.',
  },
  {
    name: 'Ethics & Quality Panel',
    mandate:
      'Handles independence conflicts, complaints and disciplinary matters affecting faculty or credential holders.',
    composition: 'Two independent directors and one external counsel.',
  },
]

// -- ABOUT-04: accreditation --------------------------------------------------

/**
 * Institutional accreditation.
 *
 * Profile v3 claims exactly one: NITA. The ICPAK, IIA and ISACA entries that
 * previously sat here asserted that the firm itself is accredited by those
 * bodies — a stronger claim than the client makes. Their marks are in
 * `public/orgs` because staff hold their certifications, which is a different
 * thing and is recorded in `practitionerCredentials` below.
 */
export type Accreditation = {
  body: string
  abbreviation: string
  scope: string
  /** What the accreditation is worth to a buyer. */
  benefit: string
  /** Supplied brand mark, served from `public/orgs`. */
  logo: string
}

export const accreditations: Array<Accreditation> = [
  {
    body: 'National Industrial Training Authority',
    abbreviation: 'NITA',
    scope: 'Corporate and professional training provision',
    benefit:
      'Training delivered under the accreditation is eligible for corporate training levy reimbursement.',
    logo: '/orgs/nita.png',
  },
]

/**
 * ABOUT-02 — what the people leading engagements hold.
 *
 * Profile v3 states engagements are led by credentialed specialists and lists
 * these qualifications. It attributes them to the practice as a whole, not to
 * named individuals, so they are recorded the same way here.
 */
export type Credential = {
  abbreviation: string
  name: string
  discipline: string
}

export const practitionerCredentials: Array<Credential> = [
  {
    abbreviation: 'CPA',
    name: 'Certified Public Accountant',
    discipline: 'Accounting & reporting',
  },
  {
    abbreviation: 'CFE',
    name: 'Certified Fraud Examiner',
    discipline: 'Forensics & fraud',
  },
  {
    abbreviation: 'CISA',
    name: 'Certified Information Systems Auditor',
    discipline: 'IS audit & cybersecurity',
  },
  {
    abbreviation: 'CIA',
    name: 'Certified Internal Auditor',
    discipline: 'Internal audit',
  },
  {
    abbreviation: 'CRMA',
    name: 'Certification in Risk Management Assurance',
    discipline: 'Risk assurance',
  },
  {
    abbreviation: 'CCCS',
    name: 'Certified Cryptocurrency Compliance Specialist',
    discipline: 'Digital assets',
  },
  {
    abbreviation: 'ACAMS',
    name: 'Certified Anti-Money Laundering Specialist',
    discipline: 'AML/CFT',
  },
  {
    abbreviation: 'MSc / MBA / LLM',
    name: 'Advanced degrees in tax, business and law',
    discipline: 'Advisory leadership',
  },
]

// -- ABOUT-05: careers --------------------------------------------------------

export type Vacancy = {
  title: string
  team: string
  location: string
  type: 'Full time' | 'Contract' | 'Faculty panel'
}

export const vacancies: Array<Vacancy> = [
  {
    title: 'Senior Manager, Internal Audit',
    team: 'Assurance',
    location: 'Nairobi',
    type: 'Full time',
  },
  {
    title: 'Tax Manager — Transfer Pricing',
    team: 'Tax',
    location: 'Nairobi',
    type: 'Full time',
  },
  {
    title: 'IS Audit Associate',
    team: 'Technology Assurance',
    location: 'Nairobi',
    type: 'Full time',
  },
  {
    title: 'Programme Coordinator, Executive Education',
    team: 'Capacity Building',
    location: 'Kampala',
    type: 'Full time',
  },
  {
    title: 'Instructional Designer (E-learning)',
    team: 'Capacity Building',
    location: 'Remote — East Africa',
    type: 'Contract',
  },
  {
    title: 'Associate Faculty — Governance & ESG',
    team: 'Faculty',
    location: 'Regional',
    type: 'Faculty panel',
  },
]

// -- PROOF-01/02/03: testimonials ---------------------------------------------

export type Testimonial = {
  quote: string
  name: string
  role: string
  organisation: string
  photo: Photo
  /** PROOF-02 — video testimonials carry a poster and a source. */
  video?: {
    poster: Photo
    /** PLACEHOLDER — final asset URL supplied with §14 content. */
    src: string
    /**
     * WebVTT captions. Required alongside `src`, not optional: A11Y-06 puts
     * captions on any meaningful video, so a clip without them is not ready to
     * publish.
     */
    captions: string
    durationLabel: string
  }
  audience: 'Executive' | 'Board' | 'Corporate HR' | 'Individual'
}

export const testimonials: Array<Testimonial> = [
  {
    quote:
      'The board effectiveness review was uncomfortable in exactly the way it needed to be. Six months on, our papers are shorter and our meetings decide things.',
    name: 'Njeri Waithaka',
    role: 'Board Chair',
    organisation: 'Regional insurance group',
    photo: photos.portraitStudio,
    audience: 'Board',
  },
  {
    quote:
      'We put 140 staff through the risk-based audit programme across three markets. The cohort reporting meant I could see completion by country without chasing anyone.',
    name: 'Peter Wanyama',
    role: 'Head of Learning & Development',
    organisation: 'Pan-African bank',
    photo: photos.execSuitC,
    audience: 'Corporate HR',
    video: {
      poster: photos.boardroomBrief,
      src: '', // PLACEHOLDER — video asset pending §14 sign-off
      captions: '', // PLACEHOLDER — WebVTT track supplied with the clip
      durationLabel: '2:14',
    },
  },
  {
    quote:
      'Their transfer pricing file held up at objection without a single amendment. That is the whole review, in one sentence.',
    name: 'Aisha Hassan',
    role: 'Group Finance Director',
    organisation: 'Manufacturing group',
    photo: photos.portraitCityWindow,
    audience: 'Executive',
  },
  {
    quote:
      'I took the IS Audit certificate part-time while working. The QR credential went straight onto my LinkedIn and two recruiters mentioned it in the same month.',
    name: 'Collins Barasa',
    role: 'Senior IT Auditor',
    organisation: 'Telecommunications operator',
    photo: photos.execSuitB,
    audience: 'Individual',
  },
  {
    quote:
      'The faculty were practitioners. Every question got an answer from someone who had defended the position themselves.',
    name: 'Mercy Adhiambo',
    role: 'Chief Risk Officer',
    organisation: 'Development finance institution',
    photo: photos.portraitPink,
    audience: 'Executive',
  },
  {
    quote:
      'We needed a custom programme across procurement, ethics and IPSAS for 60 county staff. The quote came back within the week, and delivery matched it.',
    name: 'Joseph Kilonzo',
    role: 'County Executive, Finance',
    organisation: 'County government',
    photo: photos.execSuitD,
    audience: 'Corporate HR',
    video: {
      poster: photos.workshopRoom,
      src: '', // PLACEHOLDER — video asset pending §14 sign-off
      captions: '', // PLACEHOLDER — WebVTT track supplied with the clip
      durationLabel: '1:47',
    },
  },
]

// -- RES-03/04: gallery --------------------------------------------------------

export type GalleryItem = {
  photo: Photo
  caption: string
  category: 'Masterclasses' | 'Graduations' | 'Board retreats' | 'Forums'
  /** RES-03 — the gallery mixes stills and video. */
  media: 'image' | 'video'
  durationLabel?: string
}

export const galleryItems: Array<GalleryItem> = [
  {
    photo: photos.graduatesCelebrate,
    caption: 'Certification ceremony, Nairobi',
    category: 'Graduations',
    media: 'image',
  },
  {
    photo: photos.boardroomWide,
    caption: 'Board risk oversight retreat, Nanyuki',
    category: 'Board retreats',
    media: 'image',
  },
  {
    photo: photos.auditorium,
    caption: 'East Africa Compliance Forum keynote',
    category: 'Forums',
    media: 'video',
    durationLabel: '3:22',
  },
  {
    photo: photos.graduatesPair,
    caption: 'Executive Certificate cohort, class of 2026',
    category: 'Graduations',
    media: 'image',
  },
  {
    photo: photos.workshopRoom,
    caption: 'IPSAS transition workshop, Nairobi',
    category: 'Masterclasses',
    media: 'image',
  },
  {
    photo: photos.conferenceHall,
    caption: 'Digital Asset Compliance Forum, Upper Hill',
    category: 'Forums',
    media: 'image',
  },
  {
    photo: photos.graduateSmile,
    caption: 'Credential award, October cohort',
    category: 'Graduations',
    media: 'image',
  },
  {
    photo: photos.strategyTable,
    caption: 'Audit committee masterclass',
    category: 'Masterclasses',
    media: 'video',
    durationLabel: '2:05',
  },
  {
    photo: photos.graduationMass,
    caption: 'Annual graduation, Kenyatta International Convention Centre',
    category: 'Graduations',
    media: 'image',
  },
  {
    photo: photos.keynote,
    caption: 'Policy roundtable, Kampala',
    category: 'Forums',
    media: 'image',
  },
  {
    photo: photos.teamCouch,
    caption: 'Corporate cohort onboarding',
    category: 'Masterclasses',
    media: 'image',
  },
  {
    photo: photos.graduatesTwo,
    caption: 'Faculty and graduand, Nairobi',
    category: 'Graduations',
    media: 'image',
  },
]

export const galleryCategories = [
  'Masterclasses',
  'Graduations',
  'Board retreats',
  'Forums',
] as const

// -- RES-05/06: FAQs -----------------------------------------------------------

export type FaqCategory = {
  category: string
  items: Array<{ question: string; answer: string }>
}

export const faqs: Array<FaqCategory> = [
  {
    category: 'Accreditation & credentials',
    items: [
      {
        question: 'Are CaliberCode programmes accredited?',
        answer:
          'CaliberCode is a registered training provider and an approved CPD/CPE provider with the professional bodies listed on our About page. Each course page states the specific recognition that applies to it and the CPD hours it carries. Accreditation references shown on this site are being confirmed ahead of launch.',
      },
      {
        question: 'What credential do I receive on completion?',
        answer:
          'Every completed programme issues a digital certificate carrying a unique certificate identifier and a QR code. Scanning the code, or entering the identifier at our verification page, confirms the credential is genuine. Certificates can be added to a LinkedIn profile in one click.',
      },
      {
        question: 'Can an employer verify a certificate independently?',
        answer:
          'Yes. Every certificate resolves to a public verification page at calibercode.io/verify. No account is needed, and the page states clearly whether the identifier is valid, invalid or not found. Only the fields approved for public display are shown.',
      },
      {
        question: 'Do the programmes carry CPD or CPE hours?',
        answer:
          'Programmes recognised by ICPAK, IIA Kenya and ISACA carry CPD or CPE hours, stated on each course page. Hours are reported on your completion certificate.',
      },
    ],
  },
  {
    category: 'Booking & delivery',
    items: [
      {
        question: 'How do I reserve a seat at a workshop or masterclass?',
        answer:
          'Choose a date from the events calendar, confirm the seats you need, and pay by M-Pesa or card. Your seat is confirmed the moment payment is verified, and a QR-coded entry ticket is emailed to you immediately.',
      },
      {
        question: 'Can we run a programme in-house for our team?',
        answer:
          'Yes. Corporate training can be delivered on-site at your premises, virtually, or off-site at a venue we arrange. Submit a corporate training request with your headcount and preferred modules and you will receive a downloadable pro-forma invoice.',
      },
      {
        question:
          'Can we build a programme from modules across different areas?',
        answer:
          'Yes — the custom programme builder lets you assemble modules from any of the sixteen training focus areas and submit the selection for a custom quote. This is how most SME and government programmes are scoped.',
      },
      {
        question: 'What happens if I cannot attend after booking?',
        answer:
          'Transfer and cancellation terms are confirmed at checkout and on your booking confirmation. Please contact the training team as early as possible so a substitution or transfer to a later cohort can be arranged.',
      },
    ],
  },
  {
    category: 'Payment & invoicing',
    items: [
      {
        question: 'Which payment methods are accepted?',
        answer:
          'M-Pesa via STK push, Visa and Mastercard credit or debit cards, and bank transfer including RTGS and EFT for institutional settlement.',
      },
      {
        question: 'Which currencies can I pay in?',
        answer:
          'Kenya Shillings and US Dollars are supported at launch. Course and event prices are shown in both. Support for UGX, TZS and RWF settlement is planned as the regional roll-out progresses.',
      },
      {
        question: 'Can we pay by invoice rather than card?',
        answer:
          'Yes. Institutional buyers receive an official pro-forma invoice carrying a unique bank reference code. Quote that reference on the transfer and the booking is reconciled and confirmed automatically.',
      },
      {
        question: 'When do I receive a receipt?',
        answer:
          'A receipt is emailed as soon as payment is verified, together with your enrolment confirmation or QR-coded event ticket.',
      },
    ],
  },
]
