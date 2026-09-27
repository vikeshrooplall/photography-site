import './styles/PhotoForm.css'

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
    <form className="photo-form" onSubmit={onSubmit}>

      {/* File input */}
      <div className="photo-form-field">
        <label htmlFor="photo-file" className="photo-form-label">
          Image {!isEditing && <span className="photo-form-required">*</span>}
        </label>
        <input
          id="photo-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          required={!isEditing}
          disabled={formData._submitting}
          className="photo-form-input photo-form-input--file"
        />
        {isEditing && (
          <p className="photo-form-hint">
            Leave empty to keep the current image.
          </p>
        )}
        {preview && (
          <div className="photo-form-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
      </div>

      {/* Title */}
      <div className="photo-form-field">
        <label htmlFor="photo-title" className="photo-form-label">
          Title <span className="photo-form-required">*</span>
        </label>
        <input
          id="photo-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Photo title"
          required
          disabled={formData._submitting}
          className="photo-form-input"
        />
      </div>

      {/* Category */}
      <div className="photo-form-field">
        <label htmlFor="photo-category" className="photo-form-label">
          Category <span className="photo-form-required">*</span>
        </label>
        <select
          id="photo-category"
          name="category"
          value={formData.category}
          onChange={onInputChange}
          required
          disabled={formData._submitting}
          className="photo-form-input"
        >
          <option value="">Select a category</option>
          <option value="weddings">Weddings</option>
          <option value="portraits">Portraits</option>
          <option value="nature">Nature</option>
          <option value="commercials">Commercials</option>
        </select>
      </div>

      {/* Description */}
      <div className="photo-form-field">
        <label htmlFor="photo-description" className="photo-form-label">
          Description
        </label>
        <textarea
          id="photo-description"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Optional description"
          rows="3"
          disabled={formData._submitting}
          className="photo-form-input photo-form-textarea"
        />
      </div>

      {/* Actions */}
      <div className="photo-form-actions">
        <button
          type="button"
          className="photo-form-btn photo-form-btn--cancel"
          onClick={onCancel}
          disabled={formData._submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="photo-form-btn photo-form-btn--submit"
          disabled={formData._submitting}
        >
          {submitLabel}
        </button>
      </div>

    </form>
  )
}

export default PhotoForm
