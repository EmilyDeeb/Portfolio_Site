import { useEffect, useState } from 'react'

export default function ReadingProgress({ targetRef }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const el = targetRef.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      setPct(total > 0 ? scrolled / total : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [targetRef])

  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${pct})` }} />
    </div>
  )
}
