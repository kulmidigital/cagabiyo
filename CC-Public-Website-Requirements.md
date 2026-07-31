# CaliberCode Public Website Requirements

## 1. Document purpose

This document extracts and organizes the public-facing website requirements from `CC-Web Design.pdf`, document reference `CCL-DTP-2026-V1`, dated July 2026.

The source proposal combines a corporate website with a Learning Management System (LMS). This requirements document concentrates on pages and workflows available to anonymous visitors and prospective customers. LMS, trainer, finance, and system-administration requirements are included only where they directly support a public website journey.

**Confidentiality:** Confidential. This document is derived from a proposal marked confidential on every page.

### Requirement labels

- **Explicit**: directly stated in the proposal.
- **Explicit dependency**: directly stated in an LMS or administrative section and required to complete a public journey.
- **Derived**: necessary to support an explicit public requirement, but not fully specified in the proposal.
- **Future**: explicitly deferred to a later roadmap phase.
- **Decision required**: the proposal leaves an implementation or content decision unresolved.

## 2. Product vision and business outcomes

### 2.1 Vision

The website must reposition CaliberCode from a local consultancy vendor into a premier institutional knowledge authority and continuous-learning institute serving Kenya and Greater East Africa. It must combine institutional corporate storytelling, advisory-service lead generation, training discovery, event booking, and entry points into digital learning.

Source: pages 1-2 and 10.

### 2.2 Business goals

| ID | Requirement | Classification | Source |
|---|---|---|---|
| GOAL-01 | Increase inbound enterprise B2B inquiries for advisory and custom corporate training by 300% within six months after launch. | Explicit | Page 2 |
| GOAL-02 | Support the shift of 35% of total training revenue to digital and blended e-learning within 12 months. | Explicit | Page 2 |
| GOAL-03 | Contribute to automating 90% of routine administration related to registration, payment reconciliation, and credentialing. | Explicit | Page 2 |
| GOAL-04 | Support expansion across Kenya, Uganda, Tanzania, Rwanda, and Ethiopia. | Explicit | Page 2 |
| GOAL-05 | Reduce geographic and venue-capacity constraints on training access. | Explicit | Page 2 |
| GOAL-06 | Create recurring revenue from self-paced courses in addition to executive masterclasses and advisory services. | Explicit | Page 2 |

### 2.3 Conversion objectives

The public website must be designed to:

- establish immediate institutional credibility;
- explain CaliberCode's service methodologies clearly;
- generate qualified advisory and corporate-training inquiries;
- allow visitors to discover and book workshops and masterclasses;
- allow individual learners to discover courses and proceed to enrollment and payment;
- maintain relationships through thought leadership, newsletters, events, and direct messaging;
- expose credible, publicly verifiable professional credentials.

Source: pages 2-7.

## 3. Public audiences and primary journeys

### 3.1 C-suite executives and board directors

Target needs:

- immediate proof of institutional credibility;
- clear advisory-service positioning and methodologies;
- evidence of leadership, governance, accreditation, and outcomes;
- fast booking of executive advisory sessions, board retreats, and corporate advisory;
- access to services covering Tax Strategy, Internal Audit, Governance, Risk and Compliance, IS Audit, and Cryptocurrency Compliance.

Primary journeys:

1. Home -> Services -> Service detail -> Consultancy booking.
2. Home -> About -> Leadership/Governance/Accreditation -> Contact or booking.
3. Insight or whitepaper -> Related service -> Inquiry or booking.

Source: page 2.

### 3.2 HR directors and Learning and Development managers

Target needs:

- discover corporate training across multiple disciplines;
- request bulk or custom training;
- specify company details, staff headcount, modules, and delivery location;
- obtain a downloadable pro-forma invoice;
- reserve or manage corporate seats;
- eventually track cohort completion in real time.

Primary journeys:

1. Home -> Capacity Building -> Corporate Training -> Corporate training request.
2. Training taxonomy/course catalog -> Select modules -> Custom training quote.
3. Events -> Workshop/masterclass -> Seat reservation or enterprise inquiry.

Real-time cohort completion and corporate seat management depend on LMS/B2B portal functionality. The proposal mentions them as buyer needs, while the dedicated corporate compliance dashboard is deferred to Year 2.

Source: pages 2, 6, and 10.

### 3.3 Individual professionals and learners

Target users include finance professionals, accountants, auditors, tax practitioners, risk officers, entrepreneurs, and other professionals seeking specialized certification.

Target needs:

- browse relevant courses and events;
- use a friction-free M-Pesa or card checkout;
- access mobile-responsive learning after purchase;
- receive shareable, QR-verifiable digital credentials;
- add credentials to LinkedIn.

Primary journeys:

1. Home -> Featured Course -> Course catalog/detail -> Enrollment/payment.
2. Events -> Workshop detail -> Seat selection -> Payment -> QR ticket.
3. Certificate link or QR scan -> Public verification page.

Source: pages 3 and 6-7.

### 3.4 SMEs, government agencies, and regional visitors

Target needs:

- construct a custom training program from multiple categories;
- request custom pricing;
- select on-site, virtual, or off-site delivery;
- see content relevant to East African markets;
- transact initially in KES or USD.

Source: page 6.

## 4. Information architecture and public sitemap

### 4.1 Primary public navigation

The public website must contain the following primary areas:

1. Home
2. About Us
3. Services / Consulting
4. Capacity Building
5. Events & Workshops
6. Resources & News
7. Contact

The public experience must also expose routes or entry points for:

- global site search;
- course catalog and course discovery;
- event/workshop registration;
- advisory and training booking;
- checkout/payment;
- public certificate verification;
- sign-in or LMS access;
- newsletter subscription.

Source: pages 3, 5-7.

### 4.2 HOME - Home page

| ID | Requirement | Classification | Source |
|---|---|---|---|
| HOME-01 | Display a prominent hero banner. | Explicit | Page 3 |
| HOME-02 | Communicate CaliberCode's strategic positioning as an East African advisory and knowledge institution. | Explicit | Pages 1-3 |
| HOME-03 | Present a grid of practice areas that links into the relevant advisory or training areas. | Explicit | Page 3 |
| HOME-04 | Display selected or featured courses with paths into the course catalog or course details. | Explicit | Page 3 |
| HOME-05 | Display institutional impact metrics. | Explicit | Page 3 |
| HOME-06 | Display written and/or video testimonials. | Explicit | Pages 3 and 5 |
| HOME-07 | Surface recent or featured insights. | Explicit | Page 3 |
| HOME-08 | Provide prominent conversion paths for advisory inquiries, corporate training, course discovery, event booking, and contact. | Derived | Pages 2-6 |

### 4.3 ABOUT - About Us

| ID | Requirement | Classification | Source |
|---|---|---|---|
| ABOUT-01 | Provide a company overview. | Explicit | Page 3 |
| ABOUT-02 | Present company leadership and senior faculty. | Explicit | Page 3 |
| ABOUT-03 | Explain the governance model. | Explicit | Page 3 |
| ABOUT-04 | Present accreditations or accreditation status. | Explicit | Page 3 |
| ABOUT-05 | Provide careers information and/or available opportunities. | Explicit | Page 3 |
| ABOUT-06 | Use the page to establish institutional credibility for executive and enterprise buyers. | Explicit | Page 2 |

### 4.4 SERV - Services / Consulting

The website must support landing or detail content for these practice areas:

1. Business Advisory
2. Financial Advisory
3. Tax Advisory
4. Internal Audit & Risk
5. Governance, Risk & Compliance (GRC)
6. Information Systems Audit
7. Cryptocurrency Compliance
8. Policy Research

| ID | Requirement | Classification | Source |
|---|---|---|---|
| SERV-01 | Provide an overview of all consulting practice areas. | Explicit | Page 3 |
| SERV-02 | Allow each practice area to communicate a clear service methodology. | Explicit | Page 2 |
| SERV-03 | Connect service pages to the consultancy booking workflow and general inquiry options. | Derived | Pages 2, 3, and 6 |
| SERV-04 | Make service content searchable through global site search. | Explicit | Page 5 |
| SERV-05 | Support SEO targeting for regional terms such as "Tax Advisory Kenya." | Explicit | Page 5 |
| SERV-06 | Allow related insights, whitepapers, events, or training programs to be associated with a service. | Derived | Pages 3 and 5 |

The proposal does not define mandatory fields or a page template for a service detail page. This must be finalized during content architecture and UI/UX discovery.

### 4.5 CAP - Capacity Building

The Capacity Building area must contain:

- Corporate Training (B2B);
- Executive Masterclasses;
- E-Learning / LMS Course Catalog.

| ID | Requirement | Classification | Source |
|---|---|---|---|
| CAP-01 | Explain CaliberCode's corporate training offering. | Explicit | Page 3 |
| CAP-02 | Present executive masterclasses. | Explicit | Page 3 |
| CAP-03 | Provide a public e-learning course catalog. | Explicit | Page 3 |
| CAP-04 | Connect corporate training content to the corporate training request workflow. | Derived | Pages 3 and 6 |
| CAP-05 | Connect custom training content to the interactive program builder/quote workflow. | Derived | Page 6 |
| CAP-06 | Allow course titles to be found by global search. | Explicit | Page 5 |
| CAP-07 | Categorize training and courses using the 16-area taxonomy in Section 11. | Explicit | Pages 7-8 |
| CAP-08 | Support course prices in KES and USD when course commerce is exposed publicly. | Explicit dependency | Pages 5-6 |
| CAP-09 | Allow published courses to be visible or hidden from the public catalog. | Explicit CMS dependency | Page 5 |

A course-detail page is required to make catalog discovery, SEO schema, pricing, and checkout usable, but its exact content fields are not defined in the proposal.

### 4.6 EVENT - Events & Workshops

| ID | Requirement | Classification | Source |
|---|---|---|---|
| EVENT-01 | Provide an interactive calendar of upcoming public workshops, executive masterclasses, and webinars. | Explicit | Pages 3 and 5 |
| EVENT-02 | Support both list and grid/calendar views. | Explicit | Page 5 |
| EVENT-03 | Support physical and virtual events/masterclasses. | Explicit | Page 3 |
| EVENT-04 | Allow a visitor to select a workshop date. | Explicit | Page 6 |
| EVENT-05 | Display remaining seat availability. | Explicit | Page 6 |
| EVENT-06 | Allow a visitor to reserve and pay for a seat using M-Pesa or card. | Explicit | Page 6 |
| EVENT-07 | Send an immediate QR-coded entry ticket by email following successful payment. | Explicit | Page 6 |
| EVENT-08 | Allow content managers to update the event calendar. | Explicit CMS dependency | Page 4 |
| EVENT-09 | Apply Event structured data to eligible event pages. | Explicit | Page 5 |

### 4.7 RES - Resources & News

The content hub must support:

- research whitepapers;
- policy briefs;
- industry blogs and thought-leadership articles;
- policy commentary;
- a photo gallery;
- a video gallery;
- frequently asked questions.

| ID | Requirement | Classification | Source |
|---|---|---|---|
| RES-01 | Provide an Insights/content-hub landing experience. | Explicit | Pages 3 and 5 |
| RES-02 | Publish thought-leadership articles, policy commentaries, and industry whitepapers. | Explicit | Page 5 |
| RES-03 | Provide a filterable image and video gallery. | Explicit | Page 5 |
| RES-04 | Gallery content must support past corporate masterclasses, graduation ceremonies, and board retreats. | Explicit | Page 5 |
| RES-05 | Provide categorized accordion-style FAQs. | Explicit | Page 5 |
| RES-06 | FAQ categories/content must cover training accreditation, booking terms, and payment methods. | Explicit | Page 5 |
| RES-07 | Make blog posts and whitepapers discoverable through global site search. | Explicit | Page 5 |
| RES-08 | Allow content managers to publish blog articles/research papers and manage gallery content. | Explicit CMS dependency | Page 4 |

The proposal does not define whether whitepapers and policy briefs are freely downloadable, form-gated, or restricted. This requires a business decision.

### 4.8 CONTACT - Contact

| ID | Requirement | Classification | Source |
|---|---|---|---|
| CONTACT-01 | List CaliberCode's regional office locations. | Explicit | Page 3 |
| CONTACT-02 | Provide a dynamic inquiry form. | Explicit | Page 3 |
| CONTACT-03 | Embed an interactive Google Map. | Explicit | Page 3 |
| CONTACT-04 | Provide a direct, floating WhatsApp contact widget. | Explicit | Pages 3 and 5 |
| CONTACT-05 | Route WhatsApp conversations to advisory and training sales representatives. | Explicit | Page 5 |
| CONTACT-06 | Support inquiry intent relevant to advisory, training, events, and general contact. | Derived | Pages 2-6 |
| CONTACT-07 | Collect and process inquiry data in compliance with the Kenya Data Protection Act. | Derived from global compliance requirement | Page 9 |

The proposal does not define inquiry recipients, routing rules, service-level targets, required fields, spam protection, or consent wording.

### 4.9 VERIFY - Public certificate verification

| ID | Requirement | Classification | Source |
|---|---|---|---|
| VERIFY-01 | Provide a public verification route using a unique certificate identifier, for example `/verify/CERT-CC-2026-89421`. | Explicit | Page 7 |
| VERIFY-02 | Allow QR codes printed on certificates to link directly to the relevant verification route. | Explicit | Page 7 |
| VERIFY-03 | Use a unique certificate hash identifier for every issued certificate. | Explicit | Page 7 |
| VERIFY-04 | Provide a one-click "Add to LinkedIn Profile" action for issued credentials. | Explicit | Page 7 |
| VERIFY-05 | Return a clear valid/invalid/not-found result when an identifier is checked. | Derived | Page 7 |
| VERIFY-06 | Define which credential fields may be displayed publicly without breaching learner privacy. | Decision required | Pages 7 and 9 |

## 5. Global public-site features

### 5.1 Search

| ID | Requirement | Classification | Source |
|---|---|---|---|
| SEARCH-01 | Provide a fast global search interface. | Explicit | Page 5 |
| SEARCH-02 | Search across advisory services, course titles, blog posts, and whitepapers. | Explicit | Page 5 |
| SEARCH-03 | Use a client-side elastic search experience. | Explicit wording; implementation choice requires confirmation | Page 5 |
| SEARCH-04 | Present useful result types and links so users can distinguish services, courses, posts, and resources. | Derived | Page 5 |
| SEARCH-05 | Support keyboard operation and accessible result announcements. | Derived from WCAG 2.1 AA | Page 8 |

### 5.2 Testimonials and social proof

| ID | Requirement | Classification | Source |
|---|---|---|---|
| PROOF-01 | Support written testimonials. | Explicit | Pages 3 and 5 |
| PROOF-02 | Support video testimonials. | Explicit | Page 5 |
| PROOF-03 | Support testimonials from executive participants, board members, and corporate HR clients. | Explicit | Page 5 |
| PROOF-04 | Allow selected testimonials to appear on the home page and relevant conversion pages. | Explicit/Derived | Pages 3 and 5 |

### 5.3 Newsletter

| ID | Requirement | Classification | Source |
|---|---|---|---|
| NEWS-01 | Provide a newsletter subscription widget. | Explicit | Page 5 |
| NEWS-02 | Integrate the subscription workflow with Mailchimp or SendGrid. | Explicit alternatives | Page 5 |
| NEWS-03 | Support monthly policy roundups and training updates. | Explicit | Page 5 |
| NEWS-04 | Allow content managers to send newsletter broadcasts. | Explicit CMS dependency | Page 4 |
| NEWS-05 | Capture explicit marketing consent and provide privacy information. | Derived from data protection requirement | Page 9 |

### 5.4 Transactional email

The platform must send automated transactional emails for:

- registration confirmation;
- receipt delivery;
- course-progress reminders;
- certificate awards;
- consultancy booking calendar invitations;
- workshop QR-ticket delivery.

Source: pages 5-6.

Public-website delivery depends primarily on registration, booking, receipt, calendar-invite, and ticket emails. Progress and certificate emails belong to the LMS but must use a coherent shared notification system.

## 6. Public booking and inquiry workflows

### 6.1 BOOK-CORP - Corporate training request

| ID | Requirement | Classification | Source |
|---|---|---|---|
| BOOK-CORP-01 | Provide a dedicated corporate training request form. | Explicit | Page 6 |
| BOOK-CORP-02 | Capture company details. | Explicit | Page 6 |
| BOOK-CORP-03 | Capture staff headcount. | Explicit | Page 6 |
| BOOK-CORP-04 | Capture preferred training modules. | Explicit | Page 6 |
| BOOK-CORP-05 | Capture preferred delivery location/mode: on-site, virtual, or off-site. | Explicit | Page 6 |
| BOOK-CORP-06 | Automatically generate a pro-forma invoice after submission. | Explicit | Page 6 |
| BOOK-CORP-07 | Make the generated pro-forma invoice downloadable. | Explicit buyer need | Page 2 |

Missing details include pricing rules, tax treatment, validity periods, approval requirements, invoice delivery method, and whether every request should generate an invoice before internal review.

### 6.2 BOOK-CONSULT - Consultancy booking

| ID | Requirement | Classification | Source |
|---|---|---|---|
| BOOK-CONSULT-01 | Provide direct calendar integration for executive advisory scheduling. | Explicit | Page 6 |
| BOOK-CONSULT-02 | Support advisory categories including Tax, Internal Audit, and Crypto Compliance. | Explicit examples | Page 6 |
| BOOK-CONSULT-03 | Generate and send calendar invitations automatically. | Explicit | Page 6 |
| BOOK-CONSULT-04 | Allow the visitor to select an available date/time or request a suitable slot. | Derived | Page 6 |

The calendar provider, staff assignment rules, meeting duration, buffers, time zone behavior, cancellation policy, and rescheduling behavior are not specified.

### 6.3 BOOK-WORKSHOP - Workshop seat reservation

| ID | Requirement | Classification | Source |
|---|---|---|---|
| BOOK-WORKSHOP-01 | Allow the visitor to select an event/workshop date. | Explicit | Page 6 |
| BOOK-WORKSHOP-02 | Display remaining seats. | Explicit | Page 6 |
| BOOK-WORKSHOP-03 | Accept M-Pesa or card payment. | Explicit | Page 6 |
| BOOK-WORKSHOP-04 | Confirm the reservation immediately after successful payment. | Derived | Page 6 |
| BOOK-WORKSHOP-05 | Email a QR-coded entry ticket immediately after successful payment. | Explicit | Page 6 |
| BOOK-WORKSHOP-06 | Prevent overselling when multiple visitors attempt to reserve the final seats. | Derived | Page 6 |

### 6.4 BOOK-CUSTOM - Custom training program builder

| ID | Requirement | Classification | Source |
|---|---|---|---|
| BOOK-CUSTOM-01 | Provide an interactive program builder. | Explicit | Page 6 |
| BOOK-CUSTOM-02 | Allow clients to select modules from multiple training categories. | Explicit | Page 6 |
| BOOK-CUSTOM-03 | Submit the selected program for a custom pricing quote. | Explicit | Page 6 |
| BOOK-CUSTOM-04 | Target the workflow to SMEs and government agencies as well as enterprise buyers. | Explicit | Page 6 |

The proposal does not define dependencies between modules, minimum/maximum selections, duration calculation, delivery method, or instant versus manually prepared pricing.

## 7. Public payment and commerce requirements

### 7.1 Payment methods

| ID | Requirement | Classification | Source |
|---|---|---|---|
| PAY-01 | Support Safaricom M-Pesa Express using STK Push for Kenyan customers. | Explicit | Page 6 |
| PAY-02 | Trigger an instant M-Pesa payment prompt. | Explicit | Page 6 |
| PAY-03 | Process successful STK callbacks and automatically complete the related enrollment or booking. | Explicit | Page 6 |
| PAY-04 | Accept Mastercard and Visa credit/debit cards. | Explicit | Page 6 |
| PAY-05 | Use Flutterwave or Stripe for card processing. | Explicit alternatives | Page 6 |
| PAY-06 | Support bank transfer and B2B RTGS/EFT settlement. | Explicit | Page 6 |
| PAY-07 | Generate official pro-forma invoices with unique bank reference codes. | Explicit | Page 6 |
| PAY-08 | Support KES and USD transactions at launch. | Explicit | Page 6 |
| PAY-09 | Keep the payment architecture extensible to UGX, TZS, and RWF. | Explicit future-ready constraint | Pages 6 and 10 |
| PAY-10 | Send receipts after successful payment. | Explicit | Page 5 |

### 7.2 Payment experience

The public checkout must:

- clearly identify the course, workshop, event, or other item being purchased;
- display the payable amount and currency;
- allow the applicable payment method to be selected;
- communicate pending, successful, failed, cancelled, and timed-out payment states;
- prevent duplicate completion when a payment callback is retried;
- complete the related enrollment or reservation only after verified payment success;
- provide a receipt and the relevant next-step confirmation.

The first two bullets are directly necessary for the explicit payment workflows. Payment-state handling and duplicate protection are derived requirements required for a reliable callback-based payment system.

### 7.3 Decisions still required

- Select Flutterwave or Stripe, or define when each will be used.
- Confirm whether card processing must settle in both KES and USD.
- Confirm tax/VAT rules and receipt/invoice fields.
- Define refund, cancellation, transfer, and failed-payment policies.
- Define payment-provider fee handling.
- Define whether visitors must create an account before payment.

## 8. Training taxonomy exposed by the public website

The course catalog, program builder, related content, and search filters must support these 16 focus areas:

| # | Training focus area | Example modules/focus areas |
|---|---|---|
| 01 | Finance & Corporate Treasury | Advanced Financial Modeling, Corporate Valuation, Treasury Operations |
| 02 | Accounting & IFRS Compliance | IFRS Standards Updates, Public Sector Accounting (IPSAS), Financial Reporting |
| 03 | Taxation & Tax Advisory | East African Corporate Tax, Transfer Pricing, VAT Administration, Tax Dispute Management |
| 04 | Internal Audit & Risk | Risk-Based Internal Auditing, Forensic Accounting, Fraud Prevention Analytics |
| 05 | Risk Management & ERM | Enterprise Risk Management Frameworks, Credit Risk, Operational Risk Management |
| 06 | Governance & Compliance | Board Leadership, Corporate Governance Code, ESG & Sustainability Reporting |
| 07 | Information Systems (IS) Audit | IT General Controls, COBIT Framework, ISMS / ISO 27001 Auditing |
| 08 | Cybersecurity Awareness | Corporate Cybersecurity Governance, Incident Response, Executive Cyber Literacy |
| 09 | Cryptocurrency & Digital Assets | Crypto Compliance, AML/CFT for Digital Assets, Blockchain Risk Management |
| 10 | Procurement & Supply Chain | Public Procurement Regulation, Strategic Sourcing, Supply Chain Risk |
| 11 | Human Resource Management | Strategic HR Management, Executive Performance Appraisal, Labor Law Compliance |
| 12 | Leadership & Executive Strategy | Change Management, Strategic Thinking, Executive Negotiation Masterclass |
| 13 | Project Management | PMP Alignment, Agile Project Management, Monitoring & Evaluation |
| 14 | SME Scale-Up Development | SME Financial Management, Access to Capital, SME Governance Frameworks |
| 15 | Entrepreneurship & Growth | Venture Building, Pitching to Investors, Business Model Innovation |
| 16 | Personal Financial Literacy | Wealth Management, Executive Retirement Planning, Personal Investment Strategy |

Source: pages 7-8.

## 9. CMS and content-management dependencies

The proposal requires a web CMS managed by the Content Manager role.

| ID | Requirement | Classification | Source |
|---|---|---|---|
| CMS-01 | Authorized content managers must be able to manage public website content. | Explicit | Pages 3-4 |
| CMS-02 | Content managers must be able to publish and update blog articles. | Explicit | Page 4 |
| CMS-03 | Content managers must be able to publish and update research papers/whitepapers. | Explicit | Page 4 |
| CMS-04 | Content managers must be able to update the event calendar. | Explicit | Page 4 |
| CMS-05 | Content managers must be able to manage the photo gallery. | Explicit | Page 4 |
| CMS-06 | Content managers must be able to send newsletter broadcasts. | Explicit | Page 4 |
| CMS-07 | Course managers must be able to set course price in KES and USD, apply taxonomy, and control public visibility. | Explicit dependency | Page 5 |
| CMS-08 | CMS-controlled content must feed global search, SEO metadata, XML sitemaps, and structured data where applicable. | Derived | Page 5 |

The proposal does not define:

- CMS technology;
- draft/review/publish workflow;
- scheduled publishing;
- content versioning;
- preview;
- approval permissions;
- media-library limits;
- image transformations;
- localization;
- archiving and redirects.

## 10. SEO, discoverability, and marketing

| ID | Requirement | Classification | Source |
|---|---|---|---|
| SEO-01 | Use an SEO-optimized on-page structure. | Explicit | Page 5 |
| SEO-02 | Generate dynamic XML sitemaps. | Explicit | Page 5 |
| SEO-03 | Add structured data for Organization, Course, and Event content. | Explicit | Page 5 |
| SEO-04 | Deliver fast page loads and sub-second routing. | Explicit | Pages 5 and 9 |
| SEO-05 | Target regional search intent such as "Tax Advisory Kenya" and "IS Audit Training East Africa." | Explicit | Page 5 |
| SEO-06 | Ensure public service, course, event, article, and whitepaper pages expose crawlable content and stable URLs. | Derived | Page 5 |
| SEO-07 | Provide editable page titles, meta descriptions, social-sharing metadata, canonical URLs, and index controls. | Derived from SEO requirement | Page 5 |
| SEO-08 | Ensure URL changes and retired content can be redirected without creating broken search results. | Derived | Page 5 |

The proposal does not specify analytics, conversion tracking, tag management, cookie consent, or search-performance reporting. These are decision items despite the stated growth targets.

## 11. UI, visual design, responsiveness, and accessibility

### 11.1 Brand system

The following brand colors and assets are project-owner requirements and supersede the navy/slate/amber palette proposed on page 8 of the source PDF.

| ID | Attribute | Requirement | Source |
|---|---|---|---|
| BRAND-01 | Main brand color | Use `#10386E` as the main brand color. | Project owner override |
| BRAND-02 | Secondary brand color | Use `#F79229` as the secondary brand color. | Project owner override |
| BRAND-03 | Logo colors | The supplied logo uses white and the secondary orange color. It does not use the main blue color and must not be recolored to the main brand color. | Project owner override |
| BRAND-04 | Logo asset | Use the supplied `/logo.png` asset from `apps/web/public/logo.png`. Preserve its transparent background, proportions, white artwork, and secondary-color artwork. | Project owner override |
| BRAND-05 | Favicon assets | Use the supplied `apps/web/public/favicon.png` and `apps/web/public/favicon.ico` assets for browser and application icon metadata. | Project owner override |
| BRAND-06 | Asset source | Logos, favicons, and other approved static brand assets must be loaded from `apps/web/public/`. Do not recreate or substitute them when an approved asset exists there. | Project owner override |
| BRAND-07 | Background | Use backgrounds that preserve sufficient contrast for both the white portions and secondary-orange portions of the logo. | Project owner override and WCAG dependency |
| BRAND-08 | Typography | Use Plus Jakarta Sans, Inter, and/or Open Sans as the web/mobile sans-serif system. | Page 8 |
| BRAND-09 | Aesthetic | Maintain a strict, premium corporate aesthetic appropriate to an institutional knowledge authority. | Page 8 |

The proposal names three font families but does not assign specific roles. The final type hierarchy requires design approval.

The original proposal colors `#0F172A`, `#1E3A8A`, and `#D97706` are superseded and must not be treated as the authoritative project palette.

### 11.2 Accessibility

| ID | Requirement | Classification | Source |
|---|---|---|---|
| A11Y-01 | Meet WCAG 2.1 Level AA. | Explicit | Page 8 |
| A11Y-02 | Maintain compliant color contrast. | Explicit | Page 8 |
| A11Y-03 | Support screen readers. | Explicit | Page 8 |
| A11Y-04 | Support keyboard navigation. | Explicit | Page 8 |
| A11Y-05 | Apply accessible labels, error messages, and focus management to forms, search, calendars, accordions, dialogs, payment flows, and other interactive components. | Derived from WCAG 2.1 AA | Page 8 |
| A11Y-06 | Provide text alternatives/captions or equivalent accessible treatment for meaningful image and video content. | Derived from WCAG 2.1 AA | Pages 5 and 8 |

### 11.3 Responsive behavior

| ID | Requirement | Classification | Source |
|---|---|---|---|
| RESP-01 | Deliver a mobile-responsive experience. | Explicit for learning; global web/mobile design intent | Pages 3-4 and 8 |
| RESP-02 | Keep navigation, search, forms, calendars, galleries, catalog content, and checkout usable on mobile and desktop. | Derived | Pages 3-8 |
| RESP-03 | Optimize the experience for regional visitors who may use mobile devices and variable network conditions. | Derived from market and performance goals | Pages 2-3 and 5 |

### 11.4 Frontend component architecture

All React components must live under `apps/web/src/components/`. Route modules should focus on route configuration, data loading, and composition rather than containing page-section implementations.

| ID | Requirement | Classification | Source |
|---|---|---|---|
| COMP-01 | Store all React components under `apps/web/src/components/`. | Project owner standard | Project owner |
| COMP-02 | Group page-specific components by page or feature beneath the components directory. For example, home-page components must live in `apps/web/src/components/home/`. | Project owner standard | Project owner |
| COMP-03 | Store site-wide layout components, such as the header, navigation, footer, shells, and layout sections, in `apps/web/src/components/layout/`. | Project owner standard | Project owner |
| COMP-04 | Store Shadcn UI primitives in `apps/web/src/components/ui/`. | Project owner standard | Project owner |
| COMP-05 | Build page and layout components by composing the Shadcn UI primitives available in `apps/web/src/components/ui/`. | Project owner standard | Project owner |
| COMP-06 | Reuse or extend an existing Shadcn UI primitive instead of creating a duplicate base control elsewhere in the source tree. | Project owner standard | Project owner |
| COMP-07 | Keep route files under `apps/web/src/routes/` thin by importing page components from the applicable `components/<page-or-feature>/` directory. | Derived implementation rule | Project owner |
| COMP-08 | Do not place page-specific, layout, or reusable UI component implementations directly inside route files or outside the components directory. | Project owner standard | Project owner |

Examples of the required organization:

```text
apps/web/src/
|-- components/
|   |-- home/
|   |   |-- hero.tsx
|   |   |-- practice-areas.tsx
|   |   `-- featured-courses.tsx
|   |-- layout/
|   |   |-- site-header.tsx
|   |   |-- site-footer.tsx
|   |   `-- site-shell.tsx
|   `-- ui/
|       |-- button.tsx
|       |-- card.tsx
|       `-- ...
`-- routes/
    `-- index.tsx
```

The filenames above illustrate placement only; the final component inventory should follow the approved page designs.

## 12. Performance and technical requirements

### 12.1 Public frontend

| ID | Requirement | Classification | Source |
|---|---|---|---|
| TECH-01 | Use a TypeScript React frontend with server-side rendering to provide fast page loads, sub-second routing, and strong SEO. The proposal specifically names Next.js. | Explicit | Page 9 |
| TECH-02 | Use an API-first backend capable of supporting authentication, payment callbacks, bookings, and LMS state. The proposal names Node.js/NestJS or Python/Django. | Explicit alternatives | Page 9 |
| TECH-03 | Use PostgreSQL for payment records, user accounts, and course enrollments. | Explicit | Page 9 |
| TECH-04 | Use Redis for sessions, timers, queues, and cached API responses where needed. | Explicit | Page 9 |
| TECH-05 | Host using AWS in EU Ireland or Cape Town. | Explicit alternatives | Page 9 |
| TECH-06 | Use Cloudflare edge caching across Nairobi, Kampala, and Dar es Salaam. | Explicit | Page 9 |
| TECH-07 | Use a CDN and caching strategy that supports fast regional delivery. | Explicit | Page 9 |

**Current implementation conflict:** the proposal explicitly names Next.js, while the current repository has been changed to TanStack Start. The project owner must confirm whether Next.js is mandatory or whether SSR, TypeScript, React, SEO, and performance are the actual acceptance criteria. This document does not resolve that conflict.

### 12.2 Video dependencies

Public pages may contain gallery videos and video testimonials. LMS video delivery additionally requires secure adaptive HLS streaming through Vimeo OTT or AWS CloudFront.

| ID | Requirement | Classification | Source |
|---|---|---|---|
| VIDEO-01 | Support video testimonials and gallery video content on public pages. | Explicit | Page 5 |
| VIDEO-02 | Avoid degrading page performance when loading public video content. | Derived from performance requirement | Pages 5 and 9 |
| VIDEO-03 | Use signed, time-limited, domain-locked URLs for protected LMS video content. | Explicit LMS dependency | Page 9 |

## 13. Security, privacy, and governance

| ID | Requirement | Classification | Source |
|---|---|---|---|
| SEC-01 | Comply with the Kenya Data Protection Act 2019. | Explicit | Page 9 |
| SEC-02 | Encrypt personal data at rest using AES-256. | Explicit | Page 9 |
| SEC-03 | Encrypt data in transit using TLS 1.3. | Explicit | Page 9 |
| SEC-04 | Maintain immutable audit logs for user logins, payment receipts, and administrative changes. | Explicit | Page 9 |
| SEC-05 | Require multi-factor authentication for Content Managers, Finance staff, and System Administrators. | Explicit admin dependency | Page 9 |
| SEC-06 | Protect payment callbacks and booking/enrollment completion from tampering and replay. | Derived | Pages 6 and 9 |
| SEC-07 | Limit public certificate verification output to approved data. | Derived | Pages 7 and 9 |
| SEC-08 | Apply appropriate retention, deletion, consent, and data-subject request handling to public forms and subscriptions. | Derived from KDPA compliance | Page 9 |

The proposal does not define privacy-policy content, cookie behavior, records of consent, retention periods, data-processing agreements, cross-border data-transfer controls, or incident response.

## 14. Content inventory required before launch

The public website cannot be completed without at least the following approved content:

- final brand logo, seal, and brand assets;
- corporate positioning and home hero copy;
- practice-area descriptions and service methodologies;
- institutional impact metrics and their evidence/source;
- leadership and senior faculty profiles, portraits, and biographies;
- governance-model content;
- accreditation names, status, and evidence;
- careers content and application/contact process;
- corporate-training and executive-masterclass content;
- initial course catalog and course-detail content;
- event/workshop schedule, venue/virtual details, capacity, and pricing;
- regional office addresses and contact details;
- Google Maps location identifiers;
- sales WhatsApp number(s) and routing ownership;
- testimonials with publication permission;
- gallery images/videos with captions and usage rights;
- initial blogs, policy briefs, research papers, and whitepapers;
- FAQs for accreditation, bookings, and payments;
- newsletter consent copy and mailing-list configuration;
- booking policies, payment terms, refunds/cancellations, and privacy notices;
- certificate verification display rules;
- SEO titles, descriptions, keywords/topics, and redirect plan.

This list is derived from the explicit page and feature requirements in pages 2-9.

## 15. Public-site acceptance checklist

The public website is functionally complete when:

1. All seven primary public areas are reachable through clear navigation.
2. Home contains the hero, positioning, practice areas, featured courses, impact metrics, testimonials, and insights.
3. All eight consulting areas have approved public content and conversion paths.
4. Capacity Building exposes corporate training, masterclasses, and a categorized course catalog.
5. Events can be viewed in list and calendar/grid formats and support registration.
6. Resources support articles, whitepapers/policy briefs, filterable galleries, and categorized FAQs.
7. Contact exposes regional locations, inquiry form, Google Map, and WhatsApp.
8. Global search returns services, courses, posts, and whitepapers.
9. Corporate training, consultancy, workshop, and custom training workflows operate end to end.
10. Applicable M-Pesa, card, bank-transfer, currency, invoice, receipt, and callback flows are verified.
11. Workshop customers receive QR-coded tickets.
12. Public certificate URLs can resolve a unique certificate identifier safely.
13. Newsletter subscription is integrated with the selected provider.
14. Transactional emails are delivered for applicable public workflows.
15. CMS users can manage the required public content without code changes.
16. Dynamic XML sitemaps and Organization, Course, and Event schema are present.
17. The site meets WCAG 2.1 AA, keyboard, screen-reader, and contrast requirements.
18. The site is usable on mobile and desktop and meets agreed performance targets.
19. Public personal-data collection complies with approved KDPA controls.
20. Production deployment, CDN, caching, monitoring, and security checks are complete.
21. The implemented palette uses main `#10386E` and secondary `#F79229`; superseded proposal colors are not treated as brand tokens.
22. The supplied white/orange logo and favicon assets from `apps/web/public/` are used without unauthorized recoloring or substitution.
23. All React components are organized under `apps/web/src/components/`, including page-specific and layout subdirectories.
24. Page and layout components compose Shadcn UI primitives from `apps/web/src/components/ui/`, and route files remain thin.

## 16. Explicitly excluded from this public-page requirements document

The following proposal scope belongs primarily to authenticated LMS or internal administration and is not expanded here:

- personalized learner dashboard;
- course video player and resume state;
- in-browser course PDF viewer;
- quizzes, scoring, and retake controls;
- assignment upload and grading;
- trainer upload studio and grading desk;
- cohort progress monitor;
- finance reconciliation screens;
- user directory and account-status administration;
- RBAC administration;
- database backups;
- internal system audit-log viewer.

These systems still provide data or workflows used by public course discovery, payments, certificate verification, and CMS operations.

## 17. Future requirements

The proposal defers these capabilities:

| ID | Future capability | Timing | Public-site impact | Source |
|---|---|---|---|---|
| FUT-01 | Corporate compliance dashboard for HR heads to track completion and compliance metrics. | Year 2 | Requires a corporate portal entry point and B2B account model. | Page 10 |
| FUT-02 | AI learning and tax assistant trained on East African tax codes, GRC guidance, and course material. | Year 2 | May add a public or authenticated 24/7 assistant interface. | Page 10 |
| FUT-03 | Native React Native mobile application with offline course video downloads. | Year 2 | Requires consistent APIs and identity across web and mobile. | Page 10 |
| FUT-04 | Localized regional subdomains with native UGX, TZS, and RWF settlement. | Year 3 | Requires localization, regional SEO, currency, payment, and content architecture. | Page 10 |

## 18. Decisions and ambiguities requiring confirmation

### 18.1 Critical implementation decisions

1. Is Next.js mandatory, or may TanStack Start satisfy the SSR/React/TypeScript/SEO requirements?
2. What CMS will be used, and what editorial workflow is required?
3. Is the LMS embedded in the same application/domain or linked as a separate portal?
4. Which payment gateway will be selected: Flutterwave, Stripe, or both?
5. Which calendar provider will power consultancy bookings?
6. Which newsletter/email provider will be selected: Mailchimp, SendGrid, or a split between marketing and transactional email?
7. Will AWS Ireland or Cape Town be the primary region?
8. Will Vimeo OTT or AWS CloudFront provide protected video delivery?

### 18.2 Missing public content and behavior definitions

1. Final global navigation, footer, utility links, and mobile navigation.
2. Course-detail fields, enrollment prerequisites, schedules, instructors, and checkout rules.
3. Event-detail fields, waitlists, capacity locking, cancellation, and ticket validation.
4. Service-detail template and required methodology/case-study fields.
5. Search ranking, filtering, typo tolerance, and no-result behavior.
6. Whitepaper download access: open, email-gated, or authenticated.
7. Inquiry-form fields, routing, notifications, SLAs, and anti-spam controls.
8. Newsletter consent, confirmation, preference, and unsubscribe behavior.
9. Public certificate fields and invalid/revoked certificate behavior.
10. Refunds, cancellations, taxes, invoice numbering, and receipt requirements.
11. Analytics, conversion events, cookie consent, and performance monitoring.
12. Content language, localization, and regional variants.
13. Exact measurable thresholds for page load speed and "sub-second" routing.
14. Browser/device support matrix.
15. Production uptime, backup, recovery, monitoring, and support SLAs.

## 19. Delivery sequence from the proposal

The source proposal defines a 13-week, five-phase program but leaves individual phase durations as placeholders:

1. **Discovery & UI/UX:** requirements finalization, wireframes, high-fidelity Figma design, and content architecture approval.
2. **Core Web Development:** public frontend, consulting pages, booking forms, blog, news, and CMS.
3. **LMS & Payment Integration:** student/trainer portals, quizzes, video, M-Pesa, and cards.
4. **Testing & Content Ingestion:** UAT, penetration testing, initial course loading, and staff training.
5. **Launch & Hypercare:** DNS cutover, production deployment, marketing launch, and 60 days of hypercare.

Source: pages 9-10.
