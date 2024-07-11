const { Budget } = require('../models')
const { NotFoundError, BadRequestError } = require('../errors/errors')

class BudgetService {
    async addBudget(amount, startDate, endDate) {
        
        if (!isNaN(amount) && amount.toString().indexOf('.') != -1) {
            throw new BadRequestError('Amount must be a number in float format')
        }
        
        const budget = await Budget.create({
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
            throw new Error(`Budget with id ${budgetId} not found`)
        }

        if (!isNaN(amount) && amount.toString().indexOf('.') != -1) {
            throw new Error('Amount must be a number in float format')
        }

        if (amount < 0) {
            throw new Error('Amount must be a positive number')
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