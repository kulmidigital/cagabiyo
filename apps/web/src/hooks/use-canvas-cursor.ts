import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Springy ribbon trail that follows the pointer across a canvas.
 *
 * Each trail is a chain of nodes pulled toward the pointer by a spring and
 * toward the node ahead of it by a weaker one, then damped by friction. Drawing
 * a quadratic curve through the chain turns that lag into the ribbon; running
 * several chains at slightly different spring constants is what gives the
 * silky, fanned look.
 *
 * Scoped rather than global. The reference implementation pins its canvas to
 * the viewport and listens on `document`, which would have drawn over the whole
 * page; this measures and listens on the canvas's own parent, so the effect
 * lives inside whatever box it is dropped into.
 */

type Node = { x: number; y: number; vx: number; vy: number }

const SETTINGS = {
  /** Chains drawn. Each one is a full pass of the node loop. */
  trails: 12,
  /** Nodes per chain — the ribbon's length. */
  size: 30,
  friction: 0.5,
  dampening: 0.25,
  tension: 0.98,
  /**
   * Brand blue (#10386E) at low alpha — overlapping strokes build the density.
   * Pitched lower than an orange of the same weight would be: the blue is far
   * darker than the sheet it draws on, so twelve chains stack up much faster.
   */
  stroke: 'rgba(16, 56, 110, 0.18)',
  lineWidth: 1,
}

export function useCanvasCursor(
  canvasRef: RefObject<HTMLCanvasElement | null>,
): void {
  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // The whole thing is pointer-driven decoration; there is nothing to soften
    // for someone who has asked for less motion, so it simply does not run.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let width = 0
    let height = 0
    let frame: number | null = null
    let running = false

    // Start at the centre so the trails do not whip in from the origin on the
    // first pointer move.
    const pointer = { x: 0, y: 0 }

    const makeChain = (spring: number) => ({
      spring: spring + 0.1 * Math.random() - 0.05,
      friction: SETTINGS.friction + 0.01 * Math.random() - 0.005,
      nodes: Array.from({ length: SETTINGS.size }, (): Node => ({
        x: pointer.x,
        y: pointer.y,
        vx: 0,
        vy: 0,
      })),
    })

    let chains: Array<ReturnType<typeof makeChain>> = []

    const seed = () => {
      chains = Array.from({ length: SETTINGS.trails }, (_, i) =>
        makeChain(0.4 + (i / SETTINGS.trails) * 0.025),
      )
    }

    const measure = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (width === 0 || height === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineWidth = SETTINGS.lineWidth
      ctx.strokeStyle = SETTINGS.stroke
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      // Every index below is in range by construction: the chains are built at
      // a fixed length and the loops are bounded by it. `size` must stay >= 3
      // for the curve pass to have a node to finish on.
      for (const chain of chains) {
        let spring = chain.spring
        const nodes = chain.nodes
        const head = nodes[0]

        head.vx += (pointer.x - head.x) * spring
        head.vy += (pointer.y - head.y) * spring

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]

          if (i > 0) {
            const ahead = nodes[i - 1]
            node.vx += (ahead.x - node.x) * spring
            node.vy += (ahead.y - node.y) * spring
            node.vx += ahead.vx * SETTINGS.dampening
            node.vy += ahead.vy * SETTINGS.dampening
          }

          node.vx *= chain.friction
          node.vy *= chain.friction
          node.x += node.vx
          node.y += node.vy
          spring *= SETTINGS.tension
        }

        // A quadratic through the midpoints of consecutive nodes, so the chain
        // reads as one curve rather than a polyline.
        ctx.beginPath()
        ctx.moveTo(head.x, head.y)
        let i = 1
        for (; i < nodes.length - 2; i++) {
          const a = nodes[i]
          const b = nodes[i + 1]
          ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) * 0.5, (a.y + b.y) * 0.5)
        }
        const a = nodes[i]
        const b = nodes[i + 1]
        ctx.quadraticCurveTo(a.x, a.y, b.x, b.y)
        ctx.stroke()
      }

      frame = requestAnimationFrame(step)
    }

    const start = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(step)
    }

    const stop = () => {
      running = false
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      if (width > 0 && height > 0) ctx.clearRect(0, 0, width, height)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      start()
    }

    // Nothing to trail once the pointer leaves the box, and no reason to keep
    // a frame loop alive behind a closed menu.
    const onPointerLeave = () => stop()

    measure()
    pointer.x = width / 2
    pointer.y = height / 2
    seed()

    const resizeObserver = new ResizeObserver(() => measure())
    resizeObserver.observe(container)
    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave)

    return () => {
      stop()
      resizeObserver.disconnect()
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [canvasRef])
}
