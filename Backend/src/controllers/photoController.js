const Photo = require('../models/Photo')

const getAllPhotos = async (request,response) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 })
    response.json(photos)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const getPhotoById = async (request, response) => {
  try {
    const id = request.params.id

    const photo = await Photo.findById(id)

    if (!photo) {
      return response.status(404).json({ error: 'Photo not found.'})
    }

    response.json(photo)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

const createPhoto = async (request, response) => {
  try {
    const { title, category, imageUrl, description } = request.body

    if (!title || !category || !imageUrl) {
      return response.status(400).json({
        error: 'Title, category and imageUrl are required'
      })
    }

    const photo = await Photo.create({
      title,
      category,
      imageUrl,
      description: description || ''
    })

    response.status(201).json(photo)
  } catch(error) {
    response.status(400).json({ error: error.message })
  }
}

const updatePhoto = async (request, response) => {
  try {
    const { title, category, imageUrl, description } = request.body
    const photoId = request.params.id

    if (!title || !category || !imageUrl) {
      request.status(400).json({
        error: 'Title, category and imageUrl are required!'
      })
    }

    const photo = await Photo.findByIdAndUpdate(
      photoId,
      {
        title,
        category,
        imageUrl,
        description: description || ''
      },
      {
        new: true,
        runValidators: true
      }
    )

    if (!photo) {
      return response.status(404).json({ error: 'Photo not found.'})
    }

    response.json(photo)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
}


const deletePhoto = async (request, response) => {
  try {
    const photo = await Photo.findByIdAndDelete(request.params.id)

    if (!photo) {
      return response.status(404).json({ error: 'Photo not found.'})
    }

    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto
}
