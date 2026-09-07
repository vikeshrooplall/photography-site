const jwt = require('jsonwebtoken')

const protect = (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Authentication required. Token missing.'})
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    request.user = decoded
    next()
  } catch (error) {
    return response.status(403).json({ error: 'Invalid or expired token.'})
  }
}

    // code to be used if ever more user accounts are being added to the website, thus user.role will have to be described in models/user.js
    // and then uncomment the below code

// const authorize = (...allowedRoles) => {
//   return (request, response, next) => {
//     if (!request.user || !request.user.role) {
//       return response.status(401).json({ error: 'Unauthorized. User information misssing'})
//     }

//     const hasRole = allowedRoles.includes(request.user.role)

//     if (!hasRole) {
//       return response.status(403).json({ error: 'Forbidden. You do not have permission.'})
//     }

//     next()
//   }
// }

module.exports = protect
