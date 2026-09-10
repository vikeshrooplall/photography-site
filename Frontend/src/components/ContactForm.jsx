import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
    if (error) setError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError(null)
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit request.')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err.message)
      console.error('Error submitting contact form:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    setIsSubmitted(false)
    setError(null)
  }

  return(
    <div>
        {isSubmitted ? (
          <div>
            <h2>Request submitted successfully!</h2>
            <p>Thank you for your inquiry, <strong>{formData.name}</strong>!</p>
            <p>We will revert back to you at <strong>{formData.email}</strong>.</p>
            {formData.phone && <p> We will also call you at: {formData.phone}</p>}
            <h4>Your Message:</h4>
            <p>{formData.message}</p>
            <button onClick={handleReset}>Send Another Request</button>
          </div>
        ) : (
        <form onSubmit={handleSubmit}>
          {error && <div style={{ color: 'red', marginBottom: '10px'}}>Error: {error}</div>}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name..."
              required
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (optional)"
              disabled={loading}
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your requirements..."
              rows="6"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Send Request'}
          </button>
        </form>

        )}
    </div>
  )
}

export default ContactForm
