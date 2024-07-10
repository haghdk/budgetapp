const { Budget } = require('../models')

class BudgetService {
    async addBudget(amount, startDate, endDate) {
        const budget = await Budget.create({
            amount,
            startDate,
            endDate
        })
        return budget
    }

    async allBudgets() {
        const budgets = await Budget.findAll()
        if (budgets === null) {
            return null
        }
        return budgets
    }
}

module.exports = new BudgetService()