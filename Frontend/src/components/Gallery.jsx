import { useState } from 'react'
import PhotoList from './PhotoList'
import CategoryFilter from './CategoryFilter'

const Gallery = ({ photos }) => {
  const [ selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'weddings', 'portraits', 'nature', 'commercials']

  const handleClick = (category) => {
    setSelectedCategory(category)
  }

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleClick}
      />
      <PhotoList photos={filteredPhotos} />
    </div>
  )
}

export default Gallery
