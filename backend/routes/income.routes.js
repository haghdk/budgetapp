const express = require('express')
const router = express.Router()
const incomeController = require('../controllers/income.controller')

router.post('/', (req, res) => incomeController.addIncome(req, res))
router.get('/:budgetId', (req, res) => incomeController.listIncomeInBudget(req, res))