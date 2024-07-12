const SpendingService = require('../services/spending.service')
const { NotFoundError, BadRequestError } = require('../errors/errors')

class SpendingController {
    async addSpending(req, res) {
        const { description, amount, type, budgetId, categoryId } = req.body
        try {
            const spending = await SpendingService.addSpending(description, amount, type, budgetId, categoryId)
            res.json(spending)
        } catch (error) {
            const statusCode = error.statusCode != null ? error.statusCode : 500
            res.status(statusCode).json({ error: error.message })   
        }
    }

    async listSpendingsInBudget(req, res) {
        const { budgetId } = req.params
        try {
            const spendings = await SpendingService.listSpendingsInBudget(budgetId)
            res.json(spendings)
        } catch (error) {
            const statusCode = error.statusCode != null ? error.statusCode : 500
            res.status(statusCode).json({ error: error.message })   
        }
    }

    async getSpendingById(req, res) {
        const { spendingId } = req.params
        try {
            const spendingItem = await SpendingService.getSpendingById(spendingId)
            res.json(spendingItem)
        } catch (error) {
            const statusCode = error.statusCode != null ? error.statusCode : 500
            res.status(statusCode).json({ error: error.message })  
        }
    }

    async editSpending(req, res) {
        const { spendingId, description, amount, type, categoryId } = req.body
        try {
            const spending = await SpendingService.editSpending(description, amount, type, spendingId, categoryId)
            res.json(spending)
        } catch (error) {
            const statusCode = error.statusCode != null ? error.statusCode : 500
            res.status(statusCode).json({ error: error.message })  
        }
    }
}

module.exports = new SpendingController()