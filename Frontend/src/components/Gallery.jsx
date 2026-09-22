import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useData } from '../context/DataContext'
import PhotoList from './PhotoList'
import CategoryFilter from './CategoryFilter'

const Gallery = () => {
  const { photos, loading, errorMessage } = useData()
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  )

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const categories = ['all', 'weddings', 'portraits', 'nature', 'commercials']

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

  if (errorMessage) {
    return (
      <div className="gallery-error">
        <p>Error: {errorMessage}</p>
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
