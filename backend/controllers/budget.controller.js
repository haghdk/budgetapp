const NotFoundError = require('../errors/errors.notfound')
const BudgetService = require('../services/budget.service')

class BudgetController {
    async addBudget(req, res) {
        const { amount, startDate, endDate } = req.body
        try {
            const budget = await BudgetService.addBudget(amount, startDate, endDate)
            res.json(budget)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async getBudgetById(req, res) {
        const { budgetId } = req.params
        try {
            const budget = await BudgetService.getBudgetById(budgetId)
            res.json(budget)
        } catch (err) {
            if (err instanceof NotFoundError) {
                res.status(err.statusCode).json({ error: err.message })
            } else {
                res.status(500).json({ error: err.message })
            }
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