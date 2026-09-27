import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Hero from './Hero'
import Marquee from './Marquee'
import './styles/Home.css'

const Home = () => {
  const { photos } = useData()

  const categories = ['weddings', 'portraits', 'nature', 'commercials']

  // One entry per category — photo may be null
  const featuredItems = categories.map(category => ({
    category,
    photo: photos.find(photo => photo.category === category) || null
  }))

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
          {featuredItems.map(({ category, photo }) => {
            // If this category has no photo → placeholder
            if (!photo) {
              return (
                <div
                  key={category}
                  className="featured-card featured-card--placeholder"
                >
                  <h3 className="featured-card-label">{category}</h3>
                  <div className="featured-card-image featured-card-image--placeholder">
                    <span className="featured-card-placeholder-text">
                      Coming soon
                    </span>
                  </div>
                </div>
              )
            }

            // If we have a photo → real card
            return (
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
            )
          })}
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
