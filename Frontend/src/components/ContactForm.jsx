import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
    setIsSubmitted(false)
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

          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name..."
              required
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
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (optional)"
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
            />
          </div>

          <button type="submit">Send Request</button>
        </form>

        )}
    </div>
  )
}

export default ContactForm
