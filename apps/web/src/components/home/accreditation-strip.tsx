import { accreditations } from '@/lib/content/institution'

export function AccreditationStrip() {
  return (
    <section className="border-b border-border bg-white py-6 sm:py-10">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-14">
          <p className="shrink-0 text-[0.6875rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase lg:max-w-40">
            Working towards recognition with
          </p>

          {/* Two per row on phones, four from sm. `object-contain` inside a
              fixed box keeps the wide marks (NITA, IIA) from dwarfing ICPAK. */}
          <ul className="grid flex-1 grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 sm:gap-x-10">
            {accreditations.map((body) => (
              <li
                key={body.abbreviation}
                className="flex justify-center lg:justify-start"
              >
                <img
                  src={body.logo}
                  alt={`${body.body} (${body.abbreviation})`}
                  title={body.scope}
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-auto max-w-36 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-9"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
