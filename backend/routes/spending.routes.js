const express = require('express')
const spendingController = require('../controllers/spending.controller')
const router = express.Router()

router.post('/add', (req, res) => spendingController.addSpending(req, res))
router.get('/list/:budgetId', (req, res) => spendingController.listSpendingsInBudget(req, res))
router.get('/spendingitem/:spendingId', (req, res) => spendingController.getSpendingById(req, res))
router.put('/edit', (req, res) => spendingController.editSpending(req, res))

module.exports = router