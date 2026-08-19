const PhotoCard =({ photo }) => (
  <div>
    <img src={photo.imageUrl} alt={photo.title} />
    <h4>{photo.title}</h4>
    <p>{photo.category}</p>
  </div>
)

export default PhotoCard
