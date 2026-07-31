import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { services } from '@/lib/content/services'
import { publishedCourses, focusAreas } from '@/lib/content/training'
import { insights } from '@/lib/content/insights'
import {
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiFileText,
  FiLayers,
  FiSearch,
} from 'react-icons/fi'
import { events } from '@/lib/content/events'

type ResultGroup = {
  heading: string
  icon: typeof FiSearch
  items: Array<{
    id: string
    title: string
    subtitle: string
    href: string
    keywords: Array<string>
  }>
}

export function SiteSearch() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const groups = useMemo<Array<ResultGroup>>(
    () => [
      {
        heading: 'Advisory services',
        icon: FiBriefcase,
        items: services.map((service) => ({
          id: `service-${service.slug}`,
          title: service.name,
          subtitle: service.summary,
          href: `/services/${service.slug}`,
          keywords: [
            service.discipline,
            ...service.seo.keywords,
            ...service.capabilities,
          ],
        })),
      },
      {
        heading: 'Courses',
        icon: FiBookOpen,
        items: publishedCourses.map((course) => ({
          id: `course-${course.slug}`,
          title: course.title,
          subtitle: `${course.level} · ${course.delivery} · ${course.hours} hours`,
          href: `/capacity-building/courses`,
          keywords: [
            course.level,
            course.delivery,
            course.credential,
            course.summary,
          ],
        })),
      },
      {
        heading: 'Insights & whitepapers',
        icon: FiFileText,
        items: insights.map((insight) => ({
          id: `insight-${insight.slug}`,
          title: insight.title,
          subtitle: `${insight.type} · ${insight.author}`,
          href: `/resources`,
          keywords: [
            insight.type,
            insight.author,
            ...insight.topics,
            insight.summary,
          ],
        })),
      },
      {
        heading: 'Events & workshops',
        icon: FiCalendar,
        items: events.map((event) => ({
          id: `event-${event.slug}`,
          title: event.title,
          subtitle: `${event.kind} · ${event.city}`,
          href: `/events`,
          keywords: [event.kind, event.format, event.city, event.summary],
        })),
      },
      {
        heading: 'Training focus areas',
        icon: FiLayers,
        items: focusAreas.map((area) => ({
          id: `area-${area.id}`,
          title: area.name,
          subtitle: area.blurb,
          href: `/capacity-building/courses`,
          keywords: area.modules,
        })),
      },
    ],
    [],
  )

  const go = (href: string) => {
    setOpen(false)
    const [pathname = '/', hash] = href.split('#')
    // The dialog is already closed by this point, so a rejected navigation
    // would otherwise fail silently and leave the user on the current page.
    navigate({ to: pathname as never, ...(hash ? { hash } : {}) }).catch(
      (error: unknown) => {
        console.error('Search navigation failed', { href, error })
      },
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        aria-keyshortcuts="Meta+K Control+K"
        className="inline-flex size-10 items-center justify-center text-ink-100 transition-colors hover:bg-white/10 hover:text-white"
      >
        <FiSearch className="size-[1.15rem]" aria-hidden="true" />
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search CaliberCode"
        description="Search advisory services, courses, events, insights and whitepapers."
        className="max-w-2xl"
      >
        <CommandInput placeholder="Search services, courses, events, insights…" />
        <CommandList className="max-h-[min(26rem,60vh)]">
          <CommandEmpty>
            <div className="px-3 py-6 sm:py-10 text-center">
              <p className="text-sm font-semibold text-foreground">
                No matches
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a broader term: a practice area, a focus area, or a city.
              </p>
            </div>
          </CommandEmpty>

          {groups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${group.heading}`}
                  keywords={item.keywords}
                  onSelect={() => go(item.href)}
                  className="items-start gap-3 py-2.5"
                >
                  <group.icon
                    className="mt-0.5 size-4 text-signal-600"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
