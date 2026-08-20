import { useEffect, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { FiArrowUpRight, FiChevronDown, FiMenu } from 'react-icons/fi'

import { cn } from '@/lib/utils'
import { primaryNav } from '@/lib/site'
import type { NavSection } from '@/lib/site'
import { Logo } from '@/components/layout/logo'
import { SiteSearch } from '@/components/layout/site-search'
import { MobileNav } from '@/components/layout/mobile-nav'
import { SmartLink } from '@/components/common/smart-link'
import { ButtonLink } from '@/components/common/button-link'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const href = useRouterState({ select: (s) => s.location.href })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation dismisses whatever is open.
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [href])

  useEffect(() => {
    if (!openMenu) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
        navRef.current
          ?.querySelector<HTMLButtonElement>(`[data-menu="${openMenu}"]`)
          ?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openMenu])

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    [],
  )

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }

  const activeSection = primaryNav.find((s) => s.label === openMenu)

  // The panel tracks the bar, so both share these shape classes.
  const shape = scrolled
    ? 'max-w-full px-5 sm:px-8 xl:px-14'
    : 'max-w-[88rem] px-4 sm:px-5'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out',
        scrolled ? 'px-0 pt-0' : 'px-3 pt-3 sm:px-5 sm:pt-5',
      )}
    >
      <div
        ref={navRef}
        onPointerLeave={scheduleClose}
        onPointerEnter={cancelClose}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpenMenu(null)
          }
        }}
      >
        {/* Bar */}
        <div
          className={cn(
            // The border stays 1px on every side in both states and only its
            // colour changes. Toggling border-*-width instead would animate the
            // width to zero while the colour fell back to the base `--border`
            // (a near-white #e3e8ef applied to `*`), flashing a bright outline
            // through the morph — and it would jog the layout by 2px.
            'mx-auto flex h-16 items-center justify-between gap-6 border border-transparent backdrop-blur-xl transition-all duration-500 ease-out lg:h-20',
            shape,
            scrolled
              ? 'border-b-white/10 bg-ink-950/92'
              : 'border-white/15 bg-ink-950/75 shadow-[0_10px_40px_-16px_rgb(4_14_29/0.6)]',
            // Square off the bottom while a panel is attached below it.
            activeSection && !scrolled && 'border-b-transparent',
          )}
        >
          <Logo className="h-9 lg:h-11" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((section) => {
                const hasPanel = Boolean(section.columns)
                const isOpen = openMenu === section.label
                return (
                  <li key={section.label}>
                    {hasPanel ? (
                      <button
                        type="button"
                        data-menu={section.label}
                        aria-expanded={isOpen}
                        aria-controls={`meganav-${slug(section.label)}`}
                        onClick={() =>
                          setOpenMenu(isOpen ? null : section.label)
                        }
                        onPointerEnter={() => {
                          cancelClose()
                          setOpenMenu(section.label)
                        }}
                        className={cn(
                          'flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors',
                          // Open takes the panel's own off-white so the trigger
                          // reads as the tab belonging to the sheet below it,
                          // rather than as a lit-up button on the dark bar.
                          isOpen
                            ? 'bg-sand-50 text-ink-950'
                            : 'text-ink-100 hover:bg-white/5 hover:text-white',
                        )}
                      >
                        {section.label}
                        <FiChevronDown
                          className={cn(
                            'size-3.5 transition-transform duration-300',
                            isOpen && 'rotate-180',
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <Link
                        to={section.to}
                        onPointerEnter={() => setOpenMenu(null)}
                        className="px-3.5 py-2 text-sm font-medium text-ink-100 transition-colors hover:bg-white/5 hover:text-white [&.active]:text-white"
                        activeProps={{ className: 'active' }}
                      >
                        {section.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <SiteSearch />

            <ButtonLink
              href="/contact?intent=advisory"
              size="sm"
              className="hidden bg-signal-500 text-ink-950 hover:bg-signal-400 sm:inline-flex"
            >
              Book Advisory
              <FiArrowUpRight
                className="size-3.5"
                data-icon="inline-end"
                aria-hidden="true"
              />
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="inline-flex size-10 items-center justify-center text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <FiMenu className="size-5" />
            </button>
          </div>
        </div>

        {/* Mega panel, shaped to match the bar it hangs from */}
        {activeSection ? (
          <div
            id={`meganav-${slug(activeSection.label)}`}
            className={cn(
              // Same rule as the bar: colour changes, widths do not.
              //
              // The panel is off-white while the bar above stays ink, so the
              // seam is a deliberate light/dark boundary. It is opaque — there
              // is nothing left to blur through — so `backdrop-blur` is gone
              // along with the alpha.
              'mx-auto hidden overflow-hidden border border-t-0 border-sand-200 bg-sand-50 lg:block',
              shape,
              scrolled
                ? 'shadow-[0_18px_40px_-24px_rgb(4_14_29/0.35)]'
                : 'shadow-[0_24px_60px_-24px_rgb(4_14_29/0.45)]',
            )}
          >
            <MegaPanelContent section={activeSection} />
          </div>
        ) : null}
      </div>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  )
}

/**
 * Track widths for the link columns.
 *
 * Beside a feature card the columns share eight of twelve, so the count has to
 * drive the tracks — Services runs three, and forcing it into the two-up grid
 * would wrap the third under the first. Without a feature card the grid stays
 * at four tracks whatever the count: a section with two columns then keeps the
 * same column measure as every other panel and simply leaves the remaining
 * tracks empty, which reads better than two columns stretched across the full
 * width.
 */
const columnTracks: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

function MegaPanelContent({ section }: Readonly<{ section: NavSection }>) {
  const columns = section.columns ?? []

  return (
    <div className="grid gap-10 py-8 sm:py-10 lg:grid-cols-12 lg:gap-14">
      <div
        className={cn(
          'grid gap-x-10 gap-y-9',
          section.feature
            ? cn(
                'lg:col-span-8',
                columnTracks[columns.length] ?? 'sm:grid-cols-2',
              )
            : 'lg:col-span-12 sm:grid-cols-2 lg:grid-cols-4',
        )}
      >
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="eyebrow mb-4 text-signal-700">{column.heading}</p>
            {/* A hairline under the heading gives each column a spine to hang
                from; on the old ink panel the surrounding contrast did that. */}
            <div className="mb-3 h-px bg-sand-200" aria-hidden="true" />
            <ul className="space-y-0.5">
              {column.links.map((link) => (
                <li key={link.to}>
                  <SmartLink
                    href={link.to}
                    className="group -mx-3 block border-l-2 border-transparent px-3 py-2 transition-colors hover:border-signal-500 hover:bg-white"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                      {link.label}
                      <FiArrowUpRight
                        className="size-3.5 -translate-x-1 text-signal-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </span>
                    {link.description ? (
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">
                        {link.description}
                      </span>
                    ) : null}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {section.feature ? (
        <div className="lg:col-span-4">
          {/* Inverted against the off-white panel: on a light sheet the promoted
              card has to be the darkest thing present to still read as promoted. */}
          <div className="h-full bg-linear-to-br from-ink-900 to-ink-950 p-7">
            <p className="eyebrow text-signal-400">{section.feature.eyebrow}</p>
            <h3 className="mt-4 text-xl font-bold text-white">
              {section.feature.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-200">
              {section.feature.body}
            </p>
            <SmartLink
              href={section.feature.to}
              className="link-wipe mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-signal-400 uppercase"
            >
              {section.feature.cta}
              <FiArrowUpRight className="size-3.5" aria-hidden="true" />
            </SmartLink>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z]+/g, '-')
