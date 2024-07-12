const { Spending, Budget, Category } = require('../models')
const { typeConstants } = require('../constants/types')
const { NotFoundError, BadRequestError } = require('../errors/errors')

class SpendingService {
    /**
     * Adds a spending to a budget
     * @param {*} description 
     * @param {*} amount 
     * @param {*} type 
     * @param {*} budgetId 
     * @param {*} categoryId 
     * @returns {Promise<Spending>}
     */
    async addSpending(description, amount, type, budgetId, categoryId) {
        if (!Object.values(typeConstants).includes(type)) {
            throw new Error('Invalid type. Must be either "necessary" or "luxury"')
        }
        
        const budget = await Budget.findByPk(budgetId)
        const category = await Category.findByPk(categoryId)

        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }

        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`)
        }
        
        const spending = Spending.create({
            description,
            amount,
            type,
            budgetId,
            categoryId
        })
        
        return spending
    }

    /**
     * Returns all spendings in a budget'
     * @param {number} budgetId
     **/
    async listSpendingsInBudget(budgetId) {
        const budget = await Budget.findByPk(budgetId)

        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }

        const spendings = await Spending.findAll({
            where: { budgetId }
        })

        return spendings;
    }
    
    /**
     * Returns a spending by id
     * @param {number} spendingId
     **/
    async getSpendingById(spendingId) {
        const spending = await Spending.findByPk(spendingId)
        if (!spending) {
            throw new NotFoundError(`Spending with id ${spendingId} not found`)
        }
        return spending
    }

    /**
     * Edits a single spending item
     * @param {*} description Description of the spending
     * @param {*} amount Amount of the spending
     * @param {*} type Type of the spending
     * @param {*} spendingId Id of the spending
     * @returns 
     */
    async editSpending(description, amount, type, spendingId, categoryId) {
        const spending = await Spending.findByPk(spendingId)
        if (!spending) {
            throw new NotFoundError(`Spending with id ${spendingId} not found`)
        }

        if (!Object.values(typeConstants).includes(type)) {
            throw new BadRequestError('Invalid type. Must be either "necessary" or "luxury"')
        }

        const updatedSpending = await spending.update({
            description,
            amount,
            type,
            categoryId
        }, 
        {
            where: { id: spendingId}
        })

        return updatedSpending
    }
}

module.exports = new SpendingService()