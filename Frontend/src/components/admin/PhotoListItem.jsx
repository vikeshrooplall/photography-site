const PhotoListItem = ({ photo, onEdit, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
      <img src={photo.imageUrl} alt={photo.title} style={{ width: '100px' }} />
      <h3>{photo.title}</h3>
      <p><strong>Category:</strong> {photo.category}</p>
      <p>{photo.description}</p>
      <button onClick={() => onEdit(photo)}>Edit</button>
      <button onClick={() => onDelete(photo._id)}>Delete</button>
    </div>
  )
}

export default PhotoListItem
