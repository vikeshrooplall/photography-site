const PhotoForm = ({
  formData,
  onInputChange,
  onFileChange,
  onSubmit,
  onCancel,
  preview,
  isEditing,
  submitLabel
}) => {
  return (
    <form onSubmit={onSubmit}>
      {isEditing && <h3>Edit Photo</h3>}

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          required={!isEditing}
        />
        {isEditing && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            Leave empty to keep current image.
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Photo Title"
          required
        />
      </div>

      <div>
        <select
          name="category"
          value={formData.category}
          onChange={onInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="weddings">Weddings</option>
          <option value="portraits">Portraits</option>
          <option value="nature">Nature</option>
          <option value="commercials">Commercials</option>
        </select>
      </div>

      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Photo Description"
        />
        {preview && <img src={preview} alt="Preview" style={{ width: '100px' }} />}
      </div>

      <button type="submit">{submitLabel}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>Cancel</button>
      )}
    </form>
  )
}

export default PhotoForm
