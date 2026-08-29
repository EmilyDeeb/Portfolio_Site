import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="e404">
      <div className="e404__inner">
        <div className="e404__box">
          <p className="e404__num" aria-label="404">
            4<span className="e404__zero" aria-hidden="true"></span>4
          </p>
          <p className="e404__cap">Got lost?</p>
        </div>
        <Link className="e404__btn" to="/">Return to home</Link>
      </div>
    </main>
  )
}
