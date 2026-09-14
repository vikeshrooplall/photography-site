import { useOutletContext } from 'react-router-dom'
import ContactListItem from './ContactListItem'


const ContactManager = () => {
  const {
    contacts, setContacts,
    loadingContacts,
    errorMessage, setErrorMessage,
    successMessage, setSuccessMessage
  } = useOutletContext()

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact request?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to delete contact.')
        }

        const updatedContacts = contacts.filter(contact => contact._id !== id)
        setContacts(updatedContacts)
        setSuccessMessage('Contact deleted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to delete contact.')
        console.error('Error deleting contact:', error)
      }
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/api/contacts/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to mark contact request as read.')
      }

      const updatedContact = await response.json()

      const updatedContacts = contacts.map(contact =>
        contact._id === id ? updatedContact : contact
      )
      setContacts(updatedContacts)
      setSuccessMessage('Contact marked as read!')
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to mark contact as read.')
      console.error('Error marking contact as read:', error)
    }
  }

  const unreadCount = contacts.filter(contact => !contact.isRead).length

  return (
    <div>
      <h3>
        Contact Requests
        {unreadCount > 0 && `(${unreadCount})`}
      </h3>
      {loadingContacts ? (
        <p>Loading contact requests...</p>
      ) : contacts.length === 0 ? (
        <p>No contact request yet.</p>
      ) : (
        <div>
          {contacts.map(contact => (
            <ContactListItem
              key={contact._id}
              contact={contact}
              onDelete={handleDeleteContact}
              onMarkRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}

      {errorMessage && <div style={{ color: 'red', marginTop: '20px' }}> {errorMessage}</div>}
      {successMessage && <div style={{ color: 'green', marginTop: '20px'}}>{successMessage}</div>}
    </div>
  )
}

export default ContactManager
