import { useEffect, useId, useState } from 'react'
import type { ReactNode } from 'react'
import { FiArrowRight, FiChevronDown, FiPrinter } from 'react-icons/fi'

import { ButtonLink } from '@/components/common/button-link'
import { PageHero } from '@/components/common/page-hero'
import { Section } from '@/components/common/section'
import { cn } from '@/lib/utils'

export type LegalSection = {
  heading: string
  body: ReactNode
}

export function LegalPage({
  eyebrow,
  title,
  lede,
  updated,
  sections,
}: Readonly<{
  eyebrow: string
  title: string
  lede: string
  updated: string
  sections: Array<LegalSection>
}>) {
  const entries = sections.map((section, index) => ({
    ...section,
    id: slugify(section.heading),
    number: index + 1,
  }))

  const active = useActiveSection(entries.map((entry) => entry.id).join('|'))

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: title }]}
        align="wide"
      />

      <Section className="py-6 sm:py-10">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Contents entries={entries} active={active} updated={updated} />

            <div className="lg:col-span-8">
              {entries.map((entry) => (
                <Article key={entry.id} entry={entry} />
              ))}

              <Enquiries title={title} />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

type Entry = LegalSection & { id: string; number: number }

/**
 * Sticky rail on desktop, collapsed disclosure on mobile. Legal documents are
 * scanned for one clause far more often than they are read front to back, so
 * the contents list is the primary navigation, not decoration.
 */
function Contents({
  entries,
  active,
  updated,
}: Readonly<{
  entries: Array<Entry>
  active: string
  updated: string
}>) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <aside className="lg:col-span-4 print:hidden">
      <div className="lg:sticky lg:top-28">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <p className="text-[0.6875rem] font-semibold tracking-widest text-muted-foreground uppercase">
            Last updated {updated}
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold tracking-widest text-ink-700 uppercase transition-colors hover:text-signal-600"
          >
            <FiPrinter className="size-3.5" aria-hidden="true" />
            Print
          </button>
        </div>

        {/* Collapsed on mobile so a fifteen-item list does not bury the
            document; always open from lg up, where the rail has its own
            column. Driven by state rather than <details open> because that
            attribute cannot be made responsive. */}
        <div className="mt-6 lg:mt-8">
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-center justify-between text-sm font-bold text-ink-900 lg:hidden"
          >
            Contents
            <FiChevronDown
              className={cn(
                'size-4 text-muted-foreground transition-transform',
                open && 'rotate-180',
              )}
              aria-hidden="true"
            />
          </button>

          <p className="hidden text-sm font-bold text-ink-900 lg:block">
            Contents
          </p>

          <nav
            id={panelId}
            aria-label="Document contents"
            className={cn('mt-4 lg:block', open ? 'block' : 'hidden')}
          >
            <ol className="space-y-px">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === entry.id ? 'location' : undefined}
                    className={cn(
                      'flex gap-3 border-l-2 py-2 pl-4 text-sm transition-colors',
                      active === entry.id
                        ? 'border-signal-500 bg-sand-100 font-semibold text-ink-900'
                        : 'border-border text-muted-foreground hover:border-ink-300 hover:text-ink-900',
                    )}
                  >
                    <span className="numeric flex-none pt-0.5 text-[0.6875rem] text-ink-300">
                      {String(entry.number).padStart(2, '0')}
                    </span>
                    <span className="leading-snug">{entry.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </aside>
  )
}

function Article({ entry }: Readonly<{ entry: Entry }>) {
  return (
    <article
      id={entry.id}
      // Clears the fixed header when a contents link jumps here.
      className="scroll-mt-28 border-t border-border py-8 first:border-t-0 first:pt-0 sm:py-10 sm:first:pt-0"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-5">
        <span
          className="numeric flex-none text-xs font-semibold tracking-widest text-signal-600"
          aria-hidden="true"
        >
          {String(entry.number).padStart(2, '0')}
        </span>

        <div className="flex-1">
          <h2 className="text-lg font-bold tracking-tight text-ink-900 sm:text-xl">
            {entry.heading}
          </h2>

          <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-ink-800 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-signal-600 [&_li]:marker:text-signal-500 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {entry.body}
          </div>
        </div>
      </div>
    </article>
  )
}

function Enquiries({ title }: Readonly<{ title: string }>) {
  return (
    <div className="surface-ink mt-10 p-6 sm:mt-14 sm:p-8">
      <p className="text-sm font-bold text-white">
        Questions about this {title.toLowerCase()}?
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-200">
        Write to us and the responsible team will come back to you.
      </p>
      <div className="mt-6 flex sm:justify-end">
        <ButtonLink
          href="/contact"
          className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400 sm:w-auto"
        >
          Contact us
          <FiArrowRight
            className="size-3.5"
            data-icon="inline-end"
            aria-hidden="true"
          />
        </ButtonLink>
      </div>
    </div>
  )
}

function slugify(value: string): string {
  // Split-and-join rather than replace-then-trim: dropping the empty pieces
  // handles leading and trailing separators, so there is no second pass and no
  // alternation for the engine to backtrack over.
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .join('-')
}

/**
 * Highlights the section currently being read.
 *
 * Takes the ids joined into a single string rather than an array so the effect
 * has a stable dependency — an array literal from the caller would be a new
 * reference on every render and re-attach the observer each time.
 */
function useActiveSection(idKey: string): string {
  const [active, setActive] = useState(() => idKey.split('|')[0] ?? '')

  useEffect(() => {
    const targets = idKey
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records.filter((record) => record.isIntersecting)
        if (visible.length === 0) return

        // Several sections can be in the band at once; the highest one is the
        // one being read.
        const topmost = visible.reduce(
          (a, b) =>
            a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
          visible[0],
        )
        setActive(topmost.target.id)
      },
      // A band under the fixed header rather than the whole viewport, so the
      // highlight tracks the heading you have just scrolled past.
      { rootMargin: '-120px 0px -60% 0px' },
    )

    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  }, [idKey])

  return active
}
