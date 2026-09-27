import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Hero from './Hero'
import CategoryFilter from './CategoryFilter'
import PhotoList from './PhotoList'
import Lightbox from './Lightbox'
import './styles/Gallery.css'

const Gallery = () => {
  const { photos, loading, errorMessage } = useData()
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  )
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const categories = ['all', 'weddings', 'portraits', 'nature', 'commercials']

  const handleClick = (category) => {
    setSelectedCategory(category)
    setLightboxIndex(null) // Close lightbox if open
  }

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory)

  const handlePhotoClick = (photo) => {
    const index = filteredPhotos.findIndex(p => p._id === photo._id)
    if (index !== -1) {
      setLightboxIndex(index)
    }
  }

  const handleLightboxClose = () => {
    setLightboxIndex(null)
  }

  const handleLightboxNavigate = (direction) => {
    if (lightboxIndex === null) return
    const newIndex =
      (lightboxIndex + direction + filteredPhotos.length) %
      filteredPhotos.length
    setLightboxIndex(newIndex)
  }

  return (
    <div className="gallery">

      {/* ===== HERO ===== */}
      <Hero
        imageUrl="https://picsum.photos/id/1039/1600/900"
        title="Gallery"
        subtitle="A curated selection of work"
      />

      {/* ===== CATEGORY FILTER ===== */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleClick}
      />

      {/* ===== MAIN CONTENT ===== */}
      <main className="gallery-main">
        {loading ? (
          <div className="gallery-loading">
            <p>Loading photos...</p>
          </div>
        ) : errorMessage ? (
          <div className="gallery-error">
            <p>Error: {errorMessage}</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="gallery-empty">
            <p>No photos available yet.</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="gallery-empty">
            <p>No photos available in this category.</p>
            <button
              type="button"
              className="gallery-empty-link"
              onClick={() => setSelectedCategory('all')}
            >
              View All Archives
            </button>
          </div>
        ) : (
          <PhotoList
            photos={filteredPhotos}
            onPhotoClick={handlePhotoClick}
          />
        )}
      </main>

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

      {/* ===== LIGHTBOX ===== */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          onClose={handleLightboxClose}
          onNavigate={handleLightboxNavigate}
        />
      )}

    </div>
  )
}

export default Gallery
