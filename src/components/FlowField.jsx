import { useEffect, useRef } from 'react'
import tube from '../content/tube.json'

/**
 * FlowField — renders the real London tube network (401 stations, 467 links)
 * behind the hero, tinted in the hero accent, with glowing particles flowing
 * along the lines like passengers. Busier lines (higher NUMBAT flow) carry
 * more particles.
 *
 * - Respects prefers-reduced-motion (static frame, no animation).
 * - Pauses when the tab is hidden. Caps DPR for performance.
 * - Fits the network to the hero with a small margin.
 */
export default function FlowField({
  particleCount = 90,   // total passengers flowing at once
  speed = 0.16,         // fraction of an edge per second (calm)
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const accent = (getComputedStyle(canvas).getPropertyValue('--acc').trim() || '#afb8fc')

    const N = tube.nodes          // [[x,y],...] normalised 0..1
    const E = tube.edges          // [[s,t,lineIdx,flow],...]
    let width = 0, height = 0, dpr = 1
    let sx = 1, sy = 1, ox = 0, oy = 0

    function layout() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width; height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const scale = 1.35   // >1 zooms the network in; try 1.2–1.6
      const availW = width
      const s = Math.min(width, height) * scale
      sx = width * scale
      sy = s
      ox = (width - sx) / 2
      oy = (height - sy) / 2
    }

    const px = (i) => ox + N[i][0] * sx
    const py = (i) => oy + N[i][1] * sy

    function hexRgba(hex, a) {
      let h = hex.replace('#', '')
      if (h.length === 3) h = h.split('').map((c) => c + c).join('')
      const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
      return `rgba(${r},${g},${b},${a})`
    }

    const maxFlow = Math.max.apply(null, E.map((e) => e[3])) || 1
    const weights = E.map((e) => 0.25 + (e[3] / maxFlow))
    const wsum = weights.reduce((a, b) => a + b, 0)
    function pickEdge() {
      let r = Math.random() * wsum
      for (let i = 0; i < E.length; i++) { r -= weights[i]; if (r <= 0) return i }
      return E.length - 1
    }
    const particles = []
    function seedParticles() {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({ e: pickEdge(), t: Math.random(), sp: speed * (0.6 + Math.random() * 0.9) })
      }
    }

    let last = performance.now(), raf = null

    function drawNetwork() {
      ctx.lineWidth = 1
      for (const e of E) {
        ctx.strokeStyle = hexRgba(accent, 0.16)
        ctx.beginPath()
        ctx.moveTo(px(e[0]), py(e[0]))
        ctx.lineTo(px(e[1]), py(e[1]))
        ctx.stroke()
      }
      ctx.fillStyle = hexRgba(accent, 0.4)
      for (let i = 0; i < N.length; i++) {
        ctx.beginPath(); ctx.arc(px(i), py(i), 1.3, 0, Math.PI * 2); ctx.fill()
      }
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05); last = now
      ctx.clearRect(0, 0, width, height)
      drawNetwork()
      for (const p of particles) {
        const e = E[p.e]
        p.t += p.sp * dt
        if (p.t > 1) { p.t = 0; p.e = pickEdge(); continue }
        const x = px(e[0]) + (px(e[1]) - px(e[0])) * p.t
        const y = py(e[0]) + (py(e[1]) - py(e[0])) * p.t
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 5)
        glow.addColorStop(0, hexRgba(accent, 0.95))
        glow.addColorStop(1, hexRgba(accent, 0))
        ctx.fillStyle = glow
        ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }

    function start() { if (raf) cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame) }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = null }
    function staticFrame() { ctx.clearRect(0, 0, width, height); drawNetwork() }

    layout(); seedParticles()
    if (reduce) staticFrame(); else start()

    const onResize = () => { layout(); if (reduce) staticFrame() }
    const onVis = () => { if (document.hidden) stop(); else if (!reduce) start() }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [particleCount, speed])

  return <canvas ref={canvasRef} className="flowfield" aria-hidden="true" />
}
