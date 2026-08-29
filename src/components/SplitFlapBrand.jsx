export default function SplitFlapBrand({ from, to }) {
  const len = Math.max(from.length, to.length)
  const pad = (s) => s + ' '.repeat(len - s.length)
  const f = pad(from)
  const t = pad(to)

  return (
    <span className="flapline" aria-hidden="true">
      {Array.from({ length: len }).map((_, i) => (
        <span className="flap" key={i}>
          <span className="flap__roll" style={{ '--d': `${i * 20}ms` }}>
            <span>{f[i]}</span>
            <span>{t[i]}</span>
          </span>
        </span>
      ))}
    </span>
  )
}
