const express = require('express')
const spendingController = require('../controllers/spending.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/add', authMiddleware.authenticateToken, (req, res) => spendingController.addSpending(req, res))
router.get('/list/:budgetId', authMiddleware.authenticateToken, (req, res) => spendingController.listSpendingsInBudget(req, res))
router.get('/spendingitem/:spendingId', authMiddleware.authenticateToken, (req, res) => spendingController.getSpendingById(req, res))
router.put('/edit', authMiddleware.authenticateToken, (req, res) => spendingController.editSpending(req, res))
router.delete('/delete/:spendingId', authMiddleware.authenticateToken, (req, res) => spendingController.deleteSpending(req, res))

module.exports = router