import { useMemo, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { FiCheck, FiPlus, FiSend, FiTrash2, FiX } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IndexLabel } from '@/components/common/section'
import { HoneypotField } from '@/components/common/honeypot-field'
import { cn } from '@/lib/utils'
import { submitForm } from '@/lib/submit'
import { focusAreas } from '@/lib/content/training'

const HOURS_PER_MODULE = 4

export function ProgrammeBuilder() {
  const [selected, setSelected] = useState<Array<string>>([])
  const [organisation, setOrganisation] = useState('')
  const [email, setEmail] = useState('')
  const [audience, setAudience] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggle = (module: string) =>
    setSelected((current) =>
      current.includes(module)
        ? current.filter((m) => m !== module)
        : [...current, module],
    )

  const summary = useMemo(() => {
    const areasCovered = focusAreas.filter((area) =>
      area.modules.some((module) => selected.includes(module)),
    )
    const hours = selected.length * HOURS_PER_MODULE
    return {
      areasCovered,
      hours,
      days: Math.ceil(hours / 8),
    }
  }, [selected])

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (selected.length === 0) {
      setError('Add at least one module to your programme.')
      return
    }
    if (!organisation.trim() || !email.trim()) {
      setError(
        'We need an organisation and an email address to send the quote to.',
      )
      return
    }
    if (!consent) {
      setError('Please confirm how we may use your details.')
      return
    }

    setError(null)
    setSending(true)

    const result = await submitForm('/api/custom-programme', {
      organisation,
      email,
      audience,
      modules: selected,
      focusAreas: summary.areasCovered.map((area) => area.name),
      estimatedDays: summary.days,
      consent,
      website,
    })

    setSending(false)

    if (!result.ok) {
      setError(result.errors.join(' '))
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="shell">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        {/* Module picker */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between border-b border-border pb-5">
            <h2 className="text-xl font-bold text-ink-900">
              Choose Your Modules
            </h2>
            {selected.length > 0 ? (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-signal-700"
              >
                <FiTrash2 className="size-3.5" aria-hidden="true" />
                Clear
              </button>
            ) : null}
          </div>

          <div className="mt-8 space-y-8">
            {focusAreas.map((area) => {
              const chosen = area.modules.filter((m) =>
                selected.includes(m),
              ).length
              return (
                <section key={area.id}>
                  <div className="flex items-baseline gap-3">
                    <IndexLabel n={area.id} />
                    <h3 className="text-base font-bold text-ink-900">
                      {area.name}
                    </h3>
                    {chosen > 0 ? (
                      <span className="numeric ml-auto text-xs font-semibold text-signal-700">
                        {chosen} selected
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 ml-9 text-sm text-muted-foreground">
                    {area.blurb}
                  </p>

                  <div className="mt-4 ml-9 flex flex-wrap gap-2">
                    {area.modules.map((module) => {
                      const isSelected = selected.includes(module)
                      return (
                        <button
                          key={module}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => toggle(module)}
                          className={cn(
                            'inline-flex items-center gap-2 border px-3.5 py-2 text-sm font-medium transition-colors',
                            isSelected
                              ? 'border-signal-500 bg-signal-50 text-signal-800'
                              : 'border-border bg-white text-ink-700 hover:border-ink-300 hover:bg-sand-50',
                          )}
                        >
                          {isSelected ? (
                            <FiCheck className="size-3.5" aria-hidden="true" />
                          ) : (
                            <FiPlus
                              className="size-3.5 text-ink-300"
                              aria-hidden="true"
                            />
                          )}
                          {module}
                        </button>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        {/* Summary & request */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {submitted ? (
              <div className="border border-signal-300 bg-signal-50 p-6 sm:p-8">
                <FiCheck
                  className="size-6 text-signal-700"
                  aria-hidden="true"
                />
                <h2 className="mt-5 text-xl font-bold text-ink-900">
                  Programme Submitted
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We have your outline of {selected.length} module
                  {selected.length === 1 ? '' : 's'} across{' '}
                  {summary.areasCovered.length} focus area
                  {summary.areasCovered.length === 1 ? '' : 's'}. Our training
                  team will come back to {email} with a costed proposal and a
                  suggested cohort schedule.
                </p>
                <Button
                  variant="outline"
                  className="mt-7"
                  onClick={() => setSubmitted(false)}
                >
                  Amend the programme
                </Button>
              </div>
            ) : (
              <div className="border border-border bg-white">
                <div className="surface-ink p-7">
                  <p className="eyebrow text-signal-400">Your programme</p>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <Stat value={selected.length} label="Modules" />
                    <Stat value={summary.areasCovered.length} label="Areas" />
                    <Stat value={summary.days} label="Est. days" />
                  </div>
                  <p className="mt-5 text-[0.6875rem] leading-relaxed text-ink-400">
                    Duration assumes a half-day per module. Final structure and
                    pricing are confirmed by our training team.
                  </p>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {selected.length === 0 ? (
                    <p className="px-7 py-6 sm:py-10 text-center text-sm text-muted-foreground">
                      No modules selected. Choose modules from any focus area to
                      build a programme.
                    </p>
                  ) : (
                    <ul className="divide-y divide-border">
                      {selected.map((module) => (
                        <li
                          key={module}
                          className="flex items-center justify-between gap-3 px-7 py-3"
                        >
                          <span className="text-sm text-ink-800">{module}</span>
                          <button
                            type="button"
                            onClick={() => toggle(module)}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                            aria-label={`Remove ${module}`}
                          >
                            <FiX className="size-4" aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="relative border-t border-border p-7"
                >
                  <HoneypotField
                    name="website"
                    value={website}
                    onChange={setWebsite}
                  />
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="builder-org"
                        className="mb-2 block text-xs font-semibold tracking-[0.08em] text-ink-800 uppercase"
                      >
                        Organisation
                      </label>
                      <input
                        id="builder-org"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        autoComplete="organization"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="builder-email"
                        className="mb-2 block text-xs font-semibold tracking-[0.08em] text-ink-800 uppercase"
                      >
                        Work email
                      </label>
                      <input
                        id="builder-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="builder-audience"
                        className="mb-2 block text-xs font-semibold tracking-[0.08em] text-ink-800 uppercase"
                      >
                        Who is it for
                      </label>
                      <input
                        id="builder-audience"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="40 county finance officers"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3">
                    <Checkbox
                      id="builder-consent"
                      checked={consent}
                      onCheckedChange={(value) => setConsent(value === true)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor="builder-consent"
                      className="text-xs leading-relaxed text-muted-foreground"
                    >
                      CaliberCode may use these details to prepare this quote,
                      per the{' '}
                      <a
                        href="/privacy"
                        className="text-ink-700 underline underline-offset-2"
                      >
                        privacy notice
                      </a>
                      .
                    </label>
                  </div>

                  {error ? (
                    <p role="alert" className="mt-4 text-xs text-destructive">
                      {error}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={sending}
                    className="mt-6 w-full bg-signal-500 text-ink-950 hover:bg-signal-400"
                  >
                    {sending ? 'Sending…' : 'Request a custom quote'}
                    <FiSend
                      className="size-3.5"
                      data-icon="inline-end"
                      aria-hidden="true"
                    />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const inputClass =
  'h-11 w-full border border-input bg-white px-4 text-sm text-ink-900 outline-none transition-colors placeholder:text-muted-foreground focus:border-signal-500'

function Stat({ value, label }: Readonly<{ value: number; label: string }>) {
  return (
    <div>
      <p className="numeric text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-[0.625rem] tracking-[0.12em] text-ink-300 uppercase">
        {label}
      </p>
    </div>
  )
}
