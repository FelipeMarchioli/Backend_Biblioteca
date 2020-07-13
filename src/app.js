const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

class App {
  constructor () {
    this.express = express()
    env.config()
    this.dbConnect()
    this.middleware()
    this.routes()
  }

  // connection with db
  async dbConnect () {
    try {
      await mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('DB connected')
    } catch (err) {
      console.log('DB failed to connect', err)
    }
  }

  middleware () {
    this.express.use(bodyParser.urlencoded({
      extended: true
    }))
    this.express.use(bodyParser.json())
    this.express.use(cors())
  }

  routes () {
    this.express.use(indexRouter)
  }
}

module.exports = new App().express