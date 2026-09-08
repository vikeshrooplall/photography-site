require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan= require('morgan')

const connectDB = require('./config/database')
const photoRoutes = require('./routes/photos')
const authRoutes = require('./routes/auth')
const contactRoutes = require('./routes/contacts')
const errorHandler = require ('./middleware/errorHandler')

const app = express()

connectDB()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/photos', photoRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)

app.use((request, response) => {
  response.status(404).json({ error: 'Route not found'})
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
