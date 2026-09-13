const ContactListItem = ({ contact, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
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
          onClick={() => onDelete(contact._id)}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ContactListItem
