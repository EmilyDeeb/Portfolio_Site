import { useEffect, useState } from 'react'

export default function TableOfContents({ sections }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const spy = () => {
      const pos = window.scrollY + window.innerHeight * 0.28
      let current = sections[0]?.id
      sections.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= pos) current = s.id
      })
      setActive(current)
    }
    spy()
    window.addEventListener('scroll', spy, { passive: true })
    return () => window.removeEventListener('scroll', spy)
  }, [sections])

  if (!sections.length) return null

  return (
    <nav className="cs-toc" aria-label="Section navigation">
      <ol>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>{s.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
