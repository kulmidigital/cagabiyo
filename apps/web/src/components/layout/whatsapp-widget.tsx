import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { site } from '@/lib/site'
import { FiX } from 'react-icons/fi'
import { TbBrandWhatsapp } from 'react-icons/tb'

type Desk = {
  id: string
  team: string
  detail: string
  /** PLACEHOLDER — per-desk numbers pending routing sign-off. */
  number: string
  message: string
}

const desks: Array<Desk> = [
  {
    id: 'advisory',
    team: 'Advisory',
    detail: 'Tax, audit, governance, risk and digital assets',
    number: site.contact.whatsapp,
    message:
      'Hello CaliberCode — I would like to speak to the advisory team about an engagement.',
  },
  {
    id: 'training',
    team: 'Training & Events',
    detail: 'Corporate cohorts, masterclasses and seat bookings',
    number: site.contact.whatsapp,
    message:
      'Hello CaliberCode — I would like to speak to the training team about a programme.',
  },
]

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        // A disclosure, not a dialog: nothing is modal, focus is not trapped
        // and the page stays interactive. The trigger's aria-expanded and
        // aria-controls are what announce this panel.
        <div
          ref={panelRef}
          id="whatsapp-panel"
          className="w-[min(20rem,calc(100vw-2rem))] origin-bottom-right border border-ink-100 bg-white shadow-lift-lg"
        >
          <div className="surface-ink px-5 py-4">
            <p className="text-sm font-bold text-white">Chat with us</p>
            <p className="mt-0.5 text-xs text-ink-200">
              Choose a desk and we will pick up on WhatsApp.
            </p>
          </div>
          <ul className="divide-y divide-border">
            {desks.map((desk) => (
              <li key={desk.id}>
                <a
                  href={`https://wa.me/${desk.number}?text=${encodeURIComponent(desk.message)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setOpen(false)}
                  className="edge-card block px-5 py-4 transition-colors hover:bg-sand-100"
                >
                  <span className="block text-sm font-semibold text-ink-900">
                    {desk.team}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {desk.detail}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="border-t border-border px-5 py-3 text-[0.6875rem] leading-relaxed text-muted-foreground">
            Messages are handled during business hours, 08:30–17:30 EAT.
          </p>
        </div>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="whatsapp-panel"
        aria-label={
          open ? 'Close WhatsApp chat options' : 'Open WhatsApp chat options'
        }
        className={cn(
          'group inline-flex size-14 items-center justify-center rounded-full shadow-lift-lg transition-all duration-300',
          open
            ? 'bg-ink-900 text-white'
            : 'bg-[#25D366] text-white hover:scale-105 hover:bg-[#1fbe59]',
        )}
      >
        {open ? (
          <FiX className="size-6" aria-hidden="true" />
        ) : (
          <TbBrandWhatsapp className="size-7" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
