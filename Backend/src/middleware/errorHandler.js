const errorHandler = (error, request, response, next) => {
  console.error('Error:', error.message)
  console.error('Stack:', error.stack)

  // CastError: invalid ObjectId
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted id.'})
  }

  // ValidationError: Mongoose Schema Validation
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  // jsonwebtokenError: Invalid JWT token
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token.'})
  }

  // TokenExpiredError
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token Expired. Please login again'})
  }

  // Duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]
    return response.status(409).json({ error: `Duplicate field: ${field}. Please use a different value`})
  }

  // Unknown error
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : error.message

    return response.status(500).json({ error: message })
}

module.exports = errorHandler
