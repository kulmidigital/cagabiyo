import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { SectionHeading, IndexLabel } from '@/components/common/section'
import { SmartLink } from '@/components/common/smart-link'
import { ButtonLink } from '@/components/common/button-link'
import { photos } from '@/lib/images'
import { focusAreas } from '@/lib/content/training'

const routes = [
  {
    title: 'Corporate Training',
    href: '/capacity-building/corporate-request',
    photo: photos.workshopRoom,
    body: 'Cohort programmes for your team, delivered on-site, virtually or at a venue we arrange. Tell us the headcount and modules and the request returns a pro-forma invoice.',
    points: [
      'On-site, virtual or off-site',
      'Pro-forma invoice on submission',
      'Cohort progress reporting',
    ],
  },
  {
    title: 'Executive Masterclasses',
    href: '/capacity-building#masterclasses',
    photo: photos.boardroomWide,
    body: 'Short, intensive sessions for directors and C-suite leaders. Small rooms, practitioner faculty, and material drawn from live engagements.',
    points: [
      'Board and C-suite cohorts',
      'Capped at 20–40 seats',
      'In person and hybrid',
    ],
  },
  {
    title: 'E-Learning Catalog',
    href: '/capacity-building/courses',
    photo: photos.tabletGlass,
    body: 'Self-paced and blended certificates you can start today, priced in KES and USD, with a QR-verifiable credential on completion.',
    points: [
      'Self-paced and blended',
      'KES and USD pricing',
      'Verifiable digital credential',
    ],
  },
]

export function CapacityOverview() {
  return (
    <section id="capacity" className="relative py-6 sm:py-10">
      <div className="shell">
        <SectionHeading
          eyebrow="Capacity building"
          title="Three ways to train with us."
        />

        <div className="rule-grid mt-8 grid sm:mt-10 lg:grid-cols-3">
          {routes.map((route, index) => (
            <SmartLink
              key={route.title}
              href={route.href}
              className="edge-card group flex flex-col bg-white transition-colors hover:bg-sand-50"
            >
              <div className="photo-wash relative aspect-16/10 overflow-hidden">
                <Photo
                  photo={route.photo}
                  width={800}
                  ratio={16 / 10}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  crop="entropy"
                />
              </div>

              <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                <span
                  className="numeric pointer-events-none absolute -top-2 right-4 text-6xl font-bold text-ink-900/4 transition-colors duration-500 group-hover:text-signal-500/12"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="relative text-lg leading-snug font-bold text-ink-900">
                  {route.title}
                </h3>

                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {route.body}
                </p>

                <ul className="relative mt-6 space-y-2.5 border-t border-border pt-5">
                  {route.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-ink-800"
                    >
                      <FiCheck
                        className="mt-0.5 size-3.5 flex-none text-signal-600"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-7 flex items-center justify-between">
                  <span
                    className="h-px w-8 bg-ink-200 transition-all duration-500 ease-out group-hover:w-14 group-hover:bg-signal-500"
                    aria-hidden="true"
                  />
                  <FiArrowUpRight
                    className="size-4 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-500"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </SmartLink>
          ))}
        </div>

        <div
          id="taxonomy"
          className="mt-8 border border-border bg-sand-50 p-6 sm:mt-10 sm:p-8"
        >
          <p className="eyebrow text-signal-700">Training taxonomy</p>
          <h3 className="mt-4 text-2xl font-bold text-ink-900">
            Five Training Focus Areas
          </h3>

          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
            {focusAreas.map((area) => (
              <li key={area.id}>
                <SmartLink
                  href="/capacity-building/courses"
                  className="group flex items-baseline gap-3 border-b border-border/70 py-3 transition-colors hover:border-signal-500"
                >
                  <IndexLabel n={area.id} className="flex-none" />
                  <span className="text-sm font-medium text-ink-800 transition-colors group-hover:text-signal-700">
                    {area.name}
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-end">
          <ButtonLink
            href="/capacity-building/builder"
            className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
          >
            Build a custom programme
            <FiArrowRight
              className="size-3.5"
              data-icon="inline-end"
              aria-hidden="true"
            />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
