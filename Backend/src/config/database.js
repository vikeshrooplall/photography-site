require('dotenv').config()

const mongoose = require('mongoose')

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env file')
    process.exit(1)
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    console.log(`MongoDB connected: ${connection.connection.host}`)
    console.log(`Database: ${connection.connection.name}`)

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

    return connection

  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
