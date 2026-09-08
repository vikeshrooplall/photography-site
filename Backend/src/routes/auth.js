const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const protect = require('../middleware/auth')

router.post('/login', authController.login)
router.get('/verify', protect, authController.verify)
router.post('/logout', protect, authController.logout)
router.put('/change-password', protect, authController.changePassword)

module.exports = router
