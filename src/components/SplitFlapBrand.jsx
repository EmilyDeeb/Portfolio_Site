export default function SplitFlapBrand({ from, to }) {
  const len = Math.max(from.length, to.length)
  // pad shorter word with spaces, and render spaces as non-breaking
  // so every flap cell keeps its width and letters stay aligned
  const pad = (s) => (s + ' '.repeat(Math.max(0, len - s.length)))
  const cell = (ch) => (ch === ' ' ? '\u00A0' : ch)
  const f = pad(from)
  const t = pad(to)

  return (
    <span className="flapline" aria-hidden="true">
      {Array.from({ length: len }).map((_, i) => (
        <span className="flap" key={i}>
          <span className="flap__roll" style={{ '--d': `${i * 20}ms` }}>
            <span>{cell(f[i])}</span>
            <span>{cell(t[i])}</span>
          </span>
        </span>
      ))}
    </span>
  )
}