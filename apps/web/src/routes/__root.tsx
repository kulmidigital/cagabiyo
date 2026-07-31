import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import { seo } from '@/lib/seo'
import { site } from '@/lib/site'
import { SiteShell } from '@/components/layout/site-shell'

export const Route = createRootRoute({
  head: () => {
    const base = seo({
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      path: '/',
    })

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Matches the header/footer ink surface so mobile browser chrome
        // blends into the page rather than banding against it.
        { name: 'theme-color', content: '#040e1d' },
        ...base.meta,
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        // BRAND-05 — supplied favicon assets, used as provided.
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.png', type: 'image/png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
        // The Unsplash CDN serves every photograph on the site; warming the
        // connection removes a round trip from the largest paint (SEO-04).
        { rel: 'preconnect', href: 'https://images.unsplash.com' },
        { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
      ],
    }
  },
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootComponent() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  )
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-KE">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{ position: 'bottom-left' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}
