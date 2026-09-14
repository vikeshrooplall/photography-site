const express = require('express')
const router = express.Router()
const ContactController = require('../controllers/contactController')
const protect = require('../middleware/auth')

router.post('/', ContactController.submitContact)
router.get('/', protect, ContactController.getAllContacts)
router.get('/:id', protect, ContactController.getContactById)
router.patch('/:id/read', protect, ContactController.markContactAsRead )
router.delete('/:id', protect, ContactController.deleteContact)

module.exports = router
