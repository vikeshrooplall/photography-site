import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const [allPhotos, setAllPhotos] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingContacts, setLoadingContacts] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch contact requests.')
      }

      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoadingContacts(false)
    }
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <NavLink
          to="/admin/photos"
          style={({ isActive }) => ({
            padding: '10px 20px',
            backgroundColor: isActive ? '#007bff' : '#f0f0f0',
            color: isActive ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none'
          })}
        >
          Manage Photos
        </NavLink>

        <NavLink
          to="/admin/requests"
          style={({ isActive }) => ({
            padding : '10px 20px',
            backgroundColor: isActive ? '#007bff' : '#f0f0f0',
            color: isActive ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none'
          })}
        >
          Contact Requests ({contacts.length})
        </NavLink>
      </div>
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</div>
      )}

      {successMessage && (
        <div style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</div>
      )}

      <Outlet context ={{
        allPhotos, setAllPhotos,
        contacts, setContacts,
        loading, loadingContacts,
        errorMessage, setErrorMessage,
        successMessage, setSuccessMessage
      }} />
    </div>
  )
}

export default AdminLayout
