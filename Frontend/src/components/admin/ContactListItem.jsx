import './styles/ContactListItem.css'

const ContactListItem = ({ contact, onDelete, onMarkRead }) => {
  const formattedDate = new Date(contact.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  const formattedTime = new Date(contact.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className={`contact-item ${contact.isRead ? '' : 'contact-item--unread'}`}>

      {/* Header row: name + actions */}
      <div className="contact-item-header">
        <div className="contact-item-name-row">
          <h4 className="contact-item-name">{contact.name}</h4>
          {!contact.isRead && (
            <span className="contact-item-badge">New</span>
          )}
        </div>

        <div className="contact-item-actions">
          {!contact.isRead && (
            <button
              type="button"
              className="contact-item-btn contact-item-btn--read"
              onClick={() => onMarkRead(contact._id)}
            >
              Mark as Read
            </button>
          )}
          <button
            type="button"
            className="contact-item-btn contact-item-btn--delete"
            onClick={() => onDelete(contact._id)}
            aria-label="Delete contact"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Contact details */}
      <div className="contact-item-details">
        <a href={`mailto:${contact.email}`} className="contact-item-detail">
          {contact.email}
        </a>
        {contact.phone && (
          <>
            <span className="contact-item-detail-divider">·</span>
            <a href={`tel:${contact.phone}`} className="contact-item-detail">
              {contact.phone}
            </a>
          </>
        )}
      </div>

      {/* Message */}
      <p className="contact-item-message">{contact.message}</p>

      {/* Date */}
      <p className="contact-item-date">
        Received: {formattedDate} at {formattedTime}
      </p>

    </div>
  )
}

export default ContactListItem
