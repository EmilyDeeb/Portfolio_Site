import { Link } from 'react-router-dom'
import { CATEGORY_LABEL } from '../content/categories'

export default function ProjectEntryMin({ project, index }) {
  return (
    <Link to={`/projects/${project.id}`} className="entry entry-min">
      <div className="entry__side">
        <span className="idx">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="entry__min-body">
        <span className="min-name">{project.title}</span>
        <span className="min-desc">{project.subtitle}</span>
        <span className="min-tag">{CATEGORY_LABEL[project.category] ?? project.category}</span>
      </div>
    </Link>
  )
}
