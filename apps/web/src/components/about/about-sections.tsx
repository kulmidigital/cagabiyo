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
  leadership,
  vacancies,
} from '@/lib/content/institution'

const facts = [
  {
    label: 'Founded on',
    value: 'Practitioner faculty',
    detail: 'Every trainer is a working adviser.',
  },
  {
    label: 'Operating across',
    value: `${markets.length} markets`,
    detail: markets.join(', '),
  },
  {
    label: 'Two mandates',
    value: 'Advise & train',
    detail: 'Board advisory and professional certification.',
  },
  {
    label: 'Credentials',
    value: 'QR-verifiable',
    detail: 'Every certificate resolves to a public check.',
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

          <div className="space-y-5 leading-relaxed text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-7">
            <p>
              CaliberCode began as an advisory practice. Engagements kept
              repeating: a tax dispute resolved or a risk register rebuilt, then
              the same gap reopening a year or two later because the people
              running the framework had not been trained on it.
            </p>
            <p>
              The training arm was built on the same faculty. The partner who
              defends a transfer pricing position before a revenue authority
              also teaches the transfer pricing certificate.
            </p>
            <p className="text-ink-900">
              The institution now runs two mandates: advisory engagements for
              boards and executives, and professional training across the
              region.
            </p>
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
        <SectionHeading eyebrow="Accreditation" title="Professional bodies." />

        <div className="rule-grid mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {accreditations.map((item) => (
            <div key={item.abbreviation} className="bg-white p-6 sm:p-8">
              <img
                src={item.logo}
                alt={`${item.body} (${item.abbreviation})`}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto max-w-36 object-contain sm:h-10"
              />
              <h3 className="mt-6 text-sm font-bold text-ink-900">
                {item.body}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.scope}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          Each relationship, and the recognition it carries, is being confirmed
          ahead of launch.
        </p>
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
