const { Budget } = require('../models')
const { NotFoundError, BadRequestError } = require('../errors/errors')

class BudgetService {
    async addBudget(title, amount, startDate, endDate) {
        if (isNaN(amount)) {
            throw new BadRequestError(`Amount must be a number in integer format. You send "${typeof amount}"`)
        }
        
        const budget = await Budget.create({
            title,
            amount,
            startDate,
            endDate
        })

        return budget
    }

    async getBudgetById(budgetId) {
        const budget = await Budget.findByPk(parseInt(budgetId))
        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }
        return budget;
    }

    async allBudgets() {
        const budgets = await Budget.findAll()
        if (budgets === null) {
            throw new Error('An error occured when trying to find budgets')
        }
        
        return budgets
    }

    async editBudget(budgetId, amount, startDate, endDate) {
        const budget = await Budget.findByPk(budgetId)
        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }

        if (isNaN(amount) && amount.toString().indexOf('.') === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`)
        }

        if (amount < 0) {
            throw new BadRequestError('Amount must be a positive number')
        }

        const updatedBudget = budget.update({
            amount,
            startDate,
            endDate
        }, 
        {
            where: { id: budgetId }
        })

        return updatedBudget
    }
}

module.exports = new BudgetService()