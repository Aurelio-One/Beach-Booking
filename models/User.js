const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long.'],
    maxlength: [20, 'Username cannot exceed 20 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format.',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password must be at least 6 characters long.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
})

// Middleware to hash the password before saving a user
userSchema.pre('save', function (next) {
  const user = this

  // Check if the password has been modified (or is new)
  if (!user.isModified('password')) return next()

  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// Method to compare password during login
userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) reject(err)
      resolve(isMatch)
    })
  })
}
module.exports = mongoose.model('User', userSchema)
