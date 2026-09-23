import { useData } from '../../context/DataContext'
import ContactListItem from './ContactListItem'
import './ContactManager.css'

const ContactManager = () => {
  const {
    contacts, setContacts,
    loadingContacts,
    errorMessage, setErrorMessage,
    successMessage, setSuccessMessage
  } = useData()

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact request?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete contact.')
      }

      const updatedContacts = contacts.filter(contact => contact._id !== id)
      setContacts(updatedContacts)
      setSuccessMessage('Contact deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to delete contact.')
      console.error('Error deleting contact:', error)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3001/api/contacts/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to mark contact as read.')
      }

      const updatedContact = await response.json()

      const updatedContacts = contacts.map(contact =>
        contact._id === id ? updatedContact : contact
      )
      setContacts(updatedContacts)
      setSuccessMessage('Contact marked as read!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to mark contact as read.')
      console.error('Error marking contact as read:', error)
    }
  }

  const unreadCount = contacts.filter(contact => !contact.isRead).length

  return (
    <div className="contact-manager">

      {/* Header */}
      <div className="contact-manager-header">
        <div className="contact-manager-title-row">
          <h2 className="contact-manager-title">Contact Requests</h2>
          {unreadCount > 0 && (
            <span className="contact-manager-count">
              {unreadCount} unread
            </span>
          )}
        </div>
        <p className="contact-manager-subtitle">
          Inquiries and booking requests from clients.
        </p>
      </div>

      {/* Loading */}
      {loadingContacts ? (
        <div className="contact-manager-state">
          <p>Loading contact requests...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="contact-manager-state">
          <p>No contact requests yet.</p>
        </div>
      ) : (
        <div className="contact-manager-list">
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

    </div>
  )
}

export default ContactManager
