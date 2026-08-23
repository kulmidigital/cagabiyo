import { FiArrowRight } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { ButtonLink } from '@/components/common/button-link'
import { photos } from '@/lib/images'

export function HomeHero() {
  return (
    <section className="surface-ink relative flex min-h-svh items-center overflow-hidden">
      <div className="grain absolute inset-0" aria-hidden="true" />

      {/* mt clears the fixed header (h-16 / lg:h-20 plus its inset) — padding
          stays on the standard py-6 sm:py-10 rhythm. */}
      <div className="shell relative mt-20 w-full py-6 sm:py-10 lg:mt-25">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h1 className="display-lg text-white">
              Advisory and professional training across{' '}
              <span className="text-signal-500">East Africa</span>.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-200">
              ROI-focused solutions that optimize workforce efficiency,
              streamline operations, and embed compliance — integrating
              governance, risk, audit, fraud prevention and tax.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href="/contact?intent=advisory"
                size="lg"
                className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
              >
                Book an advisory session
                <FiArrowRight
                  className="size-4"
                  data-icon="inline-end"
                  aria-hidden="true"
                />
              </ButtonLink>
              <ButtonLink
                href="/capacity-building/courses"
                size="lg"
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 hover:text-white"
              >
                View the catalog
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div
                className="absolute -top-4 -right-4 bottom-6 left-8 border border-signal-500/35"
                aria-hidden="true"
              />
              <div className="photo-wash photo-wash-soft relative h-[34vh] min-h-56 sm:h-[38vh] lg:h-[58vh] lg:max-h-132">
                <Photo
                  photo={photos.boardroomWide}
                  priority
                  width={1200}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  crop="entropy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
