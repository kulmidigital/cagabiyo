import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { FiArrowLeft, FiArrowRight, FiPause, FiPlay } from 'react-icons/fi'

import { SectionHeading } from '@/components/common/section'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { photoSrc } from '@/lib/images'
import { testimonials } from '@/lib/content/institution'
import type { Testimonial } from '@/lib/content/institution'

const AUTOPLAY_MS = 7000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState<Testimonial | null>(null)
  const [stopped, setStopped] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  // Held while the pointer or focus is inside the section, while the video
  // dialog is open, when the visitor has stopped it, and whenever motion is
  // reduced (WCAG 2.2.2).
  const paused = stopped || hovered || Boolean(playing) || reducedMotion

  useEffect(() => {
    if (paused) return
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % testimonials.length),
      AUTOPLAY_MS,
    )
    return () => clearInterval(timer)
    // `index` restarts the interval after a manual step, so a click always gets
    // a full dwell rather than the remainder of the previous one.
  }, [paused, index])

  const active = testimonials.at(index)
  if (!active) return null

  const video = active.video?.src ? active.video : undefined
  const step = (delta: number) =>
    setIndex(
      (current) =>
        (current + delta + testimonials.length) % testimonials.length,
    )

  return (
    <section
      className="surface-ink relative overflow-hidden py-6 sm:py-10"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          tone="ink"
          eyebrow="In their words"
          title="Client Feedback"
        />

        <div className="mt-8 sm:mt-10">
          <span
            className="font-display block text-7xl leading-none text-signal-500/30 select-none sm:text-8xl"
            aria-hidden="true"
          >
            “
          </span>

          {/* Announced only while the rotation is held — otherwise a screen
              reader would interrupt every seven seconds. */}
          <blockquote
            aria-live={paused ? 'polite' : 'off'}
            className="-mt-4 sm:-mt-6"
          >
            <p
              key={index}
              className="font-display animate-in fade-in slide-in-from-bottom-2 max-w-4xl text-xl leading-snug font-medium text-balance text-white duration-500 sm:text-2xl lg:text-3xl"
            >
              {active.quote}
            </p>

            <footer className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
              <div key={index} className="animate-in fade-in duration-500">
                <p className="text-sm font-bold text-white">{active.name}</p>
                <p className="mt-1 text-sm text-ink-300">
                  {active.role}, {active.organisation}
                </p>
                <p className="mt-2.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-signal-400 uppercase">
                  {active.audience}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-5 lg:justify-end">
                {video ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(active)}
                    className="inline-flex items-center gap-3 bg-signal-500 py-3 pr-5 pl-4 text-ink-950 transition-colors hover:bg-signal-400"
                  >
                    <FiPlay className="size-4" aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-[0.12em] uppercase">
                      Watch {video.durationLabel}
                    </span>
                  </button>
                ) : null}

                <span className="numeric text-xs font-semibold tracking-[0.14em] text-ink-400">
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {String(testimonials.length).padStart(2, '0')}
                </span>

                <span
                  className="hidden w-32 gap-1.5 sm:flex"
                  aria-hidden="true"
                  style={
                    {
                      '--quote-duration': `${AUTOPLAY_MS}ms`,
                    } as CSSProperties
                  }
                >
                  {testimonials.map((item, i) => (
                    <span
                      key={item.name}
                      className="h-px flex-1 overflow-hidden bg-white/15"
                    >
                      {i === index ? (
                        <span
                          key={`${index}-${String(paused)}`}
                          className={cn(
                            'block h-full bg-signal-500',
                            paused ? 'w-full' : 'quote-progress',
                          )}
                        />
                      ) : null}
                    </span>
                  ))}
                </span>

                <span className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStopped((value) => !value)}
                    aria-label={
                      stopped
                        ? 'Resume rotating testimonials'
                        : 'Pause rotating testimonials'
                    }
                    aria-pressed={stopped}
                    className="inline-flex size-10 items-center justify-center border border-white/20 text-ink-100 transition-colors hover:border-signal-500 hover:bg-signal-500 hover:text-ink-950"
                  >
                    {stopped ? (
                      <FiPlay className="size-4" aria-hidden="true" />
                    ) : (
                      <FiPause className="size-4" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous testimonial"
                    className="inline-flex size-10 items-center justify-center border border-white/20 text-ink-100 transition-colors hover:border-signal-500 hover:bg-signal-500 hover:text-ink-950"
                  >
                    <FiArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next testimonial"
                    className="inline-flex size-10 items-center justify-center border border-white/20 text-ink-100 transition-colors hover:border-signal-500 hover:bg-signal-500 hover:text-ink-950"
                  >
                    <FiArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </span>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>

      <Dialog
        open={Boolean(playing)}
        onOpenChange={(open) => !open && setPlaying(null)}
      >
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <DialogTitle className="sr-only">
            {playing
              ? `Video testimonial from ${playing.name}`
              : 'Video testimonial'}
          </DialogTitle>
          {playing?.video?.src ? (
            <video
              src={playing.video.src}
              poster={photoSrc(playing.video.poster, {
                w: 1200,
                ratio: 16 / 9,
              })}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-ink-950"
            >
              <track
                kind="captions"
                src={playing.video.captions}
                srcLang="en"
                label="English"
                default
              />
              Your browser does not support embedded video.
            </video>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
