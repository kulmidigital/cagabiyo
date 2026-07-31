import type { ReactNode } from 'react'
import type { VariantProps } from 'class-variance-authority'

import { Button } from '@/components/ui/button'
import type { buttonVariants } from '@/components/ui/button'
import { SmartLink } from '@/components/common/smart-link'

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  onClick,
}: Readonly<
  {
    href: string
    children: ReactNode
    className?: string
    onClick?: () => void
  } & VariantProps<typeof buttonVariants>
>) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      nativeButton={false}
      render={<SmartLink href={href} onClick={onClick} />}
    >
      {children}
    </Button>
  )
}
