const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  headquarter: {
    type: String,
    required: true
  },
  wishlist: [{
    book_id: {
      type: mongoose.Types.ObjectId,
    },
    title: {
      type: String
    }
  }]
})

UserSchema.pre('save', async function hashPassword (next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
  compareHash (hash) {
    return bcrypt.compare(hash, this.password)
  },

  generateToken () {
    return jwt.sign({ id: this.id }, 'secret', {
      expiresIn: 86400
    })
  }
}

module.exports = mongoose.model('User', UserSchema)