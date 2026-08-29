import { LogoMarquee } from '@/components/common/logo-marquee'
import {
  partnerOrganisations,
  practitionerCredentials,
} from '@/lib/content/institution'

/**
 * Trust strip: the credentials engagements are led by, and the organisation
 * marks.
 *
 * The NITA and KRA accreditation statements that used to open this strip are
 * gone at the owner's request. They are not lost — `AccreditationList` on the
 * About page still states both in full, and `accreditations` is unchanged.
 */
export function AccreditationStrip() {
  return (
    <section className="border-b border-border bg-white py-6 sm:py-10">
      <div className="shell">
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

      {/* The label stays inside the shell; the marquee itself runs the full
          width of the viewport, because the edge fade only reads as a fade
          when it happens at the edge of the screen rather than at a margin. */}
      <div className="mt-8 border-t border-border pt-8 sm:mt-10 sm:pt-10">
        <div className="shell">
          <p className="text-[0.6875rem] font-semibold tracking-widest text-muted-foreground uppercase">
            Organisations we work with
          </p>
        </div>
        <LogoMarquee items={partnerOrganisations} className="mt-6" />
      </div>
    </section>
  )
}
