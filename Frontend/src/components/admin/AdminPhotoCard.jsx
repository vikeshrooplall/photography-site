import './AdminPhotoCard.css'

const AdminPhotoCard = ({ photo, height, onView }) => {
  return (
    <div
      className="admin-photo-card"
      style={{ height: `${height}px` }}
      onClick={() => onView(photo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onView(photo)
        }
      }}
    >
      <img
        src={photo.imageUrl}
        alt={photo.title}
        loading="lazy"
        className="admin-photo-img"
      />
    </div>
  )
}

export default AdminPhotoCard
