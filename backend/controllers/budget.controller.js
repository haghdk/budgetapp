const BudgetService = require('../services/budget.service')
const { NotFoundError, BadRequestError } = require('../errors/errors')


class BudgetController {
    async addBudget(req, res) {
        const { title, amount, startDate, endDate } = req.body
        try {
            const budget = await BudgetService.addBudget(title, amount, startDate, endDate)
            res.json(budget)
        } catch (err) {
            const statusCode = err.statusCode != null ? err.statusCode : 500
            res.status(statusCode).json({ error: err.message })         
        }
    }

    async getBudgetById(req, res) {
        const { budgetId } = req.params
        try {
            const budget = await BudgetService.getBudgetById(budgetId)
            res.json(budget)
        } catch (err) {
            const statusCode = err.statusCode != null ? err.statusCode : 500
            res.status(statusCode).json({ error: err.message })
        }
    }

    async listAllBudgets(req, res) {
        try {
            const budgets = await BudgetService.allBudgets()
            res.json(budgets)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = new BudgetController()