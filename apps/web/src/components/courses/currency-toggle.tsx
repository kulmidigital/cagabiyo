import { cn } from '@/lib/utils'
import type { Currency } from '@/lib/content/training'

export function CurrencyToggle({
  value,
  onChange,
  tone = 'light',
  className,
}: Readonly<{
  value: Currency
  onChange: (currency: Currency) => void
  tone?: 'light' | 'ink'
  className?: string
}>) {
  const options: Array<Currency> = ['KES', 'USD']
  const ink = tone === 'ink'
  const restingClass = ink
    ? 'text-ink-200 hover:text-white'
    : 'text-muted-foreground hover:text-ink-900'

  return (
    <div
      role="radiogroup"
      aria-label="Display prices in"
      className={cn(
        'inline-flex border p-0.5',
        ink ? 'border-white/15 bg-white/5' : 'border-border bg-white',
        className,
      )}
    >
      {options.map((option) => {
        const selected = option === value
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={cn(
              'px-4 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors',
              selected ? 'bg-signal-500 text-ink-950' : restingClass,
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
