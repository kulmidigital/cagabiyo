/**
 * Email design tokens.
 *
 * Kept separate from `styles.css` because email clients cannot read a
 * stylesheet — every value has to be inlined on the element. The palette is the
 * same brand system the site uses: main #10386E, secondary #F79229 (BRAND-01,
 * BRAND-02).
 */

import { site } from '@/lib/site'

export const brand = {
  ink950: '#040e1d',
  ink900: '#07182f',
  ink800: '#0a2243',
  ink600: '#10386e',
  ink300: '#6d97cd',
  ink200: '#a5c1e2',
  ink100: '#d4e2f2',
  ink50: '#eef4fb',

  signal500: '#f79229',
  signal600: '#e07714',
  signal50: '#fff7ed',

  sand100: '#f5f2ed',
  white: '#ffffff',
  border: '#e3e8ef',
  muted: '#55657d',
} as const

/**
 * The wordmark is white with secondary-orange lettering on transparency, so it
 * only reads on a dark field (BRAND-03, BRAND-07) — hence the ink header band.
 * Served from a CDN because email clients will not load a relative path.
 */
export const LOGO_URL =
  'https://res.cloudinary.com/dtwyxgcb2/image/upload/v1785512583/logo_rg1wjg.png'

export const fontStack =
  "'Plus Jakarta Sans', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"

/**
 * Re-exported from the site config so a domain change lands in one place. The
 * templates used to spell the host out, which meant nine copies to keep in step.
 */
export const SITE_URL = site.url
export const SITE_HOST = site.url.replace(/^https?:\/\//, '')
