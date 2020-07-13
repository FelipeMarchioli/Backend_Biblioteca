const baseRepo = require('./base')
const Book = require('../model/book')

class UserRepository extends baseRepo {
    async FindBook (headquarter) {
        try {
          const data = await Book.find({ headquarter: headquarter, deleted: false })
          return { data }
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