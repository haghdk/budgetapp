const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')

router.get('/all', (req, res) => categoryController.listAllCategories(req, res))

module.exports = router