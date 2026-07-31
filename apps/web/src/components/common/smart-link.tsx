import { Link } from '@tanstack/react-router'
import type { ComponentProps, ReactNode } from 'react'

type SmartLinkProps = Omit<
  ComponentProps<typeof Link>,
  'to' | 'hash' | 'search'
> & {
  href: string
  children?: ReactNode
}

export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  // External destinations and protocol links bypass the router entirely.
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  const [pathAndSearch = '', hash] = href.split('#')
  const [pathname = '/', searchString] = pathAndSearch.split('?')

  const search = searchString
    ? Object.fromEntries(new URLSearchParams(searchString))
    : undefined

  return (
    <Link
      // Hrefs originate from content, so they cannot be verified against the
      // generated route tree at compile time. This is the single crossing point.
      to={pathname}
      {...(hash ? { hash } : {})}
      {...(search ? { search: search as never } : {})}
      {...props}
    >
      {children}
    </Link>
  )
}
