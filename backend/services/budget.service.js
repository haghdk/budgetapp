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
}

module.exports = new BudgetService()