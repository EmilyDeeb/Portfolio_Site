import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../content/projects.json'
import { FILTERS } from '../content/categories'
import ProjectEntry from '../components/ProjectEntry'

function yearRange(projects) {
  const years = projects
    .flatMap((p) => (p.year ?? '').match(/\d{4}/g) ?? [])
    .map(Number)
  if (!years.length) return null
  return `${Math.min(...years)} — ${Math.max(...years)}`
}

export default function Work() {
  const { projects: allProjects } = data
  const projects = allProjects.filter((p) => !p.hidden)
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  )

  return (
    <>
      <section className="page-head" aria-label="Work header">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/">home</Link>
          <span className="sep" aria-hidden="true">/</span>
          <span className="here">work</span>
        </nav>
        <h1 className="display page-title">Selected work.</h1>
        <p className="page-dek">
          Urban systems, landscape and data — projects that map, model or design how
          cities and territories work.
        </p>
        <p className="work-note">
          <span>{projects.length} projects</span>
          {yearRange(projects) && <span>{yearRange(projects)}</span>}
          <span>data · urban design</span>
        </p>
        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-tab${filter === f.value ? ' active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Project list">
        {filtered.map((project, i) => (
          <ProjectEntry key={project.id} project={project} index={i} first={i === 0} />
        ))}
      </section>
    </>
  )
}
