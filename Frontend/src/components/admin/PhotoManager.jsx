import { useState } from 'react'
import { useData } from '../../context/DataContext'
import CategoryFilter from '../CategoryFilter'
import PhotoForm from './PhotoForm'
import Modal from './Modal'
import AdminPhotoCard from './AdminPhotoCard'
import Lightbox from '../Lightbox'
import './PhotoManager.css'

const HEIGHTS = [510, 450, 370, 660, 490, 620, 430, 510, 580, 420]

const PhotoManager = () => {
  const {
    photos, setPhotos,
    loading,
    errorMessage, setErrorMessage,
    successMessage, setSuccessMessage
  } = useData()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(null)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    description: ''
  })
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const categories = ['all', 'weddings', 'portraits', 'nature', 'commercials']

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory)

  // ============ Add / Edit Modal ============
  const openAddModal = () => {
    setFormData({ title: '', category: '', imageUrl: '', description: '' })
    setPreview(null)
    setSelectedFile(null)
    setIsEditing(null)
    setIsModalOpen(true)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const openEditModal = (photo) => {
    setFormData({
      title: photo.title,
      category: photo.category,
      imageUrl: photo.imageUrl,
      description: photo.description || ''
    })
    setPreview(photo.imageUrl)
    setSelectedFile(null)
    setIsEditing(photo._id)
    setIsModalOpen(true)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditing(null)
    setFormData({ title: '', category: '', imageUrl: '', description: '' })
    setPreview(null)
    setSelectedFile(null)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    if (errorMessage) setErrorMessage('')
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      const imageUrl = URL.createObjectURL(file)
      setFormData({ ...formData, imageUrl })
      setPreview(imageUrl)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!formData.title || !formData.category) {
      setErrorMessage('Please fill in all required fields.')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const body = new FormData()
      body.append('title', formData.title)
      body.append('category', formData.category)
      body.append('description', formData.description || '')

      let url = 'http://localhost:3001/api/photos/upload'
      let method = 'POST'

      if (isEditing) {
        url = `http://localhost:3001/api/photos/${isEditing}`
        method = 'PUT'
        if (selectedFile) {
          body.append('image', selectedFile)
        } else {
          body.append('imageUrl', formData.imageUrl)
        }
      } else if (selectedFile) {
        body.append('image', selectedFile)
      }

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save photo.')
      }

      const savedPhoto = await response.json()

      if (isEditing) {
        const updatedPhoto = savedPhoto.photo || savedPhoto
        setPhotos(photos.map(p => (p._id === isEditing ? updatedPhoto : p)))
        setSuccessMessage('Photo updated successfully!')
      } else {
        const newPhoto = savedPhoto.photo || savedPhoto
        setPhotos([newPhoto, ...photos])
        setSuccessMessage('Photo added successfully!')
      }

      closeModal()
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save photo.')
      console.error('Photo save error:', err)
    }
  }

  // ============ Delete ============
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/api/photos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete photo.')
      }

      const updatedPhotos = photos.filter(p => p._id !== id)
      setPhotos(updatedPhotos)
      setSuccessMessage('Photo deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)

      // Advance lightbox to next photo, or close if empty
      if (lightboxIndex !== null) {
        const newFiltered = selectedCategory === 'all'
          ? updatedPhotos
          : updatedPhotos.filter(p => p.category === selectedCategory)

        if (newFiltered.length === 0) {
          setLightboxIndex(null)
        } else if (lightboxIndex >= newFiltered.length) {
          setLightboxIndex(newFiltered.length - 1)
        }
        // Otherwise, keep the same index (next photo takes its place)
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to delete photo.')
      console.error('Photo delete error:', err)
    }
  }

  // ============ Lightbox ============
  const handlePhotoView = (photo) => {
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

  const handleLightboxEdit = (photo) => {
    setLightboxIndex(null)
    openEditModal(photo)
  }

  return (
    <div className="photo-manager">

      {/* Category filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Add button */}
      <div className="photo-manager-actions">
        <button
          type="button"
          className="photo-manager-add-btn"
          onClick={openAddModal}
        >
          + Add New Photo
        </button>
      </div>

      {/* Loading / empty / grid */}
      {loading ? (
        <div className="photo-manager-state">
          <p>Loading photos...</p>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="photo-manager-state">
          <p>No photos in this category yet.</p>
          <button
            type="button"
            className="photo-manager-add-btn"
            onClick={openAddModal}
          >
            + Add Your First Photo
          </button>
        </div>
      ) : (
        <div className="photo-manager-grid">
          {filteredPhotos.map((photo, index) => (
            <AdminPhotoCard
              key={photo._id}
              photo={photo}
              height={HEIGHTS[index % HEIGHTS.length]}
              onView={handlePhotoView}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? 'Edit Photo' : 'Add New Photo'}
      >
        <PhotoForm
          formData={formData}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          preview={preview}
          isEditing={!!isEditing}
          submitLabel={isEditing ? 'Update Photo' : 'Add Photo'}
        />
      </Modal>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredPhotos.length > 0 && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          onClose={handleLightboxClose}
          onNavigate={handleLightboxNavigate}
          actions={(photo) => (
            <>
              <button
                type="button"
                className="lightbox-action-edit"
                onClick={(e) => {
                  e.stopPropagation()
                  handleLightboxEdit(photo)
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="lightbox-action-delete"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(photo._id)
                }}
              >
                Delete
              </button>
            </>
          )}
        />
      )}

    </div>
  )
}

export default PhotoManager
