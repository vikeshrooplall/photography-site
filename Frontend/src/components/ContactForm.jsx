import { useState } from 'react'
import './styles/ContactForm.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submittedData, setSubmittedData] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit request.')
      }

      setSubmittedData({ ...formData })
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' })
    setSubmittedData(null)
    setIsSubmitted(false)
    setErrorMessage('')
  }

  return (
    <div className="contact-form-card">

      {isSubmitted ? (
        <div className="contact-form-success">
          <h3 className="contact-form-success-title">Inquiry Sent</h3>
          <p className="contact-form-success-text">
            Thank you, {submittedData?.name} - we'll be in touch soon.
          </p>

          {submittedData?.message && (
            <div className="contact-form-success-message">
              <p className="contact-form-success-message-label">Your Message:</p>
              <blockquote className="contact-form-success-message-quote">
                "{submittedData.message}"
              </blockquote>
            </div>
          )}

          <button
            type="button"
            className="contact-form-reset"
            onClick={handleReset}
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>

          {errorMessage && (
            <div className="contact-form-error">{errorMessage}</div>
          )}

          <div className="contact-form-field">
            <label htmlFor="contact-name" className="contact-form-label">
              Name <span className="contact-form-required">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              disabled={isLoading}
              className="contact-form-input"
            />
          </div>

          <div className="contact-form-field">
            <label htmlFor="contact-email" className="contact-form-label">
              Email <span className="contact-form-required">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              disabled={isLoading}
              className="contact-form-input"
            />
          </div>

          <div className="contact-form-field">
            <div className="contact-form-label-row">
              <label htmlFor="contact-phone" className="contact-form-label">
                Phone
              </label>
              <span className="contact-form-optional">Optional</span>
            </div>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+230 5 000-0000"
              disabled={isLoading}
              className="contact-form-input"
            />
          </div>

          <div className="contact-form-field">
            <label htmlFor="contact-message" className="contact-form-label">
              Message <span className="contact-form-required">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your date, location, or creative ideas..."
              rows="6"
              required
              disabled={isLoading}
              className="contact-form-input contact-form-textarea"
            />
          </div>

          <div className="contact-form-submit-wrapper">
            <button
              type="submit"
              className="contact-form-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Inquiry</span>
                  <span className="contact-form-submit-arrow">→</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  )
}

export default ContactForm
