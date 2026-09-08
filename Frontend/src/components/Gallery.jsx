import { useState, useEffect } from 'react'
import PhotoList from './PhotoList'
import CategoryFilter from './CategoryFilter'

const Gallery = () => {
  const [photos, setPhotos] = useState([])
  const [ selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const categories = ['all', 'weddings', 'portraits', 'nature', 'commercials']

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('http://localhost:3001/api/photos')

        if (!response.ok) {
          throw new Error('Failed to fetch photos')
        }

        const data = await response.json()
        setPhotos(data)
      } catch (error) {
        setError(error.message)
        console.error('Error fetching photos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  const handleClick = (category) => {
    setSelectedCategory(category)
  }

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory)

    if (loading) {
      return (
        <div className="gallery-loading">
          <p>Loading photos...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="gallery-error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )
    }

  return (
    <div className="gallery">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleClick}
      />
      {photos.length === 0 ? (
        <p className="no-photos">No photos available</p>
      ) : (
        <PhotoList photos={filteredPhotos} />
      )}
    </div>
  )
}

export default Gallery
