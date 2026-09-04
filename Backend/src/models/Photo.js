const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['weddings', 'portraits', 'nature', 'commercials']
  },

  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxLenght: [500, 'Description cannot exceed 500 characters']
  },
}, {
    timestamps : true
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo
