const { Spending, Budget, Category } = require('../models')
const SpendingTypes = require('../constants/types')
const { NotFoundError, BadRequestError } = require('../errors/errors');
const { Op } = require('sequelize')

/**
 * Service class for managing spending-related operations.
 * 
 * The `SpendingService` class provides methods to create, retrieve, update, and manage spendings
 * in the system. It interacts with the underlying database models to perform CRUD operations for
 * spendings, including filtering and validating input.
 */
class SpendingService {
    /**
     * Adds a new spending entry associated with a specific budget and category.
     * 
     * @async
     * @param {string} description - A brief description of the spending.
     * @param {number} amount - The amount of the spending in float format.
     * @param {string} type - The type of spending. Must be a valid type defined in `SpendingTypes`.
     * @param {Date} date - The date when the spending occurred.
     * @param {number} budgetId - The ID of the associated budget.
     * @param {number} categoryId - The ID of the associated category.
     * @throws {BadRequestError} If the type is invalid or the amount is not a valid float.
     * @throws {NotFoundError} If the specified budget or category is not found.
     * @returns {Promise<Object>} A promise that resolves to the newly created spending object.
     */
    async addSpending(description, amount, type, date, budgetId, categoryId) {
        if (!Object.values(SpendingTypes.types).includes(type)) {
            const validTypesString = SpendingTypes.formatValidTypesString();
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
     * Retrieves a list of spendings for a specified budget, with optional filtering by description and date range.
     * 
     * @async
     * @param {number} budgetId - The ID of the budget for which to retrieve spendings.
     * @param {string} [description] - Optional description to filter spendings by (case-insensitive, partial match).
     * @param {Date} [startDate] - Optional start date to filter spendings by.
     * @param {Date} [endDate] - Optional end date to filter spendings by.
     * @throws {NotFoundError} If the budget with the specified ID is not found.
     * @returns {Promise<Object>} A promise that resolves to an object containing the spendings:
     * - `count` {number}: The total count of spendings.
     * - `rows` {Array<Object>}: An array of the spending records.
     * - `totalAmount` {number}: The sum of the amounts of the spendings.
     */
    async listSpendingsInBudget(budgetId, description, startDate, endDate) {
        const budget = await Budget.findByPk(budgetId)

        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }

        const whereClause = {
            budgetId
        }

        if (description) {
            whereClause.description = {
                [Op.iLike]: `%${description}%`
            }
        }

        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [startDate, endDate]
            }
        } else if (startDate) {
            whereClause.date = {
                [Op.gte]: startDate
            }
        } else if (endDate) {
            whereClause.date = {
                [Op.lte]: endDate
            }
        }

        const spendings = await Spending.findAndCountAll({
            where: whereClause
        })

        const totalAmount = await Spending.sum('amount', {
            where: whereClause
        })

        return {
            count: spendings.count,
            rows: spendings.rows,
            totalAmount: totalAmount || 0
        };
    }

    /**
     * Retrieves a spending record by its ID.
     * 
     * @async
     * @param {number} spendingId - The ID of the spending to retrieve.
     * @throws {NotFoundError} If the spending with the specified ID is not found.
     * @returns {Promise<Object>} A promise that resolves to the spending object if found.
     */
    async getSpendingById(spendingId) {
        const spending = await Spending.findByPk(spendingId)
        if (!spending) {
            throw new NotFoundError(`Spending with id ${spendingId} not found`)
        }
        return spending
    }

    /**
     * Updates an existing spending record with the provided description, amount, type, and category ID.
     * 
     * @async
     * @param {string} description - The updated description of the spending.
     * @param {number} amount - The updated amount for the spending, in float format.
     * @param {string} type - The updated type of spending. Must be a valid type defined in `SpendingTypes`.
     * @param {number} spendingId - The ID of the spending record to update.
     * @param {number} categoryId - The ID of the updated category associated with the spending.
     * @throws {NotFoundError} If the spending with the specified ID is not found.
     * @throws {BadRequestError} If the amount is not a valid float or the type is invalid.
     * @returns {Promise<Object>} A promise that resolves to the updated spending object.
     */
    async editSpending(description, amount, type, spendingId, categoryId) {
        const spending = await Spending.findByPk(spendingId)
        if (!spending) {
            throw new NotFoundError(`Spending with id ${spendingId} not found`)
        }

        if (isNaN(amount) && amount.toString().indexOf('.') === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`)
        }

        if (!Object.values(SpendingTypes.types).includes(type)) {
            const validTypesString = SpendingTypes.formatValidTypesString();
            throw new BadRequestError(`Invalid type. Must be either ${validTypesString}`);
        }

        const updatedSpending = await spending.update({
            description,
            amount,
            type,
            categoryId
        }, {
            where: {
                id: spendingId
            }
        })

        return updatedSpending
    }
}

module.exports = new SpendingService()