/**
 * Institutional content: metrics, leadership, governance, accreditation,
 * careers, testimonials, gallery and FAQs (§4.3, §4.7, §5.2).
 *
 * The leadership roster and its headshots are real, supplied by the client.
 * Testimonials and their portraits remain PLACEHOLDER, standing in for §14
 * items that need sign-off and publication permission before launch.
 */

import { photos } from '@/lib/images'
import type { Photo } from '@/lib/images'

// -- ABOUT-01: vision, mission, values ---------------------------------------

/**
 * Verbatim from the client's corporate overview.
 *
 * This supersedes the Profile v3 wording carried here before, which paraphrased
 * the vision ("to build" for "to architect"), stated a different mission
 * entirely, shortened two of the five values to "Partnership" and "Impact", and
 * added a `positioning` line the client does not use. Treat the overview as the
 * source: do not re-word these to fit a layout.
 */
export const institution = {
  overview:
    'CaliberCode is East Africa’s premier corporate advisory, governance, and executive training firm. We provide ROI-focused solutions that optimize workforce efficiency, streamline operations, and embed compliance. By integrating governance, risk, audit, fraud prevention, and tax services, we empower organizations to operate with complete confidence, resilience, and performance.',
  vision:
    'To architect resilient, compliant & market-leading enterprises across East Africa.',
  mission:
    'Driving organizational excellence through ROI-focused advisory, seamless operations, and embedded compliance.',
  commitment:
    'We believe sustainable organizational performance is built on competence, sound governance, effective internal controls, regulatory discipline, and continuous capability enhancement. Our commitment is to provide professional, practical, and value-driven solutions that empower clients to make informed decisions and operate with total market confidence.',
} as const

/** "Core Values Defined" — the name and its stated definition. */
export type CoreValue = {
  name: string
  detail: string
}

export const coreValues: Array<CoreValue> = [
  {
    name: 'Integrity',
    detail: 'Uncompromising ethical leadership and transparent governance.',
  },
  {
    name: 'Excellence',
    detail:
      'High-precision corporate solutions engineered for peak performance.',
  },
  {
    name: 'Strategic Partnership',
    detail:
      'Strategic collaboration with leaders to ensure sustainable growth.',
  },
  {
    name: 'Innovation',
    detail:
      'Modern frameworks bridging risk, tax, cybersecurity, and digital assets.',
  },
  {
    name: 'Measurable Impact',
    detail:
      'Actionable insights that yield measurable ROI and lasting resilience.',
  },
]

// -- Who the practice serves -------------------------------------------------

export type Segment = {
  name: string
  detail: string
}

export const segments: Array<Segment> = [
  {
    name: 'Enterprises & SMEs',
    detail:
      'Growing organizations seeking operational efficiency, structured processes, and strict regulatory alignment.',
  },
  {
    name: 'Leadership & Boards',
    detail:
      'Directors, executive teams, and senior managers navigating complex corporate governance and fiduciary duties.',
  },
  {
    name: 'Entrepreneurs & Professionals',
    detail:
      'Forward-thinking business leaders and professionals building scalable, compliant, and resilient corporate structures.',
  },
]

/**
 * "Why CaliberCode?" — the stated proposition, one entry per bullet.
 *
 * This replaces `institutionalImpact`, which carried three outcome claims the
 * corporate overview does not make.
 */
export const whyCaliberCode: Array<Segment> = [
  {
    name: 'Accredited & Recognized',
    detail:
      'Fully NITA-accredited corporate training provider and official KRA Ushuru Mashinani Partner.',
  },
  {
    name: 'Practical & Business-Focused',
    detail:
      'We focus exclusively on actionable solutions that are applied, measured, and sustained in real organizations.',
  },
  {
    name: 'Expert-Led Insights',
    detail:
      'Our work draws on deep domain expertise across finance, taxation, audit, fraud, risk, governance, and digital assets.',
  },
  {
    name: 'Compliance-Focused Discipline',
    detail:
      'We help clients build long-term compliance discipline and maintain audit-ready documentation.',
  },
  {
    name: 'Tailored Programs',
    detail:
      'Solutions are tailored to specific regulatory environments, industry dynamics, and capability gaps.',
  },
  {
    name: 'Integrated Approach',
    detail:
      'We connect people, processes, controls, compliance, and strategic performance seamlessly.',
  },
]

/** "How We Deliver" — the five delivery vehicles the overview lists. */
export const deliveryMethods: Array<Segment> = [
  {
    name: 'In-House Corporate Training',
    detail:
      'Customized, on-site programs built specifically around your organizational needs and corporate culture.',
  },
  {
    name: 'Executive Masterclasses',
    detail:
      'High-impact, focused learning modules for senior leaders, boards, C-suite executives, and professionals.',
  },
  {
    name: 'Board & Leadership Retreats',
    detail:
      'Facilitated strategic retreats focused on corporate direction, governance oversight, and leadership alignment.',
  },
  {
    name: 'Virtual & Hybrid Training',
    detail:
      'Flexible, interactive digital delivery tailored for distributed and geographically diverse teams.',
  },
  {
    name: 'Compliance Support & Advisory',
    detail:
      'Direct execution support for statutory obligations, compliance reviews, tax filings, and documentation.',
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
 * Every figure below is instead structural: three advisory practices and five
 * training focus areas (both from the corporate overview), the accreditations
 * the firm holds, and five markets (GOAL-04). Swap these for audited impact
 * figures once the evidence exists.
 */
export const impactMetrics: Array<Metric> = [
  {
    value: '3',
    label: 'Advisory Practices',
    detail:
      'Statutory and tax compliance, governance and internal audit, fraud and financial crime.',
  },
  {
    value: '5',
    label: 'Training Focus Areas',
    detail: 'The taxonomy every course and custom programme is built from.',
  },
  {
    value: '2',
    label: 'Accreditations Held',
    detail:
      'NITA accredited institution and KRA Ushuru Mashinani service partner.',
  },
  {
    value: '5',
    label: 'Markets Served',
    detail: 'Kenya, Uganda, Tanzania, Rwanda and Ethiopia.',
  },
]

// -- ABOUT-02: leadership & team ---------------------------------------------

/**
 * The real team, replacing the eight invented partners this module used to
 * carry.
 *
 * The note that used to sit here said there was no portrait field, because
 * attaching stock photography to a named individual misrepresents a real
 * person. The client has now supplied genuine headshots in `public/staff`, so
 * the field exists — but it stays optional and the roster still renders
 * without one. Never point it at stock.
 */
export type Person = {
  name: string
  role: string
  /** Paragraphs. Only the Managing Director runs to more than one. */
  bio: Array<string>
  credentials: Array<string>
  /** Supplied headshot in `public/staff`. Absent for anyone who has not sent one. */
  photo?: string
  /** Leads the section in a feature card rather than the roster grid. */
  lead?: boolean
}

export const leadership: Array<Person> = [
  {
    name: 'Mohamed Ahmed',
    role: 'Managing Director',
    photo: '/staff/mohamed.jpg',
    lead: true,
    credentials: [
      'MSc Tax',
      'MBA Finance',
      'BSc Finance',
      'CIA',
      'CFE',
      'CRMA',
      'CISA',
      'CCCS',
    ],
    bio: [
      'Mohamed is an accomplished finance, risk management and governance executive who serves as a strategic advisor to organizations navigating rapidly evolving global markets and regulatory environments. Built on a foundation of multidisciplinary expertise, his career encompasses business advisory, internal audit, tax administration, information systems auditing, enterprise risk management and financial crime prevention.',
      'He holds a Master of Science in Tax & Customs Administration from Moi University, in collaboration with the Kenya School of Revenue Administration (KESRA/KRA); a Master of Business Administration in Finance; and a Bachelor of Science in Finance specialising in Investment Management from United States International University–Africa (USIU-A). That academic depth lets him address systemic organizational challenges with both macroeconomic perspective and fine-grained financial precision.',
      'He is a Certified Internal Auditor (CIA) and holds the Certification in Risk Management Assurance (CRMA) from the Institute of Internal Auditors (IIA, USA). His expertise in IT governance and data integrity is validated by his status as a Certified Information Systems Auditor (CISA) through ISACA (USA), and his domain leadership in white-collar crime mitigation is anchored by his designation as a Certified Fraud Examiner (CFE) through the Association of Certified Fraud Examiners (USA). Anticipating the intersection of technology and modern finance, he also earned the Certified Cryptocurrency Compliance Specialist (CCCS) credential from the A&D Forensic Institute (Kenya). He is additionally an Associate Member of CPA (KASNEB), Kenya.',
      'Throughout his professional journey Mohamed has guided boardrooms and senior leadership teams in fortifying corporate governance structures, executing complex financial projects and establishing resilient internal control systems. His integrated approach combines technical rigour in taxation and financial reporting with forward-looking risk mitigation, covering both traditional operational risks and decentralized digital asset ecosystems. By aligning regulatory compliance with underlying business objectives, he transforms governance from a reactive audit exercise into a proactive mechanism for sustainable expansion, capital preservation and institutional resilience.',
    ],
  },
  {
    name: 'Shamsa Haji',
    role: 'Lead Consultant',
    photo: '/staff/shamsa.jpg',
    credentials: ['CPA(K)', 'BCom candidate'],
    bio: [
      'Shamsa is a Certified Public Accountant (CPA-K) and a BCom candidate at Mount Kenya University. She leads client financial management, specializing in KRA eTIMS administration, tax return filing, regulatory compliance, financial reporting and audit preparation — delivering precise financial oversight and accounting solutions that drive informed business strategy.',
    ],
  },
  {
    name: 'Sharon Mwaura',
    role: 'Lead Consultant',
    photo: '/staff/sharon.jpg',
    credentials: ['BCom Finance', 'CPA Finalist'],
    bio: [
      'Sharon combines financial expertise with administrative leadership. Holding a BCom in Finance from Mount Kenya University and completing her CPA, she drives client success through precise financial reporting, tax compliance, invoicing and strategic administrative oversight.',
    ],
  },
  {
    name: 'Jane Nzyoka',
    role: 'Business Consultant & Marketing Strategic Manager',
    photo: '/staff/jane.jpg',
    credentials: ['BCom', 'CPA (in progress)'],
    bio: [
      'Jane is a dynamic, data-driven strategist operating at the intersection of financial control and commercial growth. Holding a Bachelor of Commerce from Kisii University and advancing through her CPA qualification, she manages client portfolios across tax compliance pipelines — and uses those financial insights to orchestrate targeted marketing strategies that expand CaliberCode’s digital accounting and tax advisory services across Kenyan SMEs.',
    ],
  },
  {
    name: 'Christine Kinya Gikunda',
    role: 'HR Consultant & Professional Trainer',
    credentials: ['MSc HRM', 'CHRC', 'CPT', 'CPM', 'BCom'],
    bio: [
      'Christine is a results-driven HR consultant, professional trainer and certified mediator with over 25 years in human resource management, organizational development and workforce capacity building. Holding an MSc in Human Resource Management from the University of Nairobi alongside credentials as a Certified HR Consultant (CHRC), Certified Professional Trainer (CPT) and Certified Professional Mediator (CPM), she specializes in HR policy development, leadership training, and aligning workforce management with corporate strategy and compliance. She is an active member of KIHRM and ICPM.',
    ],
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
    name: 'Board Of Directors',
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
 * The corporate overview claims exactly two standings, and they are not the
 * same kind of thing — see `standing`. The ICPAK, IIA and ISACA entries that
 * once sat here asserted that the firm itself is accredited by those bodies, a
 * stronger claim than the client makes. Their marks remain in `public/orgs`
 * because staff hold those certifications, which is recorded in
 * `practitionerCredentials` below instead.
 */
export type Accreditation = {
  body: string
  abbreviation: string
  /**
   * What the standing actually is. NITA accredits; KRA appoints a service
   * partner — calling both "accredited" would overstate the second.
   */
  standing: string
  scope: string
  /** What the accreditation is worth to a buyer. */
  benefit: string
  /**
   * Supplied brand mark, served from `public/orgs`.
   *
   * Optional: the client claims the KRA partnership but has not supplied a
   * mark for it, and rendering a broken image is worse than rendering none.
   * Consumers fall back to the abbreviation set as type.
   */
  logo?: string
}

/**
 * The two standings the corporate overview claims, in the order it states them
 * in the signature block: "NITA Accredited Institution | KRA Ushuru Mashinani
 * Service Partner". The KRA partnership was missing here entirely.
 */
export const accreditations: Array<Accreditation> = [
  {
    body: 'National Industrial Training Authority',
    abbreviation: 'NITA',
    standing: 'Accredited institution',
    scope: 'Corporate and professional training provision',
    benefit:
      'Training delivered under the accreditation is eligible for corporate training levy reimbursement.',
    logo: '/orgs/nita.png',
  },
  {
    body: 'Kenya Revenue Authority — Ushuru Mashinani Service Partner',
    abbreviation: 'KRA',
    standing: 'Ushuru Mashinani service partner',
    scope: 'Accessible tax and compliance support',
    benefit:
      'As an accredited KRA Partner, CaliberCode is a trusted channel for tax registration, filing support, statutory reconciliations and regulatory alignment.',
    logo: '/orgs/kra.webp',
  },
]

/**
 * Organisation marks shown in the partner strip, served from `public/orgs`.
 *
 * Every mark is rendered as a flat silhouette rather than in brand colour, and
 * that is a constraint of the supplied art, not a style preference: five of
 * these are white-on-transparent (Fiesta, Juja Abattoir, KanaTech, Mixo, Zuri)
 * and would be invisible on the light strip in their own colours. Swap in
 * light-background versions of those five and the strip can go full colour.
 *
 * The accreditation bodies are deliberately absent — NITA and KRA are stated
 * as accreditations above, and ACFE/ICPAK/IIA/ISACA sit with
 * `practitionerCredentials`, because a body whose certification a member of
 * staff holds is not a client.
 */
export type OrgMark = {
  name: string
  file: string
}

export const partnerOrganisations: Array<OrgMark> = [
  { name: 'A&D Forensics', file: 'ad-forensics.svg' },
  { name: 'Asmera', file: 'asmera.png' },
  { name: 'Coffee Heist', file: 'coffee_heist.png' },
  { name: 'Diamond Trust Bank', file: 'dtb.png' },
  { name: 'Fiesta Firm', file: 'fiesta_firm.png' },
  { name: 'Fimnet', file: 'fimnet.png' },
  { name: 'I&M Bank', file: 'im-bank.png' },
  { name: 'Juja Abattoir', file: 'juja-abattoir.png' },
  { name: 'KanaTech Systems', file: 'kanatech.png' },
  { name: 'Kulmi Payments', file: 'kulmipay.avif' },
  { name: 'Melili Hotel', file: 'melili.png' },
  { name: 'Mixo', file: 'mixo.png' },
  { name: 'Odoo', file: 'odoo.png' },
  { name: 'Pesapal', file: 'pesapal.png' },
  { name: 'Wavetech', file: 'wavetech.png' },
  { name: 'Wiilo', file: 'wiilo.png' },
  { name: 'Zoho', file: 'zoho.png' },
  { name: 'Zuri', file: 'zuri.png' },
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
    discipline: 'Accounting & Reporting',
  },
  {
    abbreviation: 'CFE',
    name: 'Certified Fraud Examiner',
    discipline: 'Forensics & Fraud',
  },
  {
    abbreviation: 'CISA',
    name: 'Certified Information Systems Auditor',
    discipline: 'IS Audit & Cybersecurity',
  },
  {
    abbreviation: 'CIA',
    name: 'Certified Internal Auditor',
    discipline: 'Internal Audit',
  },
  {
    abbreviation: 'CRMA',
    name: 'Certification In Risk Management Assurance',
    discipline: 'Risk Assurance',
  },
  {
    abbreviation: 'CCCS',
    name: 'Certified Cryptocurrency Compliance Specialist',
    discipline: 'Digital Assets',
  },
  {
    abbreviation: 'ACAMS',
    name: 'Certified Anti-Money Laundering Specialist',
    discipline: 'AML/CFT',
  },
  {
    abbreviation: 'MSc / MBA / LLM',
    name: 'Advanced Degrees In Tax, Business And Law',
    discipline: 'Advisory Leadership',
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
    title: 'Tax Manager — Statutory Compliance',
    team: 'Tax',
    location: 'Nairobi',
    type: 'Full time',
  },
  {
    title: 'Fraud Risk Associate',
    team: 'Financial Crime',
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
    title: 'Instructional Designer (E-Learning)',
    team: 'Capacity Building',
    location: 'Remote — East Africa',
    type: 'Contract',
  },
  {
    title: 'Associate Faculty — Governance & Risk',
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
    role: 'Head Of Learning & Development',
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
      'Their statutory health check found the exposure before KRA did, and the file held up at objection without a single amendment.',
    name: 'Aisha Hassan',
    role: 'Group Finance Director',
    organisation: 'Manufacturing group',
    photo: photos.portraitCityWindow,
    audience: 'Executive',
  },
  {
    quote:
      'I took the Data Protection certificate part-time while working. The QR credential went straight onto my LinkedIn and two recruiters mentioned it in the same month.',
    name: 'Collins Barasa',
    role: 'Data Protection Officer',
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
      'We needed a custom programme across procurement fraud, ethics and whistleblowing for 60 county staff. The quote came back within the week, and delivery matched it.',
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
  category: 'Masterclasses' | 'Graduations' | 'Board Retreats' | 'Forums'
  /** RES-03 — the gallery mixes stills and video. */
  media: 'image' | 'video'
  durationLabel?: string
}

export const galleryItems: Array<GalleryItem> = [
  {
    photo: photos.graduatesCelebrate,
    caption: 'Certification Ceremony, Nairobi',
    category: 'Graduations',
    media: 'image',
  },
  {
    photo: photos.boardroomWide,
    caption: 'Board Risk Oversight Retreat, Nanyuki',
    category: 'Board Retreats',
    media: 'image',
  },
  {
    photo: photos.auditorium,
    caption: 'East Africa Compliance Forum Keynote',
    category: 'Forums',
    media: 'video',
    durationLabel: '3:22',
  },
  {
    photo: photos.graduatesPair,
    caption: 'Executive Certificate Cohort, Class Of 2026',
    category: 'Graduations',
    media: 'image',
  },
  {
    photo: photos.workshopRoom,
    caption: 'Fraud Risk Management Workshop, Nairobi',
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
    caption: 'Credential Award, October Cohort',
    category: 'Graduations',
    media: 'image',
  },
  {
    photo: photos.strategyTable,
    caption: 'Audit Committee Masterclass',
    category: 'Masterclasses',
    media: 'video',
    durationLabel: '2:05',
  },
  {
    photo: photos.graduationMass,
    caption: 'Annual Graduation, Kenyatta International Convention Centre',
    category: 'Graduations',
    media: 'image',
  },
  {
    photo: photos.keynote,
    caption: 'Policy Roundtable, Kampala',
    category: 'Forums',
    media: 'image',
  },
  {
    photo: photos.teamCouch,
    caption: 'Corporate Cohort Onboarding',
    category: 'Masterclasses',
    media: 'image',
  },
  {
    photo: photos.graduatesTwo,
    caption: 'Faculty And Graduand, Nairobi',
    category: 'Graduations',
    media: 'image',
  },
]

export const galleryCategories = [
  'Masterclasses',
  'Graduations',
  'Board Retreats',
  'Forums',
] as const

// -- RES-05/06: FAQs -----------------------------------------------------------

export type FaqCategory = {
  category: string
  items: Array<{ question: string; answer: string }>
}

export const faqs: Array<FaqCategory> = [
  {
    category: 'Accreditation & Credentials',
    items: [
      {
        question: 'Are CaliberCode programmes accredited?',
        answer:
          'CaliberCode is a NITA-accredited institution, so corporate training delivered under the accreditation is eligible for training levy reimbursement. We are also a KRA Ushuru Mashinani service partner for tax and compliance support. Each course page states the CPD hours it carries.',
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
    category: 'Booking & Delivery',
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
          'Yes — the custom programme builder lets you assemble modules from any of the five training focus areas and submit the selection for a custom quote. This is how most SME and government programmes are scoped.',
      },
      {
        question: 'What happens if I cannot attend after booking?',
        answer:
          'Transfer and cancellation terms are confirmed at checkout and on your booking confirmation. Please contact the training team as early as possible so a substitution or transfer to a later cohort can be arranged.',
      },
    ],
  },
  {
    category: 'Payment & Invoicing',
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
