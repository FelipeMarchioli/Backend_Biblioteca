const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const bookRouter = require('./router/book')
const userRouter = require('./router/user')
const indexRouter = require('./router/index')
const UserRepo = require('./model/user')

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET)

    const user = await UserRepo.Find(payload.userId)
    if (!user) {
      return res.send(401)
    }

    req.auth = user

    next()
  } catch (error) {
    res.send(401, error)
  }
}
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
    this.express.use('/api/v1/book', authMiddleware, bookRouter)
    this.express.use('/api/v1/user', authMiddleware, userRouter)
  }
}

module.exports = new App().express