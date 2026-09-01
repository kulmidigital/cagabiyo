import { useRef } from 'react'

import { useCanvasCursor } from '@/hooks/use-canvas-cursor'

/**
 * Pointer trail, drawn inside whatever box it is placed in.
 *
 * Drop it into a positioned parent — it fills that parent and measures and
 * listens on it, rather than pinning itself to the viewport. Purely decorative,
 * so it is inert to the pointer and hidden from assistive technology; the links
 * underneath keep every bit of their hit area.
 */
export function CanvasCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useCanvasCursor(canvasRef)

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
