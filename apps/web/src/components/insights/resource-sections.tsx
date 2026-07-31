import { useMemo, useState } from 'react'
import { FiPlay, FiX } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { Section, SectionHeading } from '@/components/common/section'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import {
  faqs,
  galleryCategories,
  galleryItems,
} from '@/lib/content/institution'
import type { GalleryItem } from '@/lib/content/institution'

export function ResourceGallery() {
  const [category, setCategory] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const filtered = useMemo(
    () =>
      galleryItems.filter((item) =>
        category ? item.category === category : true,
      ),
    [category],
  )

  return (
    <Section id="gallery" tone="sand">
      <div className="shell">
        <SectionHeading
          eyebrow="Gallery"
          title="Masterclasses, graduations and board retreats."
        />

        <div className="no-scrollbar -mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:mt-10 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          <GalleryChip
            active={category === null}
            onClick={() => setCategory(null)}
          >
            All
          </GalleryChip>
          {galleryCategories.map((item) => (
            <GalleryChip
              key={item}
              active={category === item}
              onClick={() => setCategory(category === item ? null : item)}
            >
              {item}
            </GalleryChip>
          ))}
        </div>

        <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {filtered.map((item, index) => (
            <li
              key={item.caption}
              className={cn(
                // Break the rhythm so the grid reads as an edit, not a contact sheet.
                index % 7 === 0 ? 'sm:col-span-2 sm:row-span-2' : '',
              )}
            >
              <button
                type="button"
                onClick={() => setLightbox(item)}
                className="group relative block h-full w-full overflow-hidden text-left"
              >
                <div
                  className={cn(
                    'photo-wash h-full',
                    index % 7 === 0
                      ? 'aspect-4/3 sm:aspect-square'
                      : 'aspect-4/3',
                  )}
                >
                  <Photo
                    photo={item.photo}
                    width={index % 7 === 0 ? 900 : 600}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    crop="entropy"
                  />
                </div>

                {item.media === 'video' ? (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-ink-950/80 px-2.5 py-1.5 text-[0.625rem] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm">
                    <FiPlay className="size-2.5" aria-hidden="true" />
                    {item.durationLabel}
                  </span>
                ) : null}

                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block text-[0.625rem] font-semibold tracking-[0.14em] text-signal-400 uppercase">
                    {item.category}
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug font-semibold text-white">
                    {item.caption}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <Dialog
        open={Boolean(lightbox)}
        onOpenChange={(open) => !open && setLightbox(null)}
      >
        <DialogContent
          className="max-w-4xl overflow-hidden p-0"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {lightbox?.caption ?? 'Gallery item'}
          </DialogTitle>
          {lightbox ? (
            <>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center bg-ink-950/70 text-white backdrop-blur-sm transition-colors hover:bg-ink-950"
              >
                <FiX className="size-5" aria-hidden="true" />
              </button>
              <div className="aspect-16/10 bg-ink-950">
                <Photo
                  photo={lightbox.photo}
                  width={1600}
                  sizes="90vw"
                  crop="entropy"
                />
              </div>
              <div className="bg-white p-6">
                <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-signal-700 uppercase">
                  {lightbox.category}
                </p>
                <p className="mt-2 font-semibold text-ink-900">
                  {lightbox.caption}
                </p>
                {lightbox.media === 'video' ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Video runtime {lightbox.durationLabel}. Playback becomes
                    available once the final asset is supplied.
                  </p>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  )
}

export function ResourceFaqs() {
  return (
    <Section id="faq">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Frequently asked"
              title="Accreditation, bookings and payment."
            />
          </div>

          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            {faqs.map((group) => (
              <div key={group.category}>
                <h3 className="text-lg font-bold text-ink-900">
                  {group.category}
                </h3>
                <Accordion className="mt-4 border-t border-border">
                  {group.items.map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger className="py-5 text-base hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="pr-8 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function GalleryChip({
  active,
  onClick,
  children,
}: Readonly<{
  active: boolean
  onClick: () => void
  children: React.ReactNode
}>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'shrink-0 border px-3.5 py-2 text-xs font-medium transition-colors',
        active
          ? 'border-ink-900 bg-ink-900 text-white'
          : 'border-border bg-white text-ink-700 hover:border-ink-300',
      )}
    >
      {children}
    </button>
  )
}
