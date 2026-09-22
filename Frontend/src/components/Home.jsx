import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Hero from './Hero'
import Marquee from './Marquee'
import './Home.css'

const Home = () => {
  const { photos } = useData()

  // One photo per category
  const categories = ['weddings', 'portraits', 'nature', 'commercials']
  const featuredPhotos = categories
    .map(category => photos.find(photo => photo.category === category))
    .filter(Boolean)

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <Hero imageUrl="https://picsum.photos/id/1015/1600/900">
        <h1 className="hero-title">Memento Memories</h1>
        <p className="hero-tagline">Photographs that feel like memories</p>
        <Link to="/gallery" className="hero-cta">
          View Gallery
        </Link>
      </Hero>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      {/* ===== FEATURED WORK ===== */}
      <section className="featured">
        <div className="featured-grid">
          {featuredPhotos.length === 0 ? (
            <p className="featured-empty">No photos available yet.</p>
          ) : (
            featuredPhotos.map(photo => (
              <Link
                key={photo._id}
                to={`/gallery?category=${photo.category}`}
                className="featured-card"
              >
                <h3 className="featured-card-label">{photo.category}</h3>
                <div className="featured-card-image">
                  <img src={photo.imageUrl} alt={photo.title} />
                </div>
              </Link>
            ))
          )}
        </div>
        <Link to="/gallery" className="featured-link">
          View Full Gallery →
        </Link>
      </section>

      {/* ===== INTRODUCTION ===== */}
      <section className="intro">
        <p className="intro-text">
          Memento Memories is the photography studio of Vashish Cahanoo —
          drawn to quiet moments, honest light, and the stories that unfold
          between them. The work spans weddings, portraits, nature, and
          commercial projects, always guided by the same belief: the best
          photographs are the ones you feel before you see.
        </p>
        <p className="intro-signature">— Vashish</p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-name">Memento Memories</p>
            <p className="footer-tagline">Photography by Vashish Cahanoo</p>
          </div>

          <div className="footer-links">
            <Link to="/gallery">Gallery</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Pinterest">Pinterest</a>
            <a href="mailto:hello@example.com">Email</a>
          </div>
        </div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} Memento Memories — Photography by Vashish Cahanoo
        </p>
      </footer>

    </div>
  )
}

export default Home
