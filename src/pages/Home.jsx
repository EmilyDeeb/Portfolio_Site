import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../content/projects.json'
import { FILTERS } from '../content/categories'
import ProjectEntry from '../components/ProjectEntry'
import ProjectEntryMin from '../components/ProjectEntryMin'

export default function Home() {
  const { designer, about, projects: allProjects } = data
  const projects = allProjects.filter((p) => !p.hidden)
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  )
  const featured = filtered.filter((p) => p.featured).slice(0, 2)
  const featuredIds = new Set(featured.map((p) => p.id))
  const more = filtered.filter((p) => !featuredIds.has(p.id))

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero hero--centered" aria-label="Hero">
        <div className="hero__center">
          <p className="hero__eyebrow">
            <span>{designer.title}</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>{designer.location}</span>
            {about.openToWork && (
              <>
                <span className="sep" aria-hidden="true">/</span>
                <span className="status"><span className="sq" aria-hidden="true"></span>Open to work</span>
              </>
            )}
          </p>
          <h1 className="display hero__title">Hi, I&rsquo;m <em>{designer.name}</em></h1>
          <p className="body-lg hero__tagline">{designer.tagline}</p>
          <div className="hero__cta">
            <a href="#projects" className="btn">view work</a>
            <Link to="/about" className="btn btn-ghost">about</Link>
          </div>
        </div>
      </section>

      {/* ── Selected work (featured) ── */}
      <section aria-label="Selected work" id="projects">
        <p className="cap"><span className="num">02</span> Selected work</p>
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

        {filtered.length === 0 && (
          <p className="page-dek" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) var(--pad)' }}>
            No projects match this filter yet.
          </p>
        )}

        {featured.map((project, i) => (
          <ProjectEntry key={project.id} project={project} index={i} first={i === 0} />
        ))}
      </section>

      {/* ── More work ── */}
      {more.length > 0 && (
        <section aria-label="More work">
          {more.map((project, i) => (
            <ProjectEntryMin key={project.id} project={project} index={featured.length + i} />
          ))}
        </section>
      )}

      {/* ── Positioning ── */}
      <section className="positioning" aria-label="Positioning">
        <p className="label" style={{ marginBottom: '1.25rem' }}>-</p>
        <p className="h3">{about.positioning}</p>
      </section>

            {/* ── About + contact ── */}
      <section aria-label="About and contact">
        <div className="row entry-first">
          <div className="row__side"><span>about</span></div>
          <div className="about-body">
            <p className="body">{about.prose[0]}</p>
            <Link className="a a-ink" to="/about">more about me →</Link>
          </div>
        </div>
        <div className="row">
          <div className="row__side"><span>contact</span></div>
          <div className="contact-card">
            <p className="label">let&rsquo;s have a coffee</p>
            <p>{about.contactInvite}</p>
            <div className="contact-cta">
              <a className="btn" href={`mailto:${designer.email}`}>{designer.email}</a>
              <a className="btn btn-ghost" href={designer.linkedin} target="_blank" rel="noreferrer">
                linkedin <span className="ar" aria-hidden="true">→</span>
              </a>
              <a className="btn btn-ghost" href={`${import.meta.env.BASE_URL}CV/Emily_Deeb_CV_DS.pdf`} target="_blank" rel="noreferrer">
                CV <span className="ar" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
