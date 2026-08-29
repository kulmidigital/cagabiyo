import type { CSSProperties } from 'react'
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
import { cn } from '@/lib/utils'
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
import type { Person } from '@/lib/content/institution'

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
        {/* Heading across the top, prose in two balanced columns beneath it.
            The heading used to sit in a five-column well of its own beside the
            copy, which left a tall empty block down the left of every viewport
            wide enough to split — the copy is always longer than a heading, so
            the two never balanced. */}
        <SectionHeading eyebrow="Who we are" title="The Practice" />

        {/* The overview and the commitment are the client's own words. The
            paragraphs that stood here were written for the site and made
            claims the corporate overview does not — they are gone.

            Lead paragraph full width on a readable measure, then the
            supporting prose flows across two columns. A two-column grid put a
            short lead against a long stack and tipped straight back into the
            lopsided shape; CSS columns balance their own height. */}
        <div className="mt-8 sm:mt-10">
          <p className="max-w-4xl text-lg leading-relaxed text-ink-900">
            {institution.overview}
          </p>

          <div className="mt-6 leading-relaxed text-muted-foreground md:columns-2 md:gap-14">
            <p className="mb-5">
              The practice runs on two mandates. Advisory engagements handle
              technical execution, regulatory interface and risk mitigation
              directly, so client leadership can focus on core growth.
              NITA-accredited training then builds the practical capability to
              run it — programmes tailored to organizational priorities,
              regulatory expectations and identified capability gaps.
            </p>
            <p className="mb-5">
              As an accredited KRA partner under the Ushuru Mashinani Service
              Partner initiative, CaliberCode is a trusted channel for
              accessible tax and compliance support — assisting taxpayers,
              businesses and institutions with tax registration, filing support,
              statutory reconciliations and regulatory alignment. Compliance
              work is executed here rather than referred on.
            </p>
            <p className="mb-0">{institution.commitment}</p>
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
        {/* Vision and mission share a row as equals; the values run the full
            width below. Previously the mission column carried the values too,
            so it ran several times the height of the vision beside it. */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow tone="ink">Vision</Eyebrow>
            <p className="display-md mt-5 text-white">{institution.vision}</p>
          </div>

          <div>
            <Eyebrow tone="ink">Mission</Eyebrow>
            <p className="mt-5 text-lg leading-relaxed text-ink-100">
              {institution.mission}
            </p>
          </div>
        </div>

        {/* The overview defines each value, so they are no longer bare chips —
            a one-word chip drops the half that carries meaning. */}
        <div className="mt-12 border-t border-white/10 pt-10 sm:mt-14">
          <p className="text-[0.6875rem] font-semibold tracking-widest text-signal-400 uppercase">
            Core values
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
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
    </Section>
  )
}

/** Who the practice serves, and the stated reasons to choose it. */
export function WhoWeServe() {
  return (
    <Section id="who-we-serve" tone="sand">
      <div className="shell">
        <SectionHeading eyebrow="Who we serve" title="Client Segments" />

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
  const lead = leadership.find((person) => person.lead)
  const team = leadership.filter((person) => !person.lead)

  return (
    <Section id="leadership" tone="sand">
      <div className="shell">
        <SectionHeading eyebrow="Leadership & faculty" title="Our Team" />

        {/* One pattern for both card types: a white shell with a thin pad, and
            the copy on a darker inset panel inside it. The pad is what makes
            the inset read — the shell shows as a fine, even margin around the
            panel and down the gap between panel and portrait.

            No `h-full` on any portrait. Height comes from the 4:5 ratio alone,
            so nothing beside it can stretch the crop; the facing panel takes
            the slack instead. */}
        {lead ? (
          <article className="mt-8 border border-border bg-white p-3 sm:mt-10">
            <div className="grid gap-3 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Portrait
                  person={lead}
                  className="aspect-4/5 max-h-96 sm:max-h-none"
                />
              </div>

              <div className="border border-border bg-sand-100 p-6 sm:p-8 lg:col-span-8">
                <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                  {lead.role}
                </p>
                <h3 className="display-md mt-3 text-ink-900">{lead.name}</h3>
                {/* Set as one rule-separated line rather than badges, the way
                    the qualifications are written on a signature block. The
                    pipes are dimmed so they read as separators and the
                    qualifications carry the weight. */}
                <p className="mt-3 text-sm font-semibold text-signal-800">
                  {lead.credentials.map((credential, index) => (
                    <span key={credential}>
                      {index > 0 ? (
                        <span className="text-ink-300" aria-hidden="true">
                          {' | '}
                        </span>
                      ) : null}
                      {credential}
                    </span>
                  ))}
                </p>

                <p className="mt-6 border-t border-border pt-6 leading-relaxed text-muted-foreground">
                  {lead.bio[0]}
                </p>
              </div>
            </div>

            {lead.bio.length > 1 ? (
              <div className="mt-3 border border-border bg-sand-100 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8 md:columns-2 md:gap-10 lg:columns-3">
                {lead.bio.slice(1).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </article>
        ) : null}

        {/* One column, not two. Each card sticks under the header as you
            reach it and the next slides over the top, so the roster reads as a
            stack being dealt rather than a grid.

            Full width lets the portrait match the panel height honestly: the
            copy is short and wide here, so `h-full` gives a sane portrait crop
            instead of the sliver it produced when the facing column was tall. */}
        <div className="mt-6 space-y-6">
          {team.map((person, index) => (
            <div
              key={person.name}
              className="stack-card"
              style={{ '--stack-index': index } as CSSProperties}
            >
              <article className="border border-border bg-white p-3">
                <div className="grid gap-3 sm:grid-cols-[14rem_minmax(0,1fr)]">
                  <Portrait
                    person={person}
                    className="aspect-4/5 max-h-80 sm:aspect-auto sm:h-full sm:max-h-none"
                  />

                  <div className="flex flex-col border border-border bg-sand-100 p-6 sm:p-7">
                    <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                      {person.role}
                    </p>
                    <h3 className="mt-2 text-xl leading-snug font-bold text-ink-900">
                      {person.name}
                    </h3>
                    <div className="flex-1">
                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {person.bio[0]}
                      </p>
                    </div>

                    <p className="mt-5 border-t border-border pt-4 text-sm font-semibold text-ink-700">
                      {person.credentials.map((credential, position) => (
                        <span key={credential}>
                          {position > 0 ? (
                            <span className="text-ink-300" aria-hidden="true">
                              {' | '}
                            </span>
                          ) : null}
                          {credential}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/**
 * Headshot, or initials where none was supplied.
 *
 * The supplied portraits carry different backgrounds — plain white, grey, a
 * brick wall — so the frame does the unifying: a fixed ratio, cropped from the
 * top so the crop takes the body rather than the face.
 */
function Portrait({
  person,
  className,
}: Readonly<{ person: Person; className?: string }>) {
  if (!person.photo) {
    const initials = person.name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')

    return (
      <div
        className={cn(
          'flex items-center justify-center border border-border bg-sand-100 text-2xl font-bold tracking-tight text-ink-300',
          className,
        )}
        aria-hidden="true"
      >
        {initials}
      </div>
    )
  }

  return (
    <img
      src={person.photo}
      alt={`${person.name}, ${person.role}`}
      loading="lazy"
      decoding="async"
      className={cn(
        'w-full border border-border bg-sand-100 object-cover object-top',
        className,
      )}
    />
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
          title="Governance Model"
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
          title="Standing & Credentials"
        />

        <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-2 lg:gap-10">
          {accreditations.map((item) => (
            <div key={item.abbreviation}>
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
        </div>

        {/* Its own full-width block. Inside the card grid it was pinned to
            column seven, so it wrapped onto a fresh row and left the left half
            of that row empty. */}
        <div className="mt-12 border-t border-border pt-10 sm:mt-14">
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
    </Section>
  )
}

export function Careers() {
  return (
    <Section id="careers" tone="sand">
      <div className="shell">
        <SectionHeading eyebrow="Careers" title="Working With Us" />

        <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <ul className="space-y-3">
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

          <div>
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
