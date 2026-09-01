import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import {
  FiArrowUpRight,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from 'react-icons/fi'
// Feather has no TikTok glyph; fa6 does.
import { FaTiktok } from 'react-icons/fa6'

import { Logo } from '@/components/layout/logo'
import { NewsletterForm } from '@/components/layout/newsletter-form'
import { SmartLink } from '@/components/common/smart-link'
import { footerNav, offices, site } from '@/lib/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="surface-ink relative overflow-hidden">
      <div className="grain absolute inset-0" aria-hidden="true" />

      {/* Newsletter */}
      <div className="relative border-b border-white/10">
        <div className="shell grid gap-8 py-6 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-signal-400">Newsletter</p>
            <h2 className="display-md mt-4 text-white">Regulatory Briefing</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-200">
              Regulatory change across East Africa, plus new programmes and open
              masterclass dates. One email a month.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative border-b border-white/10">
        <div className="shell grid gap-10 py-6 sm:py-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo className="h-11" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-200">
              {site.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink
                href={site.social.linkedin}
                label="LinkedIn, opens in a new tab"
              >
                <FiLinkedin className="size-4" aria-hidden="true" />
              </SocialLink>
              <SocialLink
                href={site.social.facebook}
                label="Facebook, opens in a new tab"
              >
                <FiFacebook className="size-4" aria-hidden="true" />
              </SocialLink>
              <SocialLink
                href={site.social.instagram}
                label="Instagram, opens in a new tab"
              >
                <FiInstagram className="size-4" aria-hidden="true" />
              </SocialLink>
              <SocialLink
                href={site.social.tiktok}
                label="TikTok, opens in a new tab"
              >
                <FaTiktok className="size-3.5" aria-hidden="true" />
              </SocialLink>
              <SocialLink
                href={`mailto:${site.contact.email}`}
                label="Email us"
              >
                <FiMail className="size-4" aria-hidden="true" />
              </SocialLink>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-8 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4"
          >
            {footerNav.map((column) => (
              <div key={column.heading}>
                <p className="eyebrow mb-4 text-signal-400">{column.heading}</p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <SmartLink
                        href={link.to}
                        className="link-wipe text-sm text-ink-200 transition-colors hover:text-white"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Offices */}
      <div className="relative border-b border-white/10">
        <div className="shell py-6 sm:py-10">
          <p className="eyebrow mb-6 text-signal-400">Regional offices</p>
          <div className="rule-grid-ink grid sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office) => (
              <div key={office.city} className="p-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-base font-bold text-white">
                    {office.city}
                  </h3>
                  {office.headquarters ? (
                    <span className="text-[0.625rem] font-semibold tracking-[0.14em] text-signal-500 uppercase">
                      HQ
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs tracking-widest text-ink-400 uppercase">
                  {office.country}
                </p>
                <address className="mt-3 space-y-0.5 text-sm not-italic text-ink-200">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-signal-400 uppercase transition-colors hover:text-signal-300"
                >
                  <FiMapPin className="size-3.5" aria-hidden="true" />
                  Directions
                  <FiArrowUpRight className="size-3" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="relative">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-ink-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <li>
              <Link
                to="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy notice
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms & booking policy
              </Link>
            </li>
            <li>
              <Link to="/verify" className="transition-colors hover:text-white">
                Verify a certificate
              </Link>
            </li>
            <li className="text-ink-400">
              Data handled under the Kenya Data Protection Act, 2019
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: Readonly<{
  href: string
  label: string
  children: ReactNode
}>) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="inline-flex size-9 items-center justify-center border border-white/15 text-ink-200 transition-colors hover:border-signal-500 hover:text-signal-400"
    >
      {children}
    </a>
  )
}
