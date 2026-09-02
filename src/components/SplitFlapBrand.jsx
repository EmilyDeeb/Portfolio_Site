export default function SplitFlapBrand({ from, to }) {
  const len = Math.max(from.length, to.length)

  // center-pad the shorter word so it sits centered under the longer one,
  // and render spaces as non-breaking so every flap cell keeps its width
  const pad = (s) => {
    const total = len - s.length
    const left = Math.floor(total / 2)
    const right = total - left
    return ' '.repeat(left) + s + ' '.repeat(right)
  }
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