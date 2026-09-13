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

  return (
    <div>
      <h3>Contact Requests</h3>
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
