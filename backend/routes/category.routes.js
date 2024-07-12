const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')

router.get('/all', (req, res) => categoryController.listAllCategories(req, res))
router.post('/add', (req, res) => categoryController.addCategory(req, res))

module.exports = router