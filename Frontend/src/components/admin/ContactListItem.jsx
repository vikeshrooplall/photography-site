const ContactListItem = ({ contact, onDelete, onMarkRead }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '4px',
        backgroundColor: contact.isRead ? 'white' : '#f0f7ff'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h4 style={{ margin: '0 0 10px 0' }}>
            {contact.name}
            {!contact.isRead && (
              <span
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontWeight: 'normal'
                }}
              >
                NEW
              </span>
            )}
          </h4>
          <p><strong>Email:</strong> {contact.email}</p>
          {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
          <p><strong>Message:</strong> {contact.message}</p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            <strong>Received:</strong> {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {!contact.isRead && (
            <button
              onClick={() => onMarkRead(contact._id)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Mark as Read
            </button>
          )}
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
    </div>
  )
}

export default ContactListItem
