const { Spending, Budget, Category } = require('../models')
const { typeConstants, formatValidTypesString } = require('../constants/types')
const { NotFoundError, BadRequestError } = require('../errors/errors');
const sequelize = require('../config/database');

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
    async addSpending(description, amount, type, date, budgetId, categoryId) {
        if (!Object.values(typeConstants).includes(type)) {
            const validTypesString = formatValidTypesString(Object.values(typeConstants));
            throw new BadRequestError(`Invalid type. Must be either ${validTypesString}`);
        }

        if (isNaN(amount) && amount.toString().indexOf('.') === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`)
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
            date,
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

        const spendings = await Spending.findAndCountAll({
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

        if (isNaN(amount) && amount.toString().indexOf('.') === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`)
        }

        if (!Object.values(typeConstants).includes(type)) {
            const validTypesString = formatValidTypesString(Object.values(typeConstants));
            throw new BadRequestError(`Invalid type. Must be either ${validTypesString}`);
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

    async totalSpending(budgetId) {
        const budget = await Budget.findByPk(budgetId)

        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }

        const totalSum = await Spending.findAll({
            where: {
                budgetId
            },
            attributes: [
                'budgetId',
                [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
            ],
            group: ['budgetId']            
        })

        return totalSum
    }
}

module.exports = new SpendingService()