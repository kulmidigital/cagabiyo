import {
  accreditations,
  practitionerCredentials,
} from '@/lib/content/institution'

/**
 * Trust strip. The corporate overview claims two standings — NITA accreditation
 * and the KRA Ushuru Mashinani partnership — so this maps the list rather than
 * hardcoding the first entry, as it did while NITA was the only one. The
 * credential row carries the rest of the proof at the practitioner level.
 */
export function AccreditationStrip() {
  return (
    <section className="border-b border-border bg-white py-6 sm:py-10">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
          <div className="grid flex-none gap-6 sm:grid-cols-2 lg:gap-8">
            {accreditations.map((item) => (
              <div key={item.abbreviation} className="flex items-center gap-5">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`${item.body} (${item.abbreviation})`}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-auto max-w-36 flex-none object-contain sm:h-12"
                  />
                ) : (
                  <p className="flex h-11 flex-none items-center text-2xl font-bold tracking-tight text-ink-900 sm:h-12">
                    {item.abbreviation}
                  </p>
                )}
                <div className="border-l border-border pl-5">
                  <p className="text-sm font-bold text-ink-900">
                    {item.abbreviation} — {item.standing}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 lg:border-l lg:border-border lg:pl-14">
            <p className="text-[0.6875rem] font-semibold tracking-widest text-muted-foreground uppercase">
              Engagements led by
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {practitionerCredentials.map((credential) => (
                <li key={credential.abbreviation}>
                  <abbr
                    title={credential.name}
                    className="numeric text-sm font-bold text-ink-800 no-underline"
                  >
                    {credential.abbreviation}
                  </abbr>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
