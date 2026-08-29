import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'
import data from './content/projects.json'

function loaderPropsFor(pathname) {
  if (pathname === '/') return { words: ['Hello', 'Hola'] }
  if (pathname === '/work') return { word: 'Work' }
  if (pathname === '/about') return { word: 'About' }
  const match = pathname.match(/^\/projects\/(.+)$/)
  if (match) {
    const project = data.projects.find((p) => p.id === match[1])
    return { word: project ? (project.loading_label ?? project.title) : 'Work' }
  }
  return { word: '404' }
}

export default function App() {
  const location = useLocation()
  const loaderProps = loaderPropsFor(location.pathname)

  return (
    <>
      <Loader key={location.pathname} {...loaderProps} />
      <div className="frame">
        <Navbar />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}
