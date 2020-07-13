const express = require('express')

const controller = require('../controller/user')

const router = express.Router()

// Get wishlist by user
router.get('/wishlist/:email', controller.getWishlist)

module.exports = router