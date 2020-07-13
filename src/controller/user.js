const mongoose = require('mongoose')
const env = require('dotenv')

const userRepo = require('../model/user')
const validator = require('../services/validator')

class ControllerUser {
  constructor () {
    env.config()
  }

  async createUser (req, res) {
    const user = req.body

    const validEmail = validator.isValidEmail(user.email)
    if (validEmail.error) return res.status(400).send(validEmail)

    const dataExists = await userRepo.FindOneUser(user.email)

    if (!dataExists.data) {
      const dataUser = await userRepo.Create(user)

      if (dataUser) {
        return res.status(200).json({
          dataUser
        })
      } else {
        return res.status(500).json({
          success: false,
          message: 'Error to create user!'
        })
      }
    } else {
      return res.status(500).json({
        success: false,
        message: 'User already exists!'
      })
    }
  }

  async getWishlist (req, res) {
    email = req.params("email");

    let wishList  = await User.FindWishlist(email);
    
    if (wishList) {
      return res.status(200).json({
        wishList
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'Error ao search book!'
      })
    }
  }
}

module.exports = new ControllerUser()