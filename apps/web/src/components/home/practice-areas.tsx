import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

import { SectionHeading } from '@/components/common/section'
import { ButtonLink } from '@/components/common/button-link'
import { SmartLink } from '@/components/common/smart-link'
import { services } from '@/lib/content/services'

export function PracticeAreas() {
  return (
    <section className="surface-ink relative overflow-hidden py-6 sm:py-10">
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          tone="ink"
          eyebrow="Advisory"
          title="Eight advisory practices."
        />

        <div className="rule-grid-ink mt-8 grid sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <SmartLink
              key={service.slug}
              href={`/services/${service.slug}`}
              className="edge-card group relative flex flex-col overflow-hidden p-6 transition-colors hover:bg-white/4 sm:p-7"
            >
              <span
                className="numeric pointer-events-none absolute -top-3 right-3 text-6xl font-bold text-white/4 transition-colors duration-500 group-hover:text-signal-500/12"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="relative text-lg leading-snug font-bold text-white">
                {service.name}
              </h3>

              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-300">
                {service.summary}
              </p>

              <span className="relative mt-7 flex items-center justify-between">
                <span
                  className="h-px w-8 bg-white/20 transition-all duration-500 ease-out group-hover:w-14 group-hover:bg-signal-500"
                  aria-hidden="true"
                />
                <FiArrowUpRight
                  className="size-4 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-500"
                  aria-hidden="true"
                />
              </span>
            </SmartLink>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <ButtonLink
            href="/services"
            className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
          >
            All practice areas
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
