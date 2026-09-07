require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./src/models/User')
const Photo = require('./src/models/Photo')
const connectDB = require('./src/config/database')

// Sample photos data
const samplePhotos = [
  {
    title: 'Mountain Sunset',
    category: 'nature',
    imageUrl: 'https://picsum.photos/id/10/400/300',
    description: 'Beautiful sunset over the mountains'
  },
  {
    title: 'Wedding Kiss',
    category: 'weddings',
    imageUrl: 'https://picsum.photos/id/26/400/300',
    description: 'A romantic moment captured'
  },
  {
    title: 'Portrait in Black & White',
    category: 'portraits',
    imageUrl: 'https://picsum.photos/id/91/400/300',
    description: 'Stunning portrait photography'
  },
  {
    title: 'Forest Path',
    category: 'nature',
    imageUrl: 'https://picsum.photos/id/15/400/300',
    description: 'A peaceful walk through the woods'
  },
  {
    title: 'Beach Wedding',
    category: 'weddings',
    imageUrl: 'https://picsum.photos/id/25/400/300',
    description: 'A couple saying their vows by the sea'
  },
  {
    title: 'Elegant Portrait',
    category: 'portraits',
    imageUrl: 'https://picsum.photos/id/64/400/300',
    description: 'An elegant portrait session'
  },
  {
    title: 'Corporate Headshot Session',
    category: 'commercials',
    imageUrl: 'https://picsum.photos/id/1/400/300',
    description: 'Professional headshots for corporate clients'
  },
  {
    title: 'Product Photography - Watches',
    category: 'commercials',
    imageUrl: 'https://picsum.photos/id/21/400/300',
    description: 'High-end product photography for luxury watches'
  },
  {
    title: 'Office Environment Shoot',
    category: 'commercials',
    imageUrl: 'https://picsum.photos/id/24/400/300',
    description: 'Modern office spaces for company branding'
  }
]

// Admin user data
const adminUser = {
  username: 'admin',
  passwordHash: 'admin123'  // Will be hashed by pre-save hook
}

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB()
    console.log('Connected to MongoDB')

    const existingAdmin = await User.findOne({ username: adminUser.username })

    if (!existingAdmin) {
      const user = new User(adminUser)
      await user.save()
      console.log('Admin user created successfully')
      console.log(`Username: ${adminUser.username}`)
      console.log(`Password: ${adminUser.passwordHash}`)
    } else {
      console.log('Admin user already exists')
    }

    const photoCount = await Photo.countDocuments()

    if (photoCount === 0) {
      await Photo.insertMany(samplePhotos)
      console.log(`Sample photos inserted: ${samplePhotos.length} photos`)
    } else {
      console.log(`Sample photos already exist (${photoCount} photos found)`)
    }

    console.log('Database seeding completed successfully!')
    process.exit(0)

  } catch (error) {
    console.error('Seeding failed:', error.message)
    process.exit(1)
  }
}

seedDatabase()
