import { Link, useLocation } from 'react-router-dom'
import data from '../content/projects.json'
import SplitFlapBrand from './SplitFlapBrand'

export default function Navbar() {
  const { designer } = data
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label={`${designer.name} — home`}>
          <SplitFlapBrand from="Emily Deeb" to="Portfolio" />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link to="/work" aria-current={isActive('/work') ? 'page' : undefined}>Work</Link>
          <Link to="/about" aria-current={isActive('/about') ? 'page' : undefined}>About</Link>
          <a href={`mailto:${designer.email}?subject=Hello`}>Email</a>
        </nav>
      </div>
    </header>
  )
}
