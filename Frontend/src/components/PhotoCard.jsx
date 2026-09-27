import './styles/PhotoCard.css'

const PhotoCard = ({ photo, height, onClick }) => {
  return (
    <div
      className="photo-card"
      style={{ height: `${height}px` }}
      onClick={() => onClick(photo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(photo)
        }
      }}
    >
      <img
        src={photo.imageUrl}
        alt={photo.title}
        loading="lazy"
      />
    </div>
  )
}

export default PhotoCard
