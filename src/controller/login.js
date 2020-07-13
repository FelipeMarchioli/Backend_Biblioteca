const jwt = require('jsonwebtoken')
const env = require('dotenv')
const bcrypt = require('bcrypt')

const userRepo = require('../model/user')
// const comparePassword = require('../services/compareHash')

class ControllerLogin {
  constructor () {
    env.config()
  }

  async login (req, res) {
    // Get the email and password of security way
    const [, hash] = req.headers.authorization.split(' ')
    const [reqEmail, reqPassword] = Buffer.from(hash, 'base64').toString().split(':')

    // For the given email fetch user from DB
    const user = await userRepo.FindOneUser(reqEmail)

    if (user.data) {
      if (reqEmail && reqPassword) {
        if (reqEmail === user.data.email) {
          // compare if the password pass by login is equal of a password in DB
          bcrypt.compare('' + reqPassword, user.data.password).then(isValid => {
            if (isValid) {
              const token = jwt.sign({ userId: user.data._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }) // expires in 24 hours
              // return the JWT token for the future API calls
              res.status(200).json({
                success: true,
                message: 'Authentication successful!',
                token: token
              })
            } else {
              res.status(403).json({
                success: false,
                message: 'Incorrect password'
              })
            }
          })
        } else {
          res.status(403).json({
            success: false,
            message: 'Incorrect email'
          })
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        })
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }
  }
}

module.exports = new ControllerLogin()