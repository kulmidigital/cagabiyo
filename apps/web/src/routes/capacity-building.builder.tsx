import { createFileRoute } from '@tanstack/react-router'

import { seo, breadcrumbSchema } from '@/lib/seo'
import { photos } from '@/lib/images'
import { JsonLd } from '@/components/common/json-ld'
import { PageHero } from '@/components/common/page-hero'
import { Section } from '@/components/common/section'
import { ProgrammeBuilder } from '@/components/capacity/programme-builder'

export const Route = createFileRoute('/capacity-building/builder')({
  head: () =>
    seo({
      title: 'Custom programme builder',
      description:
        'Assemble a training programme from modules across sixteen focus areas and submit it for a custom quote. Built for SMEs, government agencies and enterprise buyers.',
      path: '/capacity-building/builder',
      image: photos.workshopRoom,
      keywords: [
        'custom training programme Kenya',
        'bespoke corporate training East Africa',
      ],
    }),
  component: BuilderPage,
})

function BuilderPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Capacity Building', path: '/capacity-building' },
          { name: 'Programme builder', path: '/capacity-building/builder' },
        ])}
      />

      <PageHero
        eyebrow="Custom programme"
        title="Build a programme from the training taxonomy."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Capacity Building', href: '/capacity-building' },
          { label: 'Programme builder' },
        ]}
        align="wide"
      />

      <Section className="py-6 sm:py-10">
        <ProgrammeBuilder />
      </Section>
    </>
  )
}
