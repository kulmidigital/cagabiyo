import { useEffect, useId, useState } from 'react'
import {
  FiArrowUpRight,
  FiChevronDown,
  FiPhoneCall,
  FiShield,
  FiX,
} from 'react-icons/fi'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { SmartLink } from '@/components/common/smart-link'
import { ButtonLink } from '@/components/common/button-link'
import { Logo } from '@/components/layout/logo'
import { cn } from '@/lib/utils'
import { markets, primaryNav, site } from '@/lib/site'
import type { NavSection } from '@/lib/site'

export function MobileNav({
  open,
  onOpenChange,
}: Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>) {
  const close = () => onOpenChange(false)

  // One section open at a time; reset on close so reopening the sheet always
  // starts from the same state.
  const [expanded, setExpanded] = useState<string | null>(null)
  useEffect(() => {
    if (!open) setExpanded(null)
  }, [open])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* Two overrides that have to match the primitive's own variants, or they
          are simply ignored:
          - `bg-ink-950` displaces `bg-popover`; `surface-ink` cannot, since it
            is not a bg-* utility and twMerge sees no conflict.
          - the width and border are set under `data-[side=right]:`, so plain
            `w-full` leaves `data-[side=right]:w-3/4` in place and the panel
            renders at three-quarter width. */}
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex flex-col bg-ink-950 p-0 data-[side=right]:w-full data-[side=right]:border-l-0 data-[side=right]:sm:max-w-full"
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Browse CaliberCode advisory services, capacity building, events and
          resources.
        </SheetDescription>

        <div className="surface-ink absolute inset-0" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="relative flex items-center justify-between px-5 pt-5">
          <Logo className="h-9" />
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-signal-500 hover:bg-signal-500 hover:text-ink-950"
          >
            <FiX className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrolls once a section is expanded. Centring lives on the inner
            wrapper via min-h-full rather than justify-center on the scroll
            container, which would clip the top of overflowing content. */}
        <nav
          aria-label="Mobile"
          className="no-scrollbar relative flex-1 overflow-y-auto px-5"
        >
          <div className="flex min-h-full flex-col justify-center py-4">
            {primaryNav.map((section, index) => (
              <NavRow
                key={section.label}
                section={section}
                index={index}
                expanded={expanded === section.label}
                onToggle={() =>
                  setExpanded((current) =>
                    current === section.label ? null : section.label,
                  )
                }
                onNavigate={close}
              />
            ))}
          </div>
        </nav>

        <div className="relative space-y-5 px-5 pb-8">
          <ButtonLink
            href="/contact?intent=advisory"
            size="lg"
            onClick={close}
            className="w-full bg-signal-500 text-ink-950 hover:bg-signal-400"
          >
            Book advisory
          </ButtonLink>

          <div className="space-y-3 border-t border-white/10 pt-5 text-sm">
            <SmartLink
              href="/capacity-building/corporate-request"
              onClick={close}
              className="flex items-center gap-2.5 text-ink-100 transition-colors hover:text-white"
            >
              <FiArrowUpRight
                className="size-4 text-signal-500"
                aria-hidden="true"
              />
              Corporate training request
            </SmartLink>
            <SmartLink
              href="/verify"
              onClick={close}
              className="flex items-center gap-2.5 text-ink-100 transition-colors hover:text-white"
            >
              <FiShield className="size-4 text-signal-500" aria-hidden="true" />
              Verify a certificate
            </SmartLink>
            <a
              href={`tel:${site.contact.phone.replaceAll(' ', '')}`}
              className="flex items-center gap-2.5 text-ink-100 transition-colors hover:text-white"
            >
              <FiPhoneCall
                className="size-4 text-signal-500"
                aria-hidden="true"
              />
              {site.contact.phone}
            </a>
          </div>

          <p className="text-[0.625rem] tracking-[0.14em] text-ink-400 uppercase">
            {markets.join(' · ')}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * The label and the disclosure are separate targets: tapping the section name
 * goes to its landing page, tapping the chevron opens the same sub-links the
 * desktop mega-menu shows. Sections without columns stay a plain link.
 */
function NavRow({
  section,
  index,
  expanded,
  onToggle,
  onNavigate,
}: Readonly<{
  section: NavSection
  index: number
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
}>) {
  const panelId = useId()
  const columns = section.columns ?? []

  return (
    <div
      style={{ animationDelay: `${80 + index * 55}ms` }}
      className="animate-in fade-in slide-in-from-bottom-3 border-b border-white/10 duration-500 fill-mode-both"
    >
      <div className="flex items-baseline gap-4">
        <span className="numeric flex-none text-[0.6875rem] font-semibold tracking-[0.14em] text-white/30">
          {String(index + 1).padStart(2, '0')}
        </span>

        {columns.length > 0 ? (
          <>
            <SmartLink
              href={section.to}
              onClick={onNavigate}
              className="font-display flex-1 py-4 text-2xl font-semibold text-white transition-colors hover:text-signal-400 sm:text-3xl"
            >
              {section.label}
            </SmartLink>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-controls={panelId}
              aria-label={`${expanded ? 'Hide' : 'Show'} ${section.label} links`}
              className="-mr-2 inline-flex size-11 flex-none items-center justify-center self-center text-white/40 transition-colors hover:text-signal-500"
            >
              <FiChevronDown
                className={cn(
                  'size-5 transition-transform duration-300',
                  expanded && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
          </>
        ) : (
          <SmartLink
            href={section.to}
            onClick={onNavigate}
            className="group flex flex-1 items-baseline gap-4 py-4"
          >
            <span className="font-display flex-1 text-2xl font-semibold text-white transition-colors group-hover:text-signal-400 sm:text-3xl">
              {section.label}
            </span>
            <FiArrowUpRight
              className="size-5 flex-none text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-500"
              aria-hidden="true"
            />
          </SmartLink>
        )}
      </div>

      {expanded && columns.length > 0 ? (
        <div
          id={panelId}
          className="animate-in fade-in slide-in-from-top-1 space-y-5 pb-6 pl-9 duration-300"
        >
          {columns.map((column) => (
            <div key={column.heading}>
              <p className="eyebrow text-signal-500/80">{column.heading}</p>
              <ul className="mt-3 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      href={link.to}
                      onClick={onNavigate}
                      className="block text-sm text-ink-100 transition-colors hover:text-signal-400"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
