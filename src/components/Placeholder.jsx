export default function Placeholder({ ratio = 'r-16-10', dim, tag = 'image', note, className = '' }) {
  return (
    <div className={`ph ${ratio} ${className}`.trim()}>
      <span className="ph__tag">{tag}</span>
      {dim && <span className="ph__dim">{dim}</span>}
      <span className="ph__note">{note}</span>
    </div>
  )
}
