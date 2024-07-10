const { Spending, Budget, Category } = require('../models')

class SpendingService {
    async addSpending(description, amount, type, budgetId, categoryId) {
        const budget = await Budget.findByPk(budgetId)
        const category = await Category.findByPk(categoryId)

        if (!budget) {
            throw new Error(`Budget with id ${budgetId} not found`)
        }

        if (!category) {
            throw new Error(`Category with id ${categoryId} not found`)
        }
        
        const spending = Spending.create({
            description,
            amount,
            type,
            budgetId,
            categoryService
        })
        
        return spending
    }
}

module.exports = new SpendingService()