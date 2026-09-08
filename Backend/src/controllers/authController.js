const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (request, response) => {
  try {
    const { username, password } = request.body

    if (!username || !password) {
      return response.status(400).json({ error: 'Username and password are required.'})
    }

    const user = await User.findOne({ username }).select('+passwordHash')

    if (!user) {
      return response.status(401).json({ error: "Invalid username or password."})
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)

    if (!isMatch) {
      return response.status(401).json({ error: "Invalid username or password."})
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

module.exports = { login }
