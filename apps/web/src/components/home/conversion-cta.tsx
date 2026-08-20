import { FiArrowRight } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { ButtonLink } from '@/components/common/button-link'
import { photos } from '@/lib/images'

const paths = [
  {
    eyebrow: 'For boards & executives',
    title: 'Book An Advisory Session',
    body: 'Discuss a disputed assessment, a governance gap or a licensing decision with the partner who would lead the work.',
    href: '/contact?intent=advisory',
    cta: 'Request a session',
    photo: photos.execChair,
  },
  {
    eyebrow: 'For HR & L&D',
    title: 'Request Corporate Training',
    body: 'Submit headcount, modules and delivery mode to receive a pro-forma invoice and a proposed cohort schedule.',
    href: '/capacity-building/corporate-request',
    cta: 'Start a request',
    photo: photos.teamCouch,
  },
]

export function ConversionCta() {
  return (
    <section className="surface-ink relative overflow-hidden py-6 sm:py-10">
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <div className="rule-grid-ink grid lg:grid-cols-2">
          {paths.map((path) => (
            <div
              key={path.title}
              className="group relative isolate flex flex-col overflow-hidden p-8 lg:p-10"
            >
              <div className="absolute inset-0 -z-10">
                <Photo
                  photo={path.photo}
                  alt=""
                  width={900}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="scale-105 opacity-25 transition-transform duration-1000 ease-out-expo group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/92 to-ink-950/70" />
              </div>

              <p className="eyebrow text-signal-400">{path.eyebrow}</p>

              <h2 className="display-md mt-5 max-w-sm text-white">
                {path.title}
              </h2>

              <p className="mt-4 max-w-md flex-1 text-sm leading-relaxed text-ink-200">
                {path.body}
              </p>

              <ButtonLink
                href={path.href}
                className="mt-7 w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto sm:self-start"
              >
                {path.cta}
                <FiArrowRight
                  className="size-3.5"
                  data-icon="inline-end"
                  aria-hidden="true"
                />
              </ButtonLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
