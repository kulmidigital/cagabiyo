import { cn } from '@/lib/utils'
import { photoSrc, photoSrcSet } from '@/lib/images'
import type { Photo as PhotoData } from '@/lib/images'

type PhotoProps = {
  photo: PhotoData
  /** Overrides the alt travelling with the photo — pass '' for decorative use. */
  alt?: string
  className?: string
  /** Rendered width used to pick the fallback `src`. */
  width?: number
  ratio?: number
  sizes?: string
  crop?: 'entropy' | 'faces' | 'center' | 'top'
  quality?: number
  /** Set on the LCP image only; everything else stays lazy. */
  priority?: boolean
}

export function Photo({
  photo,
  alt,
  className,
  width = 1200,
  ratio,
  sizes = '100vw',
  crop = 'faces',
  quality,
  priority = false,
}: Readonly<PhotoProps>) {
  return (
    <img
      src={photoSrc(photo, { w: width, ratio, crop, q: quality })}
      srcSet={photoSrcSet(photo, { ratio, crop, q: quality })}
      sizes={sizes}
      alt={alt ?? photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
