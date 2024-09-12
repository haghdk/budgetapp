const { Income, Budget } = require('../models')
const { NotFoundError } = require('../errors/errors')

class IncomeService {

    async addIncome(description, amount, source, date, budgetId) {
        const budget = await Income.findByPk(budgetId)

        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }

        const income = await Income.create({
            description,
            amount,
            source,
            date,
            budgetId
        })
        return income
    }

    async listIncomeInBudget(budgetId) {
        const budget = await Budget.findByPk(budgetId)
        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`);
        }

        const incomeItems = await Income.findAndCountAll({
            where: { budgetId }
        })

        const totalIncome = await Income.sum('amount', {
            where: { budgetId }
        })

        return {
            count: incomeItems.count,
            rows: incomeItems.rows,
            totalIncome: totalIncome || 0
        }
    }
}

module.exports = new IncomeService()