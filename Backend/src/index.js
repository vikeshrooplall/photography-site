require('dotenv').config()
const express = require('express')
const Photo = require('./models/Photo')
const Contact = require('./models/Contact')
const User = require('./models/User')

const connectDB = require('./config/database')

const app = express()

connectDB()

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})



app.get('/api/photos', (request, response) => {
  Photo.find({}).then(photos => {
    response.json(photos)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
