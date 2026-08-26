import { useState } from 'react'

const AdminDashboard = ({ photos }) => {
  const [allPhotos, setAllPhotos] = useState(photos)
  const [preview, setPreview] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(null)
  const [editPreview, setEditPreview] = useState(null)
  const [editFormData, setEditFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    description: ''
  })
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    description: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData({
        ...formData,
        imageUrl: imageUrl
      })
      setPreview(imageUrl)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!formData.title || !formData.category) {
      setErrorMessage('Please fill in all required fields')
      return
    }

    const newPhoto = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/400x300',
      description: formData.description || ''
    }

    setAllPhotos([...allPhotos, newPhoto])
    setSuccessMessage('Photo added successfully!')
    setFormData({ title: '', category: '', imageUrl: '', description: '' })
    setIsAdding(false)
    setPreview(null)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
    if (errorMessage) setErrorMessage('')
  }

  const handleEditClick = (photo) => {
    setIsEditing(photo.id)

    setEditFormData({
      title: photo.title,
      category: photo.category,
      imageUrl: photo.imageUrl,
      description: photo.description || ''
    })

    setEditPreview(photo.imageUrl)
    setIsAdding(false)
    setErrorMessage('')
    setSuccessMessage('')
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
      const imageUrl = URL.createObjectURL(file)
      setEditFormData({
        ...editFormData,
        imageUrl: imageUrl
      })

      setEditPreview(imageUrl)
    }
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()

    setErrorMessage('')
    setSuccessMessage('')

    if (!editFormData.title || !editFormData.category) {
      setErrorMessage('Please fill in all required fields')
      return
    }

    const updatedPhotos = allPhotos.map(photo => {
      if (photo.id === isEditing) {
        return {
          ...photo,

          title: editFormData.title,
          category: editFormData.category,
          description: editFormData.description || '',
          imageUrl: editFormData.imageUrl || photo.imageUrl
        }
      }

      return photo
    })

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
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this photo')) {
      const updatedPhotos = allPhotos.filter(photo => photo.id !== id)
      setAllPhotos(updatedPhotos)
      setSuccessMessage('Photo deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={() => {
        setIsAdding(!isAdding)
        setIsEditing(null)
      }}>
        {isAdding ? 'Cancel' : 'Add new Photo'}
      </button>

      {isAdding && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Photo Title"
              required
            />
          </div>

          <div>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="weddings">Weddings</option>
              <option value="portraits">Portraits</option>
              <option value="nature">Nature</option>
              <option value="commercials">Commercials</option>
            </select>
          </div>

          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Photo Description"
            />
            {preview && <img src={preview} alt="Preview" style={{width: '100px'}} />}
          </div>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

          <button type="submit">Add Photo</button>
        </form>
      )}

      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          <h3>Edit Photo</h3>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleEditFileChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="title"
              value={editFormData.title}
              onChange={handleEditInputChange}
              placeholder="Photo Title"
              required
            />
          </div>

          <div>
            <select
              name="category"
              value={editFormData.category}
              onChange={handleEditInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="weddings">Weddings</option>
              <option value="portraits">Portraits</option>
              <option value="nature">Nature</option>
              <option value="commercials">Commercials</option>
            </select>
          </div>

          <div>
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleEditInputChange}
              placeholder="Photo Description"
            />

            {editPreview && <img src={editPreview} alt="Preview" style={{width: '100px'}}/>}
          </div>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

          <button type="submit">Update Photo</button>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        </form>
      )}

      <div>
        {allPhotos.map(photo => (
          <div key={photo.id}>
            <img src={photo.imageUrl} alt={photo.title} style={{width: '100px'}} />
            <h3>{photo.title}</h3>
            <p>{photo.category}</p>

            <button onClick={() => handleEditClick(photo)}>Edit</button>
            <button onClick={() => handleDelete(photo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
