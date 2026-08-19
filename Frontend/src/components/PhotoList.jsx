import PhotoCard from './PhotoCard'

const PhotoList = ({ photos }) => (
  photos.map(photo => (
    <div key={photo.id}>
      <PhotoCard photo={photo} />
    </div>
  ))
)

export default PhotoList
