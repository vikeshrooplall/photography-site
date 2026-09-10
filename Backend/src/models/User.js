const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [3, 'Username must be atleast 3 characters'],
    maxLength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
}, {
  timestamps: true
})

const hashPassword = async (user) => {
  if (!user.isModified('passwordHash')) return

  const salt = await bcrypt.genSalt(10)
  user.passwordHash = await bcrypt.hash(user.passwordHash, salt)
}

userSchema.pre('save', async function() {
  try {
    await hashPassword(this)
  } catch (error) {
    throw error
  }
})

userSchema.statics.comparePassword = async function(user, candidatePassword) {
  return await bcrypt.compare(candidatePassword, user.passwordHash)
}

const User = mongoose.model('User', userSchema)

module.exports = User
