const Contact = require('../models/Contact')

const submitContact = async (request, response) => {
  try {
    const { name, email, phone, message } = request.body

    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Name, email and message are required.'})
    }

    const contact = await Contact.create({
      name,
      email,
      message,
      phone: phone || ''
    })

    response.status(201).json(contact)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
}

const getAllContacts = async (request, response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1})
    response.status(200).json(contacts)

  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch contacts'})
  }
}

const getContactById = async (request, response) => {
  try {
    const id = request.params.id

    const contact = await Contact.findById(id)

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found'})
    }

    response.status(200).json(contact)
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'Invalid contact ID format'})
    }
    response.status(500).json({ error: 'Failed to fetch contact'})
  }
}

const deleteContact = async (request, response) => {
  try {
    const id = request.params.id
    const contact = await Contact.findByIdAndDelete(id)

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found.'})
    }

    response.status(204).end()
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'Invalid contact ID format'})
    }
    response.status(500).json({ error: error.message })
  }
}

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact
}
