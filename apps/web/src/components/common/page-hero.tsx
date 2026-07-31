import type { ReactNode } from 'react'
import { FiChevronRight } from 'react-icons/fi'

import { Photo } from '@/components/common/photo'
import { SmartLink } from '@/components/common/smart-link'
import { cn } from '@/lib/utils'
import type { Photo as PhotoData } from '@/lib/images'

export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumb,
  photo,
  children,
  align = 'split',
}: Readonly<{
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  breadcrumb: Array<{ label: string; href?: string }>
  photo?: PhotoData
  children?: ReactNode
  align?: 'split' | 'wide'
}>) {
  const split = align === 'split' && Boolean(photo)

  return (
    <section className="surface-ink relative overflow-hidden">
      <div className="grain absolute inset-0" aria-hidden="true" />

      {/* mt clears the fixed header (h-16 / lg:h-20 plus its inset) — padding
          stays on the standard py-6 sm:py-10 rhythm. */}
      <div className="shell relative mt-20 py-6 sm:py-10 lg:mt-25">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-300">
            {breadcrumb.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <FiChevronRight
                    className="size-3 text-white/25"
                    aria-hidden="true"
                  />
                ) : null}
                {crumb.href ? (
                  <SmartLink
                    href={crumb.href}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </SmartLink>
                ) : (
                  <span aria-current="page" className="text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div
          className={cn(
            'mt-12 gap-12',
            split ? 'grid items-center lg:grid-cols-12 lg:gap-16' : '',
          )}
        >
          <div className={cn(split ? 'lg:col-span-7' : 'max-w-4xl')}>
            <p className="eyebrow text-signal-400">{eyebrow}</p>
            <h1 className="display-lg mt-7 text-white">{title}</h1>
            {lede ? (
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-200">
                {lede}
              </p>
            ) : null}
            {children ? <div className="mt-10">{children}</div> : null}
          </div>

          {split && photo ? (
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  className="absolute -top-3 -right-3 bottom-6 left-6 border border-signal-500/30"
                  aria-hidden="true"
                />
                <div className="photo-wash photo-wash-soft relative aspect-4/3">
                  <Photo
                    photo={photo}
                    priority
                    width={900}
                    ratio={4 / 3}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    crop="entropy"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
