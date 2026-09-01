/**
 * The advisory practice areas.
 *
 * Source: the client's CaliberCode corporate overview, which supersedes the
 * nine-practice / four-pillar structure taken from Company Profile v3. That
 * structure carried practices the overview does not offer (Business Advisory,
 * Financial Advisory, Human Capital, standalone IS Audit) and split ones it
 * treats as a single engagement. The overview organises the advisory offering
 * as three practices. Islamic Finance and Human Resource Management
 * were added afterwards at the
 * client's request, from a separate brief, making four.
 *
 * Because there are four practices rather than nine, the `Pillar` grouping is
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

/**
 * A scheduled training programme inside a practice.
 *
 * Distinct from a catalog `Course`: these are sold as part of an advisory
 * engagement rather than bought per seat, so they carry no price, no credential
 * and no publish state — but they do carry a duration in days, an audience and,
 * where one exists, a prerequisite, none of which the catalog models.
 */
export type TrainingProgramme = {
  name: string
  /** Working days, as the client's programme document states them. */
  days: number
  audience: string
  /** Absent where the document states no prerequisite. */
  prerequisite?: string
  objective: string
  outcomes: Array<string>
  contents: Array<string>
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
  /** Scheduled programmes, where the practice is delivered as a set of them. */
  programmes?: Array<TrainingProgramme>
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
    name: 'Statutory Compliance & Internal Audit',
    shortName: 'Statutory & Audit',
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
      title: 'Statutory Compliance & Internal Audit Services Kenya',
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
    slug: 'governance-compliance-risk-management',
    name: 'Governance, Compliance & Risk Management',
    shortName: 'Governance & Compliance',
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
      title: 'Governance, Compliance & Risk Management Advisory Kenya',
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
  {
    slug: 'islamic-finance',
    name: 'Islamic Finance Services',
    shortName: 'Islamic Finance',
    summary:
      'Shari’ah-compliant structuring, facility applications and training, across sukuk, Islamic unit trusts, equities and REITs.',
    intro:
      'Shari’ah compliance is a structuring question before it is a product question. We work on how a facility or an instrument is put together — what it is secured on, how the return arises, and whether that survives scrutiny — and we train the teams who then have to administer it.',
    photo: photos.glassOffice,
    methodology: [
      {
        title: 'Objective & Screen',
        body: 'What the client is trying to achieve, and which structures are open to them once the prohibited elements — interest, excessive uncertainty and prohibited sectors — are screened out.',
      },
      {
        title: 'Structure Selection',
        body: 'The contract is chosen for the economics rather than the label: a purchase-and-resale, a lease, a partnership or an agency arrangement each behave differently on risk, tenor and security.',
      },
      {
        title: 'Documentation & Application',
        body: 'The facility is documented and taken through application with the institution, with the Shari’ah basis of the structure recorded rather than assumed.',
      },
      {
        title: 'Administration & Training',
        body: 'The team that will run the arrangement is trained on it, because a compliant structure administered as a conventional one stops being compliant.',
      },
    ],
    capabilities: [
      'Islamic finance training and capacity building for boards and finance teams',
      'Shari’ah-compliant facility structuring and application support',
      'Guidance on investment in Shari’ah-compliant equities',
      'Guidance on Islamic unit trusts and collective investment schemes',
      'Guidance on sukuk — Islamic bond-like instruments',
      'Guidance on Shari’ah-compliant real estate investment trusts',
      'Islamic fintech advisory and product review',
      'Shari’ah governance frameworks and compliance review',
    ],
    deliverables: [
      'A structure options paper with the Shari’ah basis of each stated',
      'A documented facility application pack',
      'A Shari’ah governance and compliance checklist for the arrangement',
      'A trained finance team, with the administration steps written down',
    ],
    outcomes: [
      'Financing that meets the objective without compromising the principle',
      'A structure whose compliance basis is documented, not asserted',
      'A team that can administer the arrangement without eroding it',
    ],
    engagements: [
      'Shari’ah-compliant facility structuring',
      'Investment structure review',
      'Islamic finance training programme',
      'Shari’ah governance framework build',
    ],
    relatedTaxonomy: [1, 5],
    seo: {
      title: 'Islamic Finance Services Kenya — Shari’ah-Compliant Advisory',
      description:
        'Shari’ah-compliant financing structures, facility applications, sukuk, Islamic unit trusts, equities and REITs, plus Islamic finance training, for clients in Kenya and East Africa.',
      keywords: [
        'Islamic finance Kenya',
        'Shariah compliant investment Nairobi',
        'sukuk Kenya',
        'Islamic unit trust Kenya',
      ],
    },
  },
  {
    slug: 'human-resource-management',
    name: 'Human Resource Management',
    shortName: 'Human Resources',
    summary:
      'HR policy and structure, recruitment and performance practice, and eight scheduled management development programmes.',
    intro:
      'Most HR problems present as people problems and turn out to be structural ones — an unwritten policy, an appraisal nobody was trained to run, a role filled from an unstructured interview. We work on the framework and on the managers who have to operate it, because neither holds on its own.',
    photo: photos.workshopRoom,
    methodology: [
      {
        title: 'Training Needs Analysis',
        body: 'We establish which capability gaps actually exist before proposing a programme, and which additional courses the organisation needs beyond the scheduled set.',
      },
      {
        title: 'Programme Selection',
        body: 'Programmes are matched to level and sequenced against their prerequisites — Planning for Managers follows Introduction to Management, Team Motivation follows Interpersonal Skills.',
      },
      {
        title: 'In-House Delivery',
        body: 'Two- and three-day workshops run on site for a cohort, so the discussion is about the organisation in the room rather than a generic case.',
      },
      {
        title: 'Practice & Feedback',
        body: 'Every programme puts the skill into practice under observation — interviewing role-play, coaching practice with feedback, team exercises — because these are behaviours, not topics.',
      },
    ],
    capabilities: [
      'HR policy development, review and documentation',
      'Organisation structure, role design and job descriptions',
      'Recruitment and selection frameworks, and structured interviewing',
      'Performance management systems and appraisal design',
      'Employee relations, grievance handling and workplace mediation',
      'Training needs analysis and management development pathways',
      'HR compliance review against employment obligations',
      'Introduction to Management — for newly promoted supervisors',
      'Planning for Managers — strategic and tactical planning, MBO, SWOT',
      'Managing Change — resistance, change agents, organisational change',
      'Coaching — the GROW model and non-directive coaching',
      'Team Motivation — disclosure, feedback and the Johari Window',
      'Performance Management — appraisal, SMART objectives, poor performance',
      'Recruitment & Selection — structured interviewing and shortlisting',
      'Team Leading — team roles, facilitation and constructive conflict',
    ],
    deliverables: [
      'An HR policy set and staff handbook, written to be applied',
      'Job descriptions and person specifications for the roles in scope',
      'A performance appraisal framework with SMART objective templates',
      'A training needs analysis identifying the gaps to be closed',
      'A sequenced programme plan respecting each course’s prerequisites',
      'Delivered workshops with practice sessions and observed feedback',
      'Completion records for each cohort',
    ],
    outcomes: [
      'Policies that answer the question before it becomes a dispute',
      'Hiring decisions made on evidence rather than impression',
      'Managers who can plan, delegate and appraise rather than only do',
      'Appraisals that change behaviour instead of recording it',
      'Conflict and poor performance handled early, by the line manager',
    ],
    engagements: [
      'HR policy and handbook development',
      'Recruitment and selection framework build',
      'Performance management system design',
      'Single in-house programme for one cohort',
      'Sequenced management development pathway',
      'Training needs analysis and programme design',
      'Additional programmes scoped to the analysis',
    ],
    // Verbatim from the client's programme document — objectives, audiences,
    // prerequisites, durations and contents as written. Nothing here is
    // inferred; where the document states no prerequisite, the field is absent.
    programmes: [
      {
        name: 'Introduction to Management',
        days: 2,
        audience:
          'Employees recently promoted to supervisory or management positions, and as a refresher for mature managers who have not had development courses in their career.',
        objective:
          'Introduces basic management principles and techniques, for people new to supervisory and management levels.',
        outcomes: [
          'Understand what it takes to lead a team and be an effective manager',
          'Apply techniques for planning their own and their team’s workload',
          'Apply techniques for improving the way they manage themselves',
          'Apply a more professional approach and a better image in the workplace',
          'Identify the people skills needed as a manager, and manage people successfully',
        ],
        contents: [
          'Your role as a manager — a flexible approach',
          'Setting objectives',
          'Work planning techniques',
          'Personal time management',
          'Delegation — how to delegate',
          'Assertiveness — how to become more assertive',
          'Conflict management',
          'Coping with stress',
          'Sending and receiving messages',
          'Non-verbal communication',
          'Communication and your team',
          'Feedback',
          'Tackling poor performance',
          'Dealing with aggression',
          'Dealing with performance issues',
          'Motivation',
          'Group discussions on approaching difficult situations at work',
        ],
      },
      {
        name: 'Planning for Managers',
        days: 2,
        audience:
          'Middle and senior level management, or employees nominated by the company as part of the management development programme.',
        prerequisite: 'Introduction to Management',
        objective:
          'Highlights the importance of well thought out, defined organisational plans that lead a company to its goals and earn competitive advantage.',
        outcomes: [
          'Define planning in the organizational context',
          'Understand planning in uncertain environments',
          'State why managers should formally plan, and the benefits to the organisation',
          'Distinguish strategic from tactical plans, and specific from directional plans',
          'Explain time frames of plans, and how single-use and standing plans differ',
          'Explain management by objectives (MBO) and the twelve steps in goal setting',
          'List the nine steps of the strategic management process',
          'Undertake a SWOT analysis',
          'State how strategies are formulated, and list the four main strategies',
          'Understand competitive strategy, competitive advantage, and TQM as a strategic weapon',
        ],
        contents: [
          'Planning',
          'Strategic and tactical plans',
          'Directional and specific plans',
          'Management by objectives',
          'The strategic management process',
          'Grand strategies',
          'SWOT analysis',
        ],
      },
      {
        name: 'Managing Change',
        days: 2,
        audience: 'All employees in the organization.',
        objective:
          'Reviews the pressures affecting businesses and how the company and its employees respond, in order to maintain competitive advantage and survive a changing environment.',
        outcomes: [
          'Understand the external forces which create the need for change',
          'Identify the forces creating a need for change, and evaluate their own reaction',
          'Learn the various views of the change process, and why people resist change',
          'State how organisations implement planned change',
          'Apply techniques that make change easier for them',
          'Identify causes and symptoms of stress in the change process, and apply strategies to reduce it',
        ],
        contents: [
          'Defining change and identifying its causes',
          'The change process',
          'Resistance to organisational change',
          'Managing change and innovation',
          'Internal forces that create a need for change',
          'How a manager serves as a change agent',
          'Two views on the change process',
          'The “white water rapids” metaphor',
          'Who Moved My Cheese',
          'Management classic: resistance to change',
          'Exercise: bringing out the best in your people',
          'Techniques for reducing resistance to organisational change',
          'The symptoms of stress',
        ],
      },
      {
        name: 'Coaching',
        days: 2,
        audience:
          'Managers and supervisors who wish to improve their team’s performance through coaching.',
        objective:
          'Builds an appreciation of the value of coaching and an understanding of the skills a successful coach needs, including practice with feedback.',
        outcomes: [
          'Understand the value of coaching and its application in the workplace',
          'Describe the key skills required to be an effective coach',
          'Demonstrate understanding of key approaches, in particular non-directive coaching',
          'Apply the core skills — listening, questioning, summarizing, chunking, feedback',
          'Use the key models, in particular GROW',
          'Demonstrate an initial understanding of the Inner Game',
          'Generate plans to begin coaching practice clients',
        ],
        contents: [
          'Defining coaching, and the context of coaching',
          'Increasing self-awareness',
          'Key coaching skills — listening, questioning, goal setting, action planning',
          'The coaching process — the GROW model',
          'Practice coaching in practical sessions',
          'Feedback on practice and learning points',
          'Review and action planning',
        ],
      },
      {
        name: 'Team Motivation',
        days: 2,
        audience:
          'All employees — a single team or department, or a mix from across departments where key departments are not fully interacting.',
        prerequisite: 'Interpersonal Skills',
        objective:
          'Establishes the value of open communication in building trust and team relationships, and builds comfort with disclosure and feedback.',
        outcomes: [
          'Expand and improve their relationships with others',
          'Become more self-aware, and express their views, values and attitudes',
          'Develop understanding of the beliefs, values and perspectives of others',
          'Communicate openly with those whose perspectives differ from their own',
          'Reduce inter-group conflict and enhance working relationships',
          'Increase tolerance and flexibility, and understand the goals of other departments',
        ],
        contents: [
          'Relationships in the workplace',
          'Teamwork questionnaire',
          'Team formation',
          'The “KnowMe” exercise',
          'The Johari Window',
          'Managing pre-conceptions and reviewing behaviours',
          'Disclosure and feedback',
          'Motivational questionnaire',
          'Adams’ equity theory of job motivation',
        ],
      },
      {
        name: 'Performance Management',
        days: 2,
        audience: 'All staff members involved in the appraisal of others.',
        objective:
          'Establishes the value and purpose of performance management, and how it supports individual, team and organisational goals.',
        outcomes: [
          'Identify, encourage and enhance effective behaviour at work',
          'Plan, structure and run a performance appraisal',
          'Deal with difficult situations in the appraisal',
          'Identify appropriate measurement techniques',
          'Understand the benefits of coaching and mentoring',
          'Deal with poor performance',
        ],
        contents: [
          'The purpose of performance management',
          'The learning cycle and learning styles',
          'Setting SMART objectives',
          'Monitoring, feedback, and the rules of giving feedback',
          'Communication skills — effective listening, questioning, barriers',
          'The appraisal meeting and the seven steps',
          'Coaching',
          'Dealing with appraisee reactions',
          'Motivation',
        ],
      },
      {
        name: 'Recruitment & Selection',
        days: 2,
        audience:
          'Supervisory and management staff involved in the recruitment process.',
        objective:
          'Equips the interviewer to conduct a well-planned and structured interview.',
        outcomes: [
          'Recognise how important the recruitment process is to a company',
          'Understand the interview process and the available selection devices',
          'Identify the biases managers carry into an ill-structured interview',
          'State the various questioning techniques',
          'Practise interviewing technique through role-play',
        ],
        contents: [
          'Identifying the right people',
          'Employee assessment',
          'Drawing up a job description and job specification',
          'Interviewing, and types of question',
          'Interviewing role-play exercise',
          'Active listening',
          'Shortlisting',
          'Evidence versus assertion',
        ],
      },
      {
        name: 'Team Leading',
        days: 3,
        audience: 'All middle and senior managers.',
        prerequisite:
          'Online Self-Perception Inventory, completed before the course',
        objective:
          'Develops leadership skill through self and group exercises, so managers are effective in their leadership roles.',
        outcomes: [
          'Clarify the essential characteristics of a team, and what they imply for team leaders',
          'Become aware of their attitudes and assumptions about their teams',
          'Consider the motivational effects of different leadership styles against team maturity',
          'Use the diversity of styles within their team positively',
          'Practise the interpersonal skills essential to effective leadership',
          'Handle conflict constructively',
        ],
        contents: [
          'Scene setting — what is a team?',
          'Team roles',
          'Self-Perception Inventory (SPI)',
          'Making it work with ground rules',
          'Making it work without discounting',
          'Making it work with feedback and active listening',
          'Facilitation skills',
          'Visioning and action planning',
          'Belbin team building exercises',
        ],
      },
    ],
    relatedTaxonomy: [5, 2],
    seo: {
      title: 'Human Resource Management Kenya — HR Advisory & Training',
      description:
        'HR policy, organisation structure, recruitment and performance frameworks, plus in-house management development programmes covering planning, change, coaching, appraisal, recruitment and team leading.',
      keywords: [
        'HR consultancy Kenya',
        'human resource management Nairobi',
        'management training Kenya',
        'performance management Kenya',
      ],
    },
  },
]

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)
