import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Section({
  children,
  className,
  tone = 'default',
  id,
}: Readonly<{
  children: ReactNode
  className?: string
  tone?: 'default' | 'sand' | 'ink'
  id?: string
}>) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-6 sm:py-10',
        tone === 'sand' && 'surface-sand',
        tone === 'ink' && 'surface-ink',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function Eyebrow({
  children,
  className,
  tone = 'default',
}: Readonly<{
  children: ReactNode
  className?: string
  tone?: 'default' | 'ink'
}>) {
  return (
    <p
      className={cn(
        'eyebrow',
        tone === 'ink' ? 'text-signal-400' : 'text-signal-700',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'start',
  tone = 'default',
  as: Tag = 'h2',
  action,
  className,
}: Readonly<{
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'start' | 'center'
  tone?: 'default' | 'ink'
  as?: 'h1' | 'h2' | 'h3'
  action?: ReactNode
  className?: string
}>) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'flex flex-col gap-5 sm:gap-8',
        action && !centered && 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
        {eyebrow ? (
          <Eyebrow
            tone={tone}
            className={cn('mb-4 sm:mb-6', centered && 'justify-center')}
          >
            {eyebrow}
          </Eyebrow>
        ) : null}
        <Tag
          className={cn(
            Tag === 'h1' ? 'display-lg' : 'display-md',
            tone === 'ink' ? 'text-white' : 'text-ink-900',
          )}
        >
          {title}
        </Tag>
        {lede ? (
          <p
            className={cn(
              'mt-6 text-lg leading-relaxed',
              tone === 'ink' ? 'text-ink-200' : 'text-muted-foreground',
            )}
          >
            {lede}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className={cn('flex-none', centered && 'mx-auto')}>{action}</div>
      ) : null}
    </div>
  )
}

export function IndexLabel({
  n,
  className,
  tone = 'default',
}: Readonly<{
  n: number
  className?: string
  tone?: 'default' | 'ink'
}>) {
  return (
    <span
      className={cn(
        'numeric text-xs font-semibold tracking-[0.18em]',
        tone === 'ink' ? 'text-white/40' : 'text-ink-300',
        className,
      )}
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}
