import { Link } from 'react-router-dom'
import data from '../content/projects.json'

export default function Footer() {
  const { designer } = data

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="brand" aria-label={`${designer.name} — home`}>
            <span>{designer.name}</span>
          </Link>
          <p className="footer-blurb">{designer.title} based in {designer.location}.</p>
        </div>
        <div>
          <h4>pages</h4>
          <div className="footer-links">
            <Link to="/work">Work</Link>
            <Link to="/about">About</Link>
            <Link to="/">Home</Link>
          </div>
        </div>
        <div>
          <h4>elsewhere</h4>
          <div className="footer-links">
            <a href={`mailto:${designer.email}?subject=Hello`}>Email</a>
            <a href={designer.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={designer.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} {designer.name}</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  )
}
