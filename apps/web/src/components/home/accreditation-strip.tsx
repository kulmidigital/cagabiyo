import {
  accreditations,
  practitionerCredentials,
} from '@/lib/content/institution'

/**
 * Trust strip. Profile v3 claims one institutional accreditation, so this is a
 * statement rather than the logo wall it used to be — the levy-reimbursement
 * line is the part a corporate buyer acts on. The credential row carries the
 * rest of the proof, at the practitioner level where the profile puts it.
 */
export function AccreditationStrip() {
  const nita = accreditations[0]

  return (
    <section className="border-b border-border bg-white py-6 sm:py-10">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex flex-none items-center gap-5">
            <img
              src={nita.logo}
              alt={`${nita.body} (${nita.abbreviation})`}
              loading="lazy"
              decoding="async"
              className="h-11 w-auto max-w-36 object-contain sm:h-12"
            />
            <div className="border-l border-border pl-5">
              <p className="text-sm font-bold text-ink-900">
                {nita.abbreviation} accredited
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {nita.benefit}
              </p>
            </div>
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
