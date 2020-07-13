const baseRepo = require('./base')
const User = require('../model/user')

class UserRepository extends baseRepo {
  async FindOneUser (email) {
    try {
      const data = await User.findOne({ email: email })
      return { data }
    } catch (error) {
      return { error }
    }
  }

  async FindWishlist (email) {
    try {
      const { wishlist } = await User.findOne({ email: email })
      return { wishlist }
    } catch (error) {
      return { error }
    }
  }

  async Find (id) {
    return super.Find(id, User)
  }

  async Create (data) {
    return super.Create(data, User)
  }

  async Update (data) {
    return super.Update(data, User)
  }
}

module.exports = new UserRepository()