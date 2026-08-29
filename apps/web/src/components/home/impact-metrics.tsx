import { cn } from '@/lib/utils'
import { impactMetrics } from '@/lib/content/institution'

export function ImpactMetrics() {
  return (
    <section className="surface-sand py-6 sm:py-10">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-signal-700">Scope</p>
          <h2 className="display-md mt-4 text-ink-900">At A Glance</h2>
        </div>

        <dl className="mt-8 grid border-y border-ink-200 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                'group p-6 text-center sm:p-8',
                // Stacked: a rule between each pair.
                index > 0 && 'border-t border-ink-200 sm:border-t-0',
                // Two columns: rule down the middle, rule under the top row.
                index % 2 === 1 && 'sm:border-l sm:border-ink-200',
                index >= 2 && 'sm:border-t sm:border-ink-200',
                // Single row: rules between columns only.
                'lg:border-t-0',
                index > 0 && 'lg:border-l lg:border-ink-200',
              )}
            >
              <span
                className="mx-auto block h-px w-8 bg-signal-500 transition-[width] duration-500 ease-out group-hover:w-14"
                aria-hidden="true"
              />

              <dd className="numeric mt-6 flex items-baseline justify-center gap-0.5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
                {metric.value}
                {metric.suffix ? (
                  <span className="text-2xl text-signal-500 sm:text-3xl">
                    {metric.suffix}
                  </span>
                ) : null}
              </dd>

              <dt className="mt-5 text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-800 uppercase">
                {metric.label}
              </dt>

              <p className="mx-auto mt-3 max-w-56 text-sm leading-relaxed text-muted-foreground">
                {metric.detail}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
