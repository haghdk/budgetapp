const SpendingService = require('../services/spending.service')
const StatusCode = require('../utils/util.statuscode')

class SpendingController {
    async addSpending(req, res) {
        const { description, amount, type, date, budgetId, categoryId } = req.body
        try {
            const spending = await SpendingService.addSpending(description, amount, type, date, budgetId, categoryId)
            res.json(spending)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })   
        }
    }

    async listSpendingsInBudget(req, res) {
        const { budgetId } = req.params
        try {
            const spendings = await SpendingService.listSpendingsInBudget(budgetId)
            res.json(spendings)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })
        }
    }

    async getSpendingById(req, res) {
        const { spendingId } = req.params
        try {
            const spendingItem = await SpendingService.getSpendingById(spendingId)
            res.json(spendingItem)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })
        }
    }

    async editSpending(req, res) {
        const { spendingId, description, amount, type, categoryId } = req.body
        try {
            const spending = await SpendingService.editSpending(description, amount, type, spendingId, categoryId)
            res.json(spending)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })
        }
    }
}

module.exports = new SpendingController()