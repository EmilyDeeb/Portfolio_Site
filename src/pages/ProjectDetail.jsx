import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import data from '../content/projects.json'
import { CATEGORY_LABEL } from '../content/categories'
import ReadingProgress from '../components/ReadingProgress'
import TableOfContents from '../components/TableOfContents'
import Lightbox from '../components/Lightbox'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects: allProjects } = data
  const projects = allProjects.filter((p) => !p.hidden)
  const currentIndex = projects.findIndex((p) => p.id === id)
  const project = projects[currentIndex]
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const articleRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  const flatImages = useMemo(
    () => (project?.images ?? []).map((img) => ({
      src: `${import.meta.env.BASE_URL}images/${img.file}`,
      alt: img.caption,
      label: img.caption,
    })),
    [project]
  )

  const isUrbanDesign = project?.category === 'urban-design'

  // Scroll-synced rail: reveal the project's employer callouts progressively
  // as the reader moves down the article, then fade out near the end.
  const callouts = project?.callouts ?? []
  const [revealedCount, setRevealedCount] = useState(0)
  const [railFaded, setRailFaded] = useState(false)

  useEffect(() => {
    setRevealedCount(0)
    setRailFaded(false)
    const total = callouts.length
    if (!total) return

    const onScroll = () => {
      const article = articleRef.current
      if (!article) return
      const rect = article.getBoundingClientRect()
      const vh = window.innerHeight
      // progress through the article body, 0..1
      const scrolled = Math.min(Math.max(-rect.top + vh * 0.45, 0), rect.height)
      const progress = rect.height > 0 ? scrolled / rect.height : 0
      // reveal callouts across the first ~75% of the article, evenly spaced
      const revealSpan = 0.72
      const count = Math.min(total, Math.ceil((progress / revealSpan) * total))
      setRevealedCount(Math.max(0, count))

      const endEl = document.getElementById('images') || document.getElementById('outcome')
      if (endEl) setRailFaded(endEl.getBoundingClientRect().top < vh * 0.5)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [id, project])

  // Swap mode: show only the current callout (the most recently revealed one)
  const activeIndex = Math.min(Math.max(revealedCount - 1, 0), Math.max(callouts.length - 1, 0))
  const currentCallout = callouts.length > 0 && revealedCount > 0
    ? { ...callouts[activeIndex], i: activeIndex }
    : null

  const sections = useMemo(() => {
    const list = []
    project?.body?.forEach((section, i) => {
      if (section.heading) list.push({ id: `sec-${i}`, label: section.heading })
    })
    if (project?.images?.length && !project?.images_inline) list.push({ id: 'images', label: 'Images' })
    if (project?.metrics?.length) list.push({ id: 'outcome', label: 'Outcome' })
    return list
  }, [project])

  const renderSecImage = (idx, { narrow = false } = {}) => {
    const img = project.images?.[idx]
    if (!img) return null
    return (
      <figure className={`sec-image${narrow ? ' sec-image--narrow' : ''}`}>
        <button
          type="button"
          className="figzoom"
          aria-label="Expand image to full size"
          onClick={() => setLightboxIndex(idx)}
        >
          <img className="figimg" src={`${import.meta.env.BASE_URL}images/${img.file}`} alt={img.caption} loading="lazy" />
        </button>
        {img.caption && (
          <figcaption className="exhibit__cap">
            <p>{img.caption}</p>
          </figcaption>
        )}
      </figure>
    )
  }

  const renderSecImageGrid = (indices) => {
    if (!indices?.length) return null
    return (
      <div className="sec-image-grid">
        {indices.map((idx) => (
          <div key={idx}>{renderSecImage(idx)}</div>
        ))}
      </div>
    )
  }

  const renderSecImageColumn = (indices) => {
    if (!indices?.length) return null
    return (
      <div className="sec-image-col">
        {indices.map((idx) => <div key={idx}>{renderSecImage(idx)}</div>)}
      </div>
    )
  }

  const renderSecImageRow = (indices, caption) => {
    if (!indices?.length) return null
    return (
      <figure className="sec-image-row">
        <div className="sec-image-row__grid" style={{ gridTemplateColumns: `repeat(${indices.length}, 1fr)` }}>
          {indices.map((idx) => {
            const img = project.images?.[idx]
            if (!img) return null
            return (
              <button
                key={idx}
                type="button"
                className="figzoom"
                aria-label="Expand image to full size"
                onClick={() => setLightboxIndex(idx)}
              >
                <img className="figimg r-1-1" src={`${import.meta.env.BASE_URL}images/${img.file}`} alt={img.caption} loading="lazy" />
              </button>
            )
          })}
        </div>
        {caption && (
          <figcaption className="exhibit__cap">
            <p>{caption}</p>
          </figcaption>
        )}
      </figure>
    )
  }

  if (!project) {
    return (
      <div className="page-head">
        <h1 className="display page-title">Project not found</h1>
        <div className="cs-actions">
          <button className="btn" onClick={() => navigate('/work')}>← Back to work</button>
        </div>
      </div>
    )
  }

  const metaFields = [
    project.year && { label: 'Year', value: project.year },
    project.location && { label: 'Location', value: project.location },
    project.institution && { label: 'Institution', value: project.institution },
    project.client && { label: 'Client', value: project.client },
    project.role && { label: 'Role', value: project.role },
    project.team && { label: 'Team', value: project.team },
  ].filter(Boolean)

  return (
    <div className={`category-${project.category} project-${project.id}`}>
      <ReadingProgress targetRef={articleRef} />

      <div ref={articleRef} data-article>
        <header className="cs-head">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link to="/">home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <Link to="/work">work</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="here">{project.title}</span>
          </nav>
          <p className="cs-kicker">{CATEGORY_LABEL[project.category] ?? project.category} · {project.year}</p>

          <div className="cs-head-grid">
            <div className="cs-head-main">
              <h1 className="cs-title">{project.title}</h1>

              {project.overview && (
                <div className="tldr" style={{ marginTop: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                  {metaFields.length > 0 && (
                    <div className="tldr__meta">
                      {metaFields.map((f) => (
                        <span key={f.label}><span className="k">{f.label}</span> {f.value}</span>
                      ))}
                    </div>
                  )}
                  <div className="tldr__body">
                    {project.overview.split('\n').map((para, i) => (
                      <p key={i} style={i > 0 ? { marginTop: '0.9em' } : undefined}>{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {project.tools?.length > 0 && (
                <p className="work-note" style={{ marginTop: '1.25rem' }}>
                  {project.tools.map((t) => <span key={t}>{t}</span>)}
                </p>
              )}

              {(project.external_url || project.github_url) && (
                <div className="cs-actions">
                  {project.external_url && (
                    <a href={project.external_url} target="_blank" rel="noreferrer" className="btn">
                      explore the app <span className="ar" aria-hidden="true">→</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-ghost">
                      {project.github_note ?? 'GitHub'} ↗
                    </a>
                  )}
                </div>
              )}
            </div>

            {project.hero_image && (
              <div className="cs-head-media">
                <img className="figimg figimg--uncropped" src={`${import.meta.env.BASE_URL}images/${project.hero_image}`} alt={project.title} />
              </div>
            )}
          </div>
        </header>

        <div className="cs-body">
          <div className="cs-grid">
            <TableOfContents sections={sections} />

            <div className="cs-main">
              {project.body?.map((section, i) => (
                <section
                  className="sec"
                  id={section.heading ? `sec-${i}` : undefined}
                  key={i}
                >
                  {section.heading && (
                    <>
                      <p className="sec__label"><span className="n">{String(i + 1).padStart(2, '0')}</span></p>
                      <h3 className="sec__h">{section.heading}</h3>
                    </>
                  )}
                  <div className="prose">
                    {section.text && <p>{section.text}</p>}
                    {section.image !== undefined && renderSecImage(section.image)}
                    {section.text2 && <p>{section.text2}</p>}
                    {section.image2pre !== undefined && renderSecImage(section.image2pre, { narrow: true })}
                    {section.image2 !== undefined && renderSecImage(section.image2)}
                    {section.imageGrid && renderSecImageGrid(section.imageGrid)}
                    {section.images && renderSecImageColumn(section.images)}
                    {section.imageRow && renderSecImageRow(section.imageRow, section.imageRowCaption)}
                    {section.imageAfterRow !== undefined && renderSecImage(section.imageAfterRow)}
                  </div>
                </section>
              ))}

              {project.images?.length > 0 && !project.images_inline && (
                <section className="sec" id="images">
                  <p className="sec__label"><span className="n">img</span> All images</p>
                  <div className="img-strip">
                    {project.images.map((img, i) => (
                      <button
                        type="button"
                        className="img-strip__item"
                        key={i}
                        aria-label={`Expand image ${i + 1} to full size`}
                        onClick={() => setLightboxIndex(i)}
                      >
                        <img
                          className="img-strip__img"
                          src={`${import.meta.env.BASE_URL}images/${img.file}`}
                          alt={img.caption}
                          loading="lazy"
                        />
                        <span className="img-strip__n">{String(i + 1).padStart(2, '0')}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {project.metrics?.length > 0 && (
                <section className="sec" id="outcome">
                  <p className="sec__label"><span className="n">out</span> Outcome</p>
                  <div className="metrics">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="metric-cell">
                        <div className="big">{m.value}</div>
                        <div className="lab">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className={`cs-rail${railFaded ? ' is-faded' : ''}`} aria-label="Project notes" aria-hidden={railFaded ? 'true' : undefined}>
              <div className="cs-rail__inner">
                {metaFields.length > 0 && (
                  <dl className="cs-rail__meta">
                    {metaFields.map((f) => (
                      <div className="cs-rail__row" key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {currentCallout && (
                  <div className="cs-rail__block">
                    <p className="cs-rail__h">For stakeholders</p>
                    <ul className="cs-rail__notes">
                      <li key={currentCallout.i} className="cs-rail__note is-current">
                        <span className="cs-rail__note-label">{currentCallout.label}</span>
                        {currentCallout.text}
                      </li>
                    </ul>
                  </div>
                )}

                {(project.external_url || project.github_url) && (
                  <div className="cs-rail__links">
                    {project.external_url && (
                      <a href={project.external_url} target="_blank" rel="noreferrer" className="btn">
                        explore the app <span className="ar" aria-hidden="true">→</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-ghost">
                        {project.github_note ?? 'GitHub'} ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {(prevProject || nextProject) && (
        <div className="cs-next-wrap">
          {nextProject ? (
            <Link className="cs-next next" to={`/projects/${nextProject.id}`}>
              <span>
                <span className="nx-label">Next case study</span>
                <span className="nx-title">{nextProject.title}</span>
              </span>
              <span className="nx-ar" aria-hidden="true">→</span>
            </Link>
          ) : prevProject && (
            <Link className="cs-next" to={`/projects/${prevProject.id}`}>
              <span className="nx-ar" aria-hidden="true">←</span>
              <span>
                <span className="nx-label">Previous case study</span>
                <span className="nx-title">{prevProject.title}</span>
              </span>
            </Link>
          )}
        </div>
      )}

      <Lightbox images={flatImages} openIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
    </div>
  )
}