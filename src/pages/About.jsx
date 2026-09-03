import { Link } from 'react-router-dom'
import data from '../content/projects.json'

export default function About() {
  const { designer, about } = data

  return (
    <>
      <section className="page-head" aria-label="About header">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/">home</Link>
          <span className="sep" aria-hidden="true">/</span>
          <span className="here">about</span>
        </nav>
        <h1 className="display page-title page-title--long">Spatial data scientist working in location intelligence and mobility — turning how people move and spend into decisions.</h1>
      </section>

      <div className="about-wrap" aria-label="About body">
        <div className="about-prose">
          {about.prose.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <div className="human">
            <span className="label">off the clock</span>
            {about.human}
          </div>

          <div className="about-cta">
            <a className="btn" href={`mailto:${designer.email}?subject=Hello`}>
              {designer.email} <span className="ar" aria-hidden="true">⧉</span>
            </a>
            <Link className="btn btn-ghost" to="/work">see the work</Link>
            <a className="btn btn-ghost" href={`${import.meta.env.BASE_URL}CV/Emily_Deeb_CV_DS.pdf`} target="_blank" rel="noreferrer">
              CV <span className="ar" aria-hidden="true">⧉</span>
            </a>
          </div>

          <img
            className="figimg r-3-2 about-prose-fig"
            src={`${import.meta.env.BASE_URL}images/projects/aboutme/about.jpeg`}
            alt="Emily Deeb"
          />
        </div>

        <aside className="about-side">
          <img
            className="figimg r-3-4 about-portrait"
            src={`${import.meta.env.BASE_URL}images/projects/aboutme/FotoEmily.jpg`}
            alt="Portrait of Emily Deeb"
          />
          <dl className="facts" aria-label="At a glance">
            {about.facts.map((f) => (
              <div className="facts__row" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </>
  )
}
