const express = require('express')
const spendingController = require('../controllers/spending.controller')
const router = express.Router()

router.post('/', (req, res) => spendingController.addSpending(req, res))

module.exports = router