import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiMapPin,
} from 'react-icons/fi'

import {
  Section,
  SectionHeading,
  IndexLabel,
  Eyebrow,
} from '@/components/common/section'
import { SmartLink } from '@/components/common/smart-link'
import { ButtonLink } from '@/components/common/button-link'
import { markets } from '@/lib/site'
import {
  accreditations,
  governanceModel,
  institution,
  coreValues,
  whyCaliberCode,
  leadership,
  practitionerCredentials,
  segments,
  vacancies,
} from '@/lib/content/institution'

const facts = [
  {
    label: 'Accredited By',
    value: 'NITA & KRA',
    detail:
      'NITA accredited institution and KRA Ushuru Mashinani service partner.',
  },
  {
    label: 'Operating Across',
    value: `${markets.length} markets`,
    detail: markets.join(', '),
  },
  {
    label: 'Two Mandates',
    value: 'Advise & train',
    detail: 'Strategic advisory and accredited executive training.',
  },
  {
    label: 'Led By',
    value: 'Credentialed specialists',
    detail: 'CPA, CFE, CISA, CIA, CRMA, CCCS and ACAMS holders.',
  },
]

export function AboutOverview() {
  return (
    <Section>
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="display-md mt-4 text-ink-900 sm:mt-6">
              How CaliberCode is organised.
            </h2>
          </div>

          {/* The overview and the commitment are the client's own words. The
              paragraphs that stood here were written for the site and made
              claims the corporate overview does not — they are gone. */}
          <div className="space-y-5 leading-relaxed text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-7">
            <p className="text-ink-900">{institution.overview}</p>
            <p>
              The practice runs on two mandates. Advisory engagements handle
              technical execution, regulatory interface and risk mitigation
              directly, so client leadership can focus on core growth.
              NITA-accredited training then builds the practical capability to
              run it — programmes tailored to organizational priorities,
              regulatory expectations and identified capability gaps.
            </p>
            <p>{institution.commitment}</p>
          </div>
        </div>

        <div className="rule-grid mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((item) => (
            <div key={item.label} className="bg-white p-6 sm:p-8">
              <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {item.label}
              </p>
              <p className="mt-3 text-lg font-bold text-ink-900 sm:text-xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/** Vision, mission and the five core values, as the corporate overview states them. */
export function VisionMission() {
  return (
    <Section id="vision" tone="ink">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow tone="ink">Vision</Eyebrow>
            <p className="display-md mt-5 text-white">{institution.vision}</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow tone="ink">Mission</Eyebrow>
            <p className="mt-5 text-lg leading-relaxed text-ink-100">
              {institution.mission}
            </p>

            {/* The overview defines each value, so they are no longer bare
                chips — a one-word chip drops the half that carries meaning. */}
            <p className="mt-10 text-[0.6875rem] font-semibold tracking-widest text-signal-400 uppercase">
              Core values
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {coreValues.map((value) => (
                <li
                  key={value.name}
                  className="border-l-2 border-signal-500 pl-4"
                >
                  <p className="text-sm font-bold text-white">{value.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-200">
                    {value.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

/** Who the practice serves, and the stated reasons to choose it. */
export function WhoWeServe() {
  return (
    <Section id="who-we-serve" tone="sand">
      <div className="shell">
        <SectionHeading eyebrow="Who we serve" title="Three client segments." />

        <div className="rule-grid mt-8 grid sm:mt-10 lg:grid-cols-3">
          {segments.map((segment, index) => (
            <div key={segment.name} className="bg-white p-6 sm:p-8">
              <IndexLabel n={index + 1} />
              <h3 className="mt-4 text-base leading-snug font-bold text-ink-900">
                {segment.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {segment.detail}
              </p>
            </div>
          ))}
        </div>

        {/* "Why CaliberCode?" — six stated reasons, replacing the three
            outcome claims the corporate overview does not make. */}
        <div className="mt-12 border-t border-border pt-10">
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Why CaliberCode
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            {whyCaliberCode.map((item) => (
              <div
                key={item.name}
                className="border-l-2 border-signal-500 pl-5"
              >
                <h3 className="text-sm font-bold text-ink-900">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export function LeadershipGrid() {
  return (
    <Section id="leadership" tone="sand">
      <div className="shell">
        <SectionHeading
          eyebrow="Leadership & faculty"
          title="Partners and senior faculty."
        />

        <div className="rule-grid mt-8 grid sm:mt-10 lg:grid-cols-2">
          {leadership.map((person, index) => (
            <article
              key={person.name}
              className="edge-card group bg-white p-6 sm:p-8"
            >
              <div className="flex items-baseline gap-4">
                <IndexLabel n={index + 1} />
                <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                  {person.role}
                </p>
              </div>

              <h3 className="mt-4 text-xl leading-snug font-bold text-ink-900">
                {person.name}
              </h3>

              <p className="mt-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {person.discipline}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {person.bio}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-5">
                {person.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="border border-border px-2 py-1 text-[0.625rem] font-semibold tracking-[0.08em] text-ink-700 uppercase"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function GovernanceModel() {
  return (
    <Section id="governance" tone="ink">
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="shell relative">
        <SectionHeading
          tone="ink"
          eyebrow="Governance"
          title="How the institute is governed."
        />

        <ol className="rule-grid-ink mt-8 grid sm:mt-10 sm:grid-cols-2">
          {governanceModel.map((organ, index) => (
            <li key={organ.name} className="p-6 sm:p-8">
              <div className="flex items-baseline gap-4">
                <IndexLabel n={index + 1} tone="ink" />
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {organ.name}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-200">
                {organ.mandate}
              </p>
              <p className="mt-4 border-l-2 border-signal-500 pl-4 text-xs leading-relaxed text-ink-300">
                {organ.composition}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

export function AccreditationList() {
  return (
    <Section id="accreditation">
      <div className="shell">
        <SectionHeading
          eyebrow="Accreditation"
          title="Accredited, and led by credentialed practitioners."
        />

        <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-12 lg:gap-16">
          {accreditations.map((item) => (
            <div key={item.abbreviation} className="lg:col-span-5">
              <div className="edge-card border border-border bg-white p-6 sm:p-8">
                {/* No mark supplied for the KRA partnership, so the
                    abbreviation is set as type at the same height rather than
                    leaving a broken image or a ragged card. */}
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`${item.body} (${item.abbreviation})`}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-auto max-w-36 object-contain sm:h-12"
                  />
                ) : (
                  <p className="flex h-10 items-center text-2xl font-bold tracking-tight text-ink-900 sm:h-12 sm:text-3xl">
                    {item.abbreviation}
                  </p>
                )}
                <h3 className="mt-6 text-base font-bold text-ink-900">
                  {item.body}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.scope}
                </p>
                <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed font-medium text-ink-800">
                  {item.benefit}
                </p>
              </div>
            </div>
          ))}

          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Practitioner certifications</Eyebrow>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {practitionerCredentials.map((credential) => (
                <li
                  key={credential.abbreviation}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5"
                >
                  <span className="numeric w-28 flex-none text-sm font-bold text-ink-900">
                    {credential.abbreviation}
                  </span>
                  <span className="flex-1 text-sm text-muted-foreground">
                    {credential.name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Every engagement is led by a specialist holding the relevant
              qualification for the work.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Careers() {
  return (
    <Section id="careers" tone="sand">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Careers" title="Working at CaliberCode." />

            <ul className="mt-8 space-y-3">
              {[
                'Client work and teaching in the same role',
                'Study support toward CPA, CIA, CISA, ADIT and CFE',
                'Regional exposure across five markets',
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-ink-800"
                >
                  <FiCheck
                    className="mt-0.5 size-4 flex-none text-signal-600"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-border bg-white">
              <p className="border-b border-border px-5 py-4 text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:px-6">
                Open positions
              </p>
              <ul className="divide-y divide-border">
                {vacancies.map((role) => (
                  <li key={role.title}>
                    <SmartLink
                      href="/contact?intent=careers"
                      className="edge-card group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-sand-50 sm:px-6 sm:py-5"
                    >
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-ink-900">
                          {role.title}
                        </h3>
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>{role.team}</span>
                          <span className="inline-flex items-center gap-1.5">
                            <FiMapPin className="size-3" aria-hidden="true" />
                            {role.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <FiClock className="size-3" aria-hidden="true" />
                            {role.type}
                          </span>
                        </p>
                      </div>
                      <FiArrowUpRight
                        className="size-4 flex-none text-ink-300 transition-colors group-hover:text-signal-600"
                        aria-hidden="true"
                      />
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <ButtonLink
            href="/contact?intent=careers"
            className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
          >
            Send a speculative application
            <FiArrowRight
              className="size-3.5"
              data-icon="inline-end"
              aria-hidden="true"
            />
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
