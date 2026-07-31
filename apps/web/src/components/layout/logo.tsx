import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

export function Logo({
  className,
  asLink = true,
}: Readonly<{
  className?: string
  asLink?: boolean
}>) {
  const image = (
    <img
      src="/logo.png"
      alt={`${site.name} — home`}
      width={427}
      height={205}
      className={cn('block w-auto', className)}
    />
  )

  if (!asLink) return image

  return (
    <Link
      to="/"
      className="inline-flex shrink-0 items-center transition-opacity hover:opacity-80"
    >
      {image}
    </Link>
  )
}
