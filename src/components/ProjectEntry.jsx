import { Link } from 'react-router-dom'
import { CATEGORY_LABEL } from '../content/categories'

export default function ProjectEntry({ project, index, first = false }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={`entry feat${first ? ' entry-first' : ''}`}
    >
      <div className="entry__side">
        <span className="idx">{String(index + 1).padStart(2, '0')}</span>
        <span>{project.year}</span>
      </div>
      <div className="entry__body">
        <div>
          <p className="entry__role">
            {CATEGORY_LABEL[project.category] ?? project.category}
            {project.role ? ` · ${project.role}` : ''}
          </p>
          <h2 className="h2 entry__title">
            {project.title}<span className="ar" aria-hidden="true"> →</span>
          </h2>
          <p className="entry__teaser">{project.subtitle}</p>
          <div className="entry__foot">
            <span className="entry__read"><span className="ul">read case study</span></span>
            {project.metrics?.[0] && <span>{project.metrics[0].label}</span>}
          </div>
        </div>
        <div className="entry__media">
          <img
            className="figimg r-16-10"
            src={`${import.meta.env.BASE_URL}images/${project.hero_image}`}
            alt={project.title}
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  )
}
