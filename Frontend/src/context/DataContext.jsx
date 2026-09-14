import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const { isLoggedIn } = useAuth()

  const [photos, setPhotos] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingContacts, setLoadingContacts] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const unreadCount = contacts.filter(contact => !contact.isRead).length

  const fetchPhotos = async () => {
    try {
      setLoading(true)

      const response = await fetch('http://localhost:3001/api/photos')

      if (!response.ok) {
        throw new Error('Failed to fetch photos')
      }

      const data = await response.json()
      setPhotos(data)
    } catch (error) {
      console.error('Error fetching photos:', error)
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
        throw new Error('Failed to fetch contact requests')
      }

      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoadingContacts(false)
    }
  }

  useEffect(() => {
    fetchPhotos()

    if (isLoggedIn) {
      fetchContacts()
    }
  }, [isLoggedIn])

  return (
    <DataContext.Provider value={{
      photos, setPhotos,
      contacts, setContacts,
      unreadCount,
      loading, loadingContacts,
      successMessage, setSuccessMessage,
      errorMessage, setErrorMessage,
      fetchPhotos, fetchContacts
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
