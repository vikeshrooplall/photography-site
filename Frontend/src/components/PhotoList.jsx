import PhotoCard from './PhotoCard'
import './styles/PhotoList.css'

const HEIGHTS = [510, 450, 370, 660, 490, 620, 430, 510, 580, 420]

const PhotoList = ({ photos, onPhotoClick }) => {
  return (
    <div className="photo-list">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo._id}
          photo={photo}
          height={HEIGHTS[index % HEIGHTS.length]}
          onClick={onPhotoClick}
        />
      ))}
    </div>
  )
}

export default PhotoList
