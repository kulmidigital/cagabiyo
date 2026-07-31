/**
 * Bot trap. The server rejects any submission where this arrives non-empty.
 *
 * Positioned off-screen rather than `display: none` — some bots skip fields
 * that are explicitly hidden, and this is meant to be filled in. It is taken
 * out of the tab order and hidden from assistive tech so nobody real meets it.
 */
export function HoneypotField({
  name,
  value,
  onChange,
}: Readonly<{
  name: 'company' | 'website'
  value: string
  onChange: (value: string) => void
}>) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
    >
      <label htmlFor={`hp-${name}`}>Leave this field empty</label>
      <input
        id={`hp-${name}`}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
