import { useState, useEffect } from 'react'
import CategoryFilter from './CategoryFilter'

const AdminDashboard = () => {
  const [allPhotos, setAllPhotos] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingContacts, setLoadingContacts] = useState(true)
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
  const [selectedFile, setSelectedFile] = useState(null)
  const [editSelectedFile, setEditSelectedFile] = useState(null)
  const [activeTab, setActiveTab] = useState('photos')

  const categories = ['all', 'weddings', 'portraits', 'nature', 'commercials']

  useEffect(() => {
    fetchPhotos()
    fetchContacts()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/api/photos')

      if (!response.ok) {
        throw new Error('Failed to fetch photos')
      }

      const data = await response.json()
      setAllPhotos(data)
    } catch (error) {
      console.error('Error fetching Photos:', error)
      setErrorMessage('Failed to load photos.')
    } finally {
      setLoading(false)
    }
  }

  const fetchContacts = async () => {
    try {
      setLoadingContacts(true)
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3001/api/contacts', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch contacts')
      }

      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoadingContacts(false)
    }
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const filteredPhotos = selectedCategory === 'all'
    ? allPhotos
    : allPhotos.filter(photo => photo.category === selectedCategory)

  const handleFileChange =  (event) => {
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
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add photo')
      }

      const newPhoto = await response.json()
      setAllPhotos([newPhoto.photo, ...allPhotos])
      setSuccessMessage('Photo added successfully!')
      setFormData({ title: '', category: '', imageUrl: '', description: ''})
      setIsAdding(false)
      setPreview(null)
      setSelectedFile(null)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to add photo')
      console.error('Error adding photo:', error)
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
        photo.id === isEditing ? updatedPhoto : photo
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
          throw new Error(errorData.error || 'Failed to delete photo')
        }
        const updatedPhotos = allPhotos.filter(photo => photo.id !== id)
        setAllPhotos(updatedPhotos)
        setSuccessMessage('Photo deleted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (error) {
        setErrorMessage(error.message || 'Failed to delete photo')
        console.error('Error deleting photo:', error)
      }
    }
  }

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact request?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to delete contact')
        }

        const updatedContacts = contacts.filter(contact => contact._id !== id)
        setContacts(updatedContacts)
        setSuccessMessage('Contact deleted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to delete Contact.')
        console.error('Error deleting contact:', error)
      }
    }
  }

  if (loading) {
    return <div>Loading photos...</div>
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('photos')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'photos' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'photos' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Manage Photos
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'requests' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'requests' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Contact Requests ({contacts.length})
        </button>
      </div>
      {activeTab === 'photos' && (
        <div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleCategoryClick}
          />
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
                  required
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
                <p style={{ fontSize: '12px', color: '#666'}}>Leave empty to keep current image.</p>
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
            {filteredPhotos.length === 0 ? (
              <p>No photos available in this category. Add your first photo!</p>
            ) : (
              filteredPhotos.map(photo => (
                <div key={photo.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0'}}>
                  <img src={photo.imageUrl} alt={photo.title} style={{width: '100px'}} />
                  <h3>{photo.title}</h3>
                  <p>Category: {photo.category}</p>
                  <p>{photo.description}</p>
                  <button onClick={() => handleEditClick(photo)}>Edit</button>
                  <button onClick={() => handleDelete(photo.id)}>Delete</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div>
          <h3>Contact Requests</h3>
          {loadingContacts ? (
            <p>Loading contacts...</p>
          ) : contacts.length === 0 ? (
            <p>No contact requests yet.</p>
          ) : (
            <div>
              {contacts.map(contact => (
                <div key={contact._id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '4px'}}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                    <div>
                      <h4>{contact.name}</h4>
                      <p><strong>Email:</strong> {contact.email}</p>
                      {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                      <p><strong>Message:</strong> {contact.message}</p>
                      <p style={{ fontSize: '12px', color: '#666' }}>
                        <strong>Received:</strong> {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer'}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {errorMessage && <div style={{ color: 'red', marginTop: '20px' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green', marginTop: '20px'}}>{successMessage}</div>}
    </div>
  )
}

export default AdminDashboard
