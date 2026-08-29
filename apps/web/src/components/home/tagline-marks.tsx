/**
 * Line marks for the hero tagline — a bulb for Develop, a shield for Comply,
 * a rising chart for Elevate.
 *
 * Drawn here as strokes rather than imported as artwork, because the effect
 * depends on it: a stroked path can be drawn on with `stroke-dashoffset`, and
 * a flattened or filled icon cannot. Every path carries `pathLength="1"`, which
 * normalises its length to 1 unit regardless of real geometry — so one CSS rule
 * animates all of them without measuring anything.
 *
 * Two things are deliberate about the geometry:
 *
 *  - All three are drawn to the same vertical extent, y 3.3 to 20.8. Sized only
 *    by a `size-*` class they looked like different sizes, because each filled
 *    a different share of its box — the chart stood 15.3 units against the
 *    shield's 18.8, so it read noticeably smaller beside the same word.
 *  - The viewBox is cropped to the artwork rather than left at `0 0 24 24`.
 *    The marks are about 16 units wide, so a square box carried four units of
 *    empty space down each side; against the word that padding read as a gap
 *    no `gap-*` could close, because it sits inside the element. Paired with
 *    `w-auto`, the element is now only as wide as the mark it holds.
 */

const VIEWBOX = '3 2 18 20'

export type TaglineMark = {
  /** Stroke colour utility. All three carry the brand orange. */
  tone: string
  /**
   * Optical correction toward the word, where a mark's leftmost ink is lighter
   * than its bounding box suggests. Spacing that is equal by measurement is
   * not equal by eye.
   */
  nudge?: string
  /** Drawn in order, each starting shortly after the last. */
  paths: Array<string>
}

/**
 * Keyed by the word, so the tagline stays the single source of truth. The value
 * is optional because a lookup genuinely can miss — change `site.tagline` and
 * the word falls through to text with no mark, rather than crashing.
 */
export const taglineMarks: Record<string, TaglineMark | undefined> = {
  Develop: {
    tone: 'text-signal-500',
    // The other two marks meet the word with a solid edge — the shield's
    // outline, the chart's baseline. The bulb meets it with the tip of one
    // hairline ray, and the glass does not begin for another three units, so
    // at equal spacing it sits visibly further out. Pulled back by about half
    // that difference: enough to even the rhythm, not so much that the ray
    // crowds the full stop.
    nudge: '-ml-0.5 lg:-ml-1',
    // Glass on a circle centred (12, 10.8) r 4.2, then the fitting and base.
    // The five rays follow, each specified from its inner end outward — the
    // dash animation draws from the start of a path, so the light grows away
    // from the glass rather than toward it.
    paths: [
      'M12 6.6a4.2 4.2 0 0 0-2.52 7.55c.46.35.73.9.73 1.48v.47h3.58v-.47c0-.58.27-1.13.73-1.48A4.2 4.2 0 0 0 12 6.6Z',
      'M10.21 18.4h3.58',
      'M11 20.6h2',
      'M12 5.1V3.3',
      'M8.73 6.13 7.7 4.66',
      'M15.27 6.13 16.3 4.66',
      'M6.49 9.32 4.76 8.86',
      'M17.51 9.32 19.24 8.86',
    ],
  },
  Comply: {
    tone: 'text-signal-500',
    paths: [
      'M12 3.3 4.8 6.2v5.5c0 4.2 2.95 7.7 7.2 9.1 4.25-1.4 7.2-4.9 7.2-9.1V6.2L12 3.3Z',
      'M8.9 11.9 11.15 14.15l4.15-4.15',
    ],
  },
  Elevate: {
    tone: 'text-signal-500',
    paths: [
      'M4 20.8h16',
      'M7.6 20.8v-4.6',
      'M12 20.8v-8.1',
      'M16.4 20.8v-11.6',
      'M4.7 13.4 9.1 9l3.5 3.5L19.3 4',
      'M14.8 4h4.5v4.5',
    ],
  },
}

export function TaglineMarkIcon({ mark }: Readonly<{ mark: TaglineMark }>) {
  return (
    <svg
      viewBox={VIEWBOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`tagline-mark h-7 w-auto flex-none sm:h-9 lg:h-11 ${mark.tone} ${mark.nudge ?? ''}`}
    >
      {mark.paths.map((d) => (
        <path key={d} d={d} pathLength={1} />
      ))}
    </svg>
  )
}
