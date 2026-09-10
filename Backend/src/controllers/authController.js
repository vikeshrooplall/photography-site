const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (request, response) => {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({ error: 'Email and password are required.'})
    }

    const user = await User.findOne({ email }).select('+passwordHash')

    if (!user) {
      return response.status(401).json({ error: "Invalid Email or password."})
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)

    if (!isMatch) {
      return response.status(401).json({ error: "Invalid Email or password."})
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '5h'}
    )

    return response.status(200).json({
      message: "Login successful",
      token: token,
      user: { id: user._id, username: user.username }
    })
  } catch (error) {
    console.error("Login Error", error)
    return response.status(500).json({ message: "Internal server error."})
  }
}

const verify = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Access denied: No token provided.'})
    }

    const token =  authHeader.split(' ')[1]

    const decodedUser = await jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    })

    return response.status(200).json(decodedUser)
  } catch (error) {
    return response.status(403).json({ error: 'Invalid or expired token.'})
  }
}

const logout = (request, response) => {
  return response.status(200).json({ message: 'Logged out successfully.'})
}

const changePassword = async (request, response) => {
  try {
    const { currentPassword, newPassword } = request.body
    const userId = request.user.id

    if (!currentPassword || !newPassword) {
      return response.status(400).json({ error: 'Current password and new password are required.'})
    }

    const user = await User.findById(userId).select('+passwordHash')

    if (!user) {
      return response.status(404).json({ error: 'User not found.'})
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash)

    if (!isMatch) {
      return response.status(401).json({ error: 'Current password is incorrect.'})
    }

    user.passwordHash = newPassword
    await user.save()

    return response.status(200).json({ message: 'Password updated successfully.'})
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error'})
  }
}

module.exports = { login, verify, logout, changePassword }
