const express = require('express')
const router = express.Router()
const photoController = require('../controllers/photoController')
const protect = require('../middleware/auth')
const upload = require('../middleware/upload')

router.get('/', photoController.getAllPhotos)
router.get('/:id', photoController.getPhotoById)

router.post('/', protect, photoController.createPhoto)
router.post('/upload', protect, upload.single('image'), photoController.uploadPhoto)
router.put('/:id', protect, photoController.updatePhoto)
router.delete('/:id', protect, photoController.deletePhoto)

module.exports = router
