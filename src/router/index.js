const express = require('express')

const controller = require('../controller/login')
const controllerUser = require('../controller/user')

const router = express.Router()

// Create user api
router.post('/create', controllerUser.createUser)

router.post('/login', controller.login)

module.exports = router