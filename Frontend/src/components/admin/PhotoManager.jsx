import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import CategoryFilter from '../CategoryFilter'
import PhotoListItem from './PhotoListItem'
import PhotoForm from './PhotoForm'

const PhotoManager = () => {
  const {
    allPhotos, setAllPhotos,
    loading,
    errorMessage, setErrorMessage,
    successMessage, setSuccessMessage
  } = useOutletContext()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(null)
  const [preview, setPreview] = useState(null)
  const [editPreview, setEditPreview] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    description: ''
  })
  const [editFormData, setEditFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    description: ''
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [editSelectedFile, setEditSelectedFile] = useState(null)

  const categories = ['all', 'weddings', 'portraits', 'nature', 'commercials']

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const filteredPhotos = selectedCategory === 'all'
  ? allPhotos
  : allPhotos.filter(photo => photo.category === selectedCategory)

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setSelectedFile(file)
      const imageUrl = URL.createObjectURL(file)
      setFormData({
        ...formData,
        imageUrl: imageUrl
      })
      setPreview(imageUrl)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!formData.title || !formData.category) {
      setErrorMessage('Please fill in all required fields')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('description', formData.description || '')

      if (selectedFile) {
        formDataToSend.append('image', selectedFile)
      }

      const response = await fetch('http://localhost:3001/api/photos/upload', {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add photo.')
      }

      const newPhoto = await response.json()
      setAllPhotos([newPhoto.photo, ...allPhotos])
      setSuccessMessage('Photo added successfully!')
      setFormData({ title: '', category: '', imageUrl: '', description: '' })
      setIsAdding(false)
      setPreview(null)
      setSelectedFile(null)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to add photo')
      console.error('Error adding photo:', error)
    }
  }

  const handleEditClick = (photo) => {
    // Sets isEditing to photo ID
    setIsEditing(photo._id)

    // Pre-fills editFormData with photo data
    setEditFormData({
      title: photo.title,
      category: photo.category,
      imageUrl: photo.imageUrl,
      description: photo.description || ''
    })

// Sets editPreview to existing image URL
    setEditPreview(photo.imageUrl)
    // Closes add form if open
    setIsAdding(false)
// Clears messages
    setErrorMessage('')
    setSuccessMessage('')
    setEditSelectedFile(null)
  }

  const handleEditInputChange = (event) => {
    const { name, value } = event.target

    setEditFormData({
      ...editFormData,
      [name]: value
    })

    if (errorMessage) setErrorMessage('')
  }

  const handleEditFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setEditSelectedFile(file)
      const imageUrl = URL.createObjectURL(file)
      setEditFormData({
        ...editFormData,
        imageUrl: imageUrl
      })

      setEditPreview(imageUrl)
    }
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!editFormData.title || !editFormData.category) {
      setErrorMessage('Please fill in all required fields')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const formDataToSend = new FormData()
      formDataToSend.append('title', editFormData.title)
      formDataToSend.append('category', editFormData.category)
      formDataToSend.append('description', editFormData.description || '')

      if (editSelectedFile) {
        formDataToSend.append('image', editSelectedFile)
      } else if (editFormData.imageUrl) {
        formDataToSend.append('imageUrl', editFormData.imageUrl)
      }

      const response = await fetch(`http://localhost:3001/api/photos/${isEditing}`, {
        method: 'PUT',
        headers: {
          'Authorization' : `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update photo')
      }

      const updatedPhoto = await response.json()

      const updatedPhotos = allPhotos.map(photo =>
        photo._id === isEditing ? updatedPhoto : photo
      )

      setAllPhotos(updatedPhotos)
      setSuccessMessage('Photo updated successfully!')
      setIsEditing(null)
      setEditFormData({
        title: '',
        category: '',
        imageUrl: '',
        description: ''
      })
      setEditPreview(null)
      setEditSelectedFile(null)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to update photo')
      console.error('Error updating photo:', error)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
    setEditFormData({
      title: '',
      category: '',
      imageUrl: '',
      description: ''
    })
    setEditPreview(null)
    setEditSelectedFile(null)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this photo')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3001/api/photos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error ||'Failed to delete photo')
        }

        const updatedPhotos = allPhotos.filter(photo => photo._id !== id)
        setAllPhotos(updatedPhotos)
        setSuccessMessage('Photo deleted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to delete photo')
        console.error('Error deleting photo:', error)
      }
    }
  }

  if (loading) {
    return <div>Loading photos...</div>
  }

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryClick}
      />

      {!isAdding && !isEditing && (
      <button onClick={() => {
        setIsAdding(true)
        setIsEditing(null)
      }}>
        Add New Photo
      </button>
      )}

      {isAdding && (
        <PhotoForm
          formData={formData}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onCancel={() => setIsAdding(false)}
          preview={preview}
          isEditing={false}
          submitLabel="Add Photo"
        />
      )}

      <div>
        {filteredPhotos.length === 0 ? (
          <p>No photos available in this category. Add your first photo!</p>
        ) : (
          filteredPhotos.map(photo => (
            <div key={photo._id}>
              <PhotoListItem
                photo={photo}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
              {isEditing === photo._id && (
                <PhotoForm
                  formData={editFormData}
                  onInputChange={handleEditInputChange}
                  onFileChange={handleEditFileChange}
                  onSubmit={handleEditSubmit}
                  onCancel={handleCancelEdit}
                  preview={editPreview}
                  isEditing={true}
                  submitLabel={"Update Photo"}
                />
              )}
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default PhotoManager
