import type { CSSProperties } from 'react'
import { FiArrowRight } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { ButtonLink } from '@/components/common/button-link'
import { TaglineMarkIcon, taglineMarks } from '@/components/home/tagline-marks'
import { photos } from '@/lib/images'
import { site } from '@/lib/site'

export function HomeHero() {
  return (
    <section className="surface-light relative flex min-h-svh items-center overflow-hidden">
      <div className="grain grain-soft absolute inset-0" aria-hidden="true" />

      {/* mt clears the fixed header (h-16 / lg:h-20 plus its inset) — padding
          stays on the standard py-6 sm:py-10 rhythm. */}
      <div className="shell relative mt-20 w-full py-6 sm:py-10 lg:mt-25">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h1 className="display-lg text-ink-900">
              Advisory And Professional Training Across{' '}
              <span className="text-signal-700">East Africa</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
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
                className="border-ink-900/20 text-ink-900 hover:bg-ink-900/5 hover:text-ink-900"
              >
                View the catalog
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div
                className="absolute -top-4 -right-4 bottom-6 left-8 border border-signal-500/45"
                aria-hidden="true"
              />
              {/* The full-strength wash, not photo-wash-soft: the tagline now
                  sits on this image and needs the deeper scrim at the foot of
                  it to stay legible over whatever the photograph is doing. */}
              <div className="photo-wash relative h-[34vh] min-h-56 sm:h-[38vh] lg:h-[58vh] lg:max-h-132">
                <Photo
                  photo={photos.boardroomWide}
                  priority
                  width={1200}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  crop="entropy"
                />

                {/* z-10 lifts this over .photo-wash::after — the gradient is a
                    generated last child, so without it the scrim would paint
                    on top of the words. Inset to the image box, which clips
                    the animation. */}
                {/* A deeper scrim over the lower half of the picture. The
                    photo-wash gradient is tuned for a photograph with nothing
                    on it; the tagline needs more separation than that, and
                    only at the foot where it sits. z-10 clears
                    .photo-wash::after, which is a generated last child and
                    would otherwise paint over this. */}
                <div
                  className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-ink-950/90 via-ink-950/45 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 z-10 flex items-end p-6 sm:p-8">
                  {/* All three lines occupy one grid cell, so only the line
                      whose turn it is shows and the tagline changes in place.
                      The gap only takes effect under reduced motion, where the
                      lines leave the shared cell and stack. */}
                  <div className="grid w-full gap-2">
                    {site.tagline.split(' ').map((raw, index) => {
                      const word = raw.replace(/\.$/, '')
                      const mark = taglineMarks[word]
                      return (
                        <div
                          key={word}
                          className="tagline-line flex items-center gap-1.5"
                          style={{ '--tagline-index': index } as CSSProperties}
                        >
                          <p className="font-display text-3xl leading-[1.08] font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            <span className="tagline-word">
                              <span>
                                {word}
                                <span className="text-signal-500">.</span>
                              </span>
                            </span>
                          </p>
                          {mark ? <TaglineMarkIcon mark={mark} /> : null}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
