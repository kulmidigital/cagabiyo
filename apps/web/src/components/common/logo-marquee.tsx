import { cn } from '@/lib/utils'
import type { OrgMark } from '@/lib/content/institution'

/**
 * A continuously scrolling row of organisation marks, faded out at both edges.
 *
 * The track holds the list twice and animates to -50%, so the second copy is
 * exactly where the first started when the cycle ends and the loop is seamless.
 * That only holds while each item carries its own horizontal padding — see the
 * note on `@keyframes marquee` in `styles.css` before switching to `gap`.
 *
 * The duplicate set is hidden from assistive technology: it is the same list a
 * second time, and a screen reader announcing every organisation twice is worse
 * than not seeing the visual effect at all.
 *
 * Marks render as silhouettes because the supplied art is mixed — several are
 * white-on-transparent and vanish on a light background in their own colours.
 * See `partnerOrganisations` for what would have to change to go full colour.
 */
export function LogoMarquee({
  items,
  className,
}: Readonly<{
  items: Array<OrgMark>
  className?: string
}>) {
  return (
    <div className={cn('marquee mask-edges relative', className)}>
      <ul className="marquee-track items-center">
        {items.map((org) => (
          <MarkItem key={org.file} org={org} />
        ))}
        {items.map((org) => (
          <MarkItem key={`echo-${org.file}`} org={org} echo />
        ))}
      </ul>
    </div>
  )
}

function MarkItem({
  org,
  echo = false,
}: Readonly<{ org: OrgMark; echo?: boolean }>) {
  return (
    <li
      className="flex shrink-0 items-center px-7 sm:px-10"
      aria-hidden={echo || undefined}
    >
      {/* Not lazy: the second copy starts outside the viewport and is brought
          in by a transform, which browsers do not reliably treat as entering
          view — the row would scroll in with holes in it. The whole set is
          about 60KB. */}
      <img
        src={`/orgs/${org.file}`}
        alt={echo ? '' : org.name}
        decoding="async"
        className="h-7 w-auto max-w-36 object-contain opacity-60 brightness-0 transition-opacity duration-300 hover:opacity-100 sm:h-9"
      />
    </li>
  )
}
