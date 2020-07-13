const mongoose = require('mongoose')

class BaseRepo {
  async Create (body, Schema) {
    try {
      const mountedProd = new Schema(body)
      const data = await mountedProd.save()
      return { data }
    } catch (error) {
      return { error }
    }
  }

  async Find (id, Schema) {
    try {
      const objId = mongoose.Types.ObjectId(id)
      const data = await Schema.findOne({ _id: objId })
      return { data }
    } catch (error) {
      return { error }
    }
  }

  async FindAll (id, Schema) {
    try {
      const objId = mongoose.Types.ObjectId(id)
      const data = await Schema.find({ userID: objId })
      return { data }
    } catch (error) {
      return { error }
    }
  }

  async Update (body, Schema) {
    try {
      const mountedProd = new Schema(body)
      const data = await Schema.updateOne({ _id: body._id }, mountedProd)
      return { data }
    } catch (error) {
      return { error }
    }
  }

  async Delete (id, Schema) {
    try {
      const objId = mongoose.Types.ObjectId(id)
      const data = await Schema.deleteOne({ _id: objId })
      return { data }
    } catch (error) {
      return { error }
    }
  }
}

module.exports = BaseRepo