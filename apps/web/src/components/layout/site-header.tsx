import { useEffect, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { FiArrowUpRight, FiChevronDown, FiMenu } from 'react-icons/fi'

import { cn } from '@/lib/utils'
import { primaryNav } from '@/lib/site'
import type { NavSection } from '@/lib/site'
import { Logo } from '@/components/layout/logo'
import { SiteSearch } from '@/components/layout/site-search'
import { MobileNav } from '@/components/layout/mobile-nav'
import { CanvasCursor } from '@/components/common/canvas-cursor'
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
  // Only a columns section opens the full-width sheet; a `links` section is a
  // dropdown anchored to its own trigger and must not touch the bar.
  const sheetSection = activeSection?.columns ? activeSection : undefined

  // The sheet tracks the bar, so both share these shape classes.
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
            // ink-800, barely translucent, and the same tone in both states so
            // scrolling changes the shape rather than the colour.
            //
            // The depth is bounded at one end by the original fault: ink-950 at
            // 75% let the light hero bleed through and desaturated the bar to
            // grey. Composited over the hero, ink-800 still separates red from
            // blue by 53 points and reads navy; ink-900 drops that to 37 and
            // starts drifting back toward the grey it came from.
            scrolled
              ? 'border-b-white/10 bg-ink-800/97'
              : 'border-white/15 bg-ink-800/94 shadow-[0_10px_40px_-16px_rgb(4_14_29/0.6)]',
            // Square off the bottom while the sheet is attached below it.
            sheetSection && !scrolled && 'border-b-transparent',
          )}
        >
          <Logo className="h-9 lg:h-11" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex h-full items-center gap-1">
              {primaryNav.map((section) => {
                const hasPanel = Boolean(section.columns ?? section.links)
                const isOpen = openMenu === section.label
                return (
                  <li
                    key={section.label}
                    className="relative flex h-full items-center"
                  >
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
                          // Open takes its own panel's ground, so the trigger
                          // reads as the tab belonging to the sheet below it
                          // rather than a lit-up button on the dark bar — and
                          // the two menus stay distinguishable at the trigger.
                          isOpen &&
                            (section.columns
                              ? 'bg-sand-50 text-ink-950'
                              : 'bg-white text-ink-950'),
                          !isOpen &&
                            'text-ink-100 hover:bg-white/5 hover:text-white',
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
                    ) : null}

                    {isOpen && section.links ? (
                      <NavDropdown
                        section={section}
                        id={`meganav-${slug(section.label)}`}
                      />
                    ) : null}

                    {!hasPanel ? (
                      <Link
                        to={section.to}
                        onPointerEnter={() => setOpenMenu(null)}
                        className="px-3.5 py-2 text-sm font-medium text-ink-100 transition-colors hover:bg-white/5 hover:text-white [&.active]:text-white"
                        activeProps={{ className: 'active' }}
                      >
                        {section.label}
                      </Link>
                    ) : null}
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

        {/* Sheet, shaped to match the bar it hangs from */}
        {sheetSection ? (
          <div
            id={`meganav-${slug(sheetSection.label)}`}
            className={cn(
              // Same rule as the bar: colour changes, widths do not.
              'relative mx-auto hidden overflow-hidden border border-t-0 border-sand-200 bg-sand-50 lg:block',
              shape,
              scrolled
                ? 'shadow-[0_18px_40px_-24px_rgb(4_14_29/0.35)]'
                : 'shadow-[0_24px_60px_-24px_rgb(4_14_29/0.45)]',
            )}
          >
            <CanvasCursor />
            <MegaPanelContent section={sheetSection} />
          </div>
        ) : null}
      </div>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  )
}

/**
 * The full-width sheet, used by Services.
 *
 * Runs the width of the bar it hangs from. With the promoted card gone the
 * three columns take the whole sheet, so each description is held to a
 * readable measure rather than being allowed to run the full column width.
 */
function MegaPanelContent({ section }: Readonly<{ section: NavSection }>) {
  return (
    <div className="grid gap-x-14 gap-y-9 py-8 sm:grid-cols-2 sm:py-10 lg:grid-cols-3">
      {(section.columns ?? []).map((column) => (
        <div key={column.heading}>
          <p className="eyebrow text-signal-700">{column.heading}</p>
          <div className="mt-4 h-px bg-sand-200" aria-hidden="true" />

          <ul className="mt-2">
            {column.links.map((link) => (
              <li key={link.to}>
                <SmartLink
                  href={link.to}
                  className="group -mx-3 block border-l-2 border-transparent px-3 py-2.5 transition-colors hover:border-signal-500 hover:bg-white"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                    {link.label}
                    <FiArrowUpRight
                      className="size-3.5 -translate-x-1 flex-none text-signal-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  {link.description ? (
                    <span className="mt-0.5 block max-w-sm text-[0.8125rem] leading-snug text-muted-foreground">
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
  )
}

/**
 * The compact dropdown, anchored under its own trigger.
 *
 * Deliberately not a sheet: a three-entry menu spread across the viewport was
 * mostly empty space, and made the two menus look like the same component.
 */
function NavDropdown({
  section,
  id,
}: Readonly<{ section: NavSection; id: string }>) {
  return (
    <div
      id={id}
      className="absolute top-full left-0 z-10 w-64 border border-sand-200 bg-white py-2 shadow-[0_24px_48px_-24px_rgb(4_14_29/0.45)]"
    >
      <ul>
        {(section.links ?? []).map((link) => (
          <li key={link.to}>
            <SmartLink
              href={link.to}
              className="group flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:bg-sand-50 hover:text-signal-700"
            >
              {link.label}
              <FiArrowUpRight
                className="size-3.5 -translate-x-1 flex-none text-signal-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z]+/g, '-')
