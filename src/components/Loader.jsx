import { useEffect, useState } from 'react'

const RUN = 500
const ALT = 250
const REVEAL = 660

export default function Loader({ word, words }) {
  const list = words && words.length ? words : [word || 'Hola']
  const [wordIndex, setWordIndex] = useState(0)
  const [revealing, setRevealing] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    if (window.scrollY) window.scrollTo(0, 0)

    let swap
    if (list.length > 1) {
      let i = 0
      swap = setInterval(() => {
        i = (i + 1) % list.length
        setWordIndex(i)
      }, ALT)
    }

    const t1 = setTimeout(() => {
      if (swap) clearInterval(swap)
      setRevealing(true)
    }, RUN)
    const t2 = setTimeout(() => {
      setHidden(true)
      html.style.overflow = prevOverflow
    }, RUN + REVEAL + 120)

    return () => {
      if (swap) clearInterval(swap)
      clearTimeout(t1)
      clearTimeout(t2)
      html.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (hidden) return null

  return (
    <div
      className={`loader${revealing ? ' is-revealing' : ''}`}
      style={{ '--loader-run': `${RUN}ms` }}
      role="presentation"
      aria-hidden="true"
    >
      <div className="loader__box">
        <span className="loader__word">{list[wordIndex]}</span>
        <div className="loader__bar" aria-hidden="true"><span></span></div>
      </div>
    </div>
  )
}
