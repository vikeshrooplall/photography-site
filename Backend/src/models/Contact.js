const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: [2, 'Name must have at least 2 characters'],
    maxLength: [50, 'Name can have a maximum of 50 characters']
  },
  email: {
    type: String,
    required: [true, 'E-mail is required.'],
    trim: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address(e.g name@example.com)']
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxLength: [1000, 'Message cannot exceed more than 1000 characters.']
  }
}, {
  timestamps: true
})

contactSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

contactSchema.statics.getRecentContacts = async function(limit = 5) {
  return await this.find()
    .sort({ createdAt: -1 })
    .limit(limit)
}

contactSchema.index({ createdAt: -1 })
contactSchema.index({ email: 1 })

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
