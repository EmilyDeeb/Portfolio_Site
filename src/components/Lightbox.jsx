import { useEffect, useState } from 'react'

const pad2 = (n) => (n < 10 ? '0' + n : '' + n)

export default function Lightbox({ images, openIndex, onClose }) {
  const isOpen = openIndex !== null && openIndex !== undefined
  const count = images.length
  const [current, setCurrent] = useState(openIndex ?? 0)

  useEffect(() => {
    if (isOpen) setCurrent(openIndex)
  }, [openIndex, isOpen])

  const show = (i) => setCurrent(((i % count) + count) % count)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') show(current - 1)
      else if (e.key === 'ArrowRight') show(current + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, current])

  if (!count) return null
  const item = images[current]
  const multi = count > 1

  return (
    <div
      className={`lightbox${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Project screens gallery"
      aria-hidden={!isOpen}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <button className="lightbox__close" type="button" aria-label="Close gallery" onClick={onClose}>
        ✕ close
      </button>
      <button
        className="lightbox__nav lightbox__nav--prev"
        type="button"
        aria-label="Previous image"
        hidden={!multi}
        onClick={() => show(current - 1)}
      >
        ←
      </button>
      <figure className="lightbox__stage">
        {item && <img className="lightbox__img" src={item.src} alt={item.alt || ''} />}
        <figcaption className="lightbox__cap">
          <span className="lightbox__count" aria-hidden="true">{pad2(current + 1)} / {pad2(count)}</span>
          <span className="lightbox__label">{item?.label || ''}</span>
        </figcaption>
      </figure>
      <button
        className="lightbox__nav lightbox__nav--next"
        type="button"
        aria-label="Next image"
        hidden={!multi}
        onClick={() => show(current + 1)}
      >
        →
      </button>
      <div className="lightbox__thumbs" hidden={!multi} role="tablist" aria-label="Jump to image">
        {multi && images.map((img, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className={`lightbox__thumb${i === current ? ' is-active' : ''}`}
            aria-selected={i === current}
            aria-label={`Show image ${i + 1}`}
            onClick={() => show(i)}
          >
            <img src={img.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}
