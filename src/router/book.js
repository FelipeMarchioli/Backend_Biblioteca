const express = require('express')

const controller = require('../controller/book')

const router = express.Router()

// Create user api
router.post('/create', controller.createBook)

router.get('/:headquarter', controller.getBook)

router.put('/update', controller.updateBook)

// Delete logically
router.put('/delete', controller.updateBook)

module.exports = router