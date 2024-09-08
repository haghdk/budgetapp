const { Budget } = require('../models')
const { NotFoundError, BadRequestError } = require('../errors/errors')

/**
 * Service class for managing budget-related operations.
 * 
 * The `BudgetService` class provides methods for creating, retrieving, updating, 
 * and managing budgets in the system.
 */
class BudgetService {

    /**
     * Creates a new budget with the specified title, amount, start date, and end date.
     * 
     * @async
     * @param {string} title - The title of the new budget.
     * @param {number} amount - The amount for the budget, must be a valid integer.
     * @param {Date} startDate - The start date of the budget.
     * @param {Date} endDate - The end date of the budget.
     * @throws {BadRequestError} If the amount is not a valid integer.
     * @returns {Promise<Object>} A promise that resolves to the newly created budget object.
     */
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

    /**
     * Retrieves a budget by its ID.
     * 
     * @async
     * @param {number} budgetId - The ID of the budget to retrieve. It will be parsed to an integer.
     * @throws {NotFoundError} If the budget with the specified ID is not found.
     * @returns {Promise<Object>} A promise that resolves to the budget object if found.
     */
    async getBudgetById(budgetId) {
        const budget = await Budget.findByPk(parseInt(budgetId))
        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }
        return budget;
    }

    /**
     * Retrieves all budgets from the database.
     * 
     * @async
     * @throws {Error} If an error occurs while fetching the budgets.
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of budget objects.
     */
    async allBudgets() {
        const budgets = await Budget.findAll()
        if (budgets === null) {
            throw new Error('An error occured when trying to find budgets')
        }
        return budgets
    }

    /**
     * Updates an existing budget with the provided amount, start date, and end date.
     * 
     * @async
     * @param {number} budgetId - The ID of the budget to be updated.
     * @param {number} amount - The new amount for the budget. Must be a positive float.
     * @param {Date} startDate - The new start date for the budget.
     * @param {Date} endDate - The new end date for the budget.
     * @throws {NotFoundError} If the budget with the specified ID is not found.
     * @throws {BadRequestError} If the amount is not a valid float or if it is a negative number.
     * @returns {Promise<Object>} The updated budget object.
     */
    async editBudget(budgetId, amount, startDate, endDate) {
        const budget = await Budget.findByPk(budgetId)
        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`)
        }

        if (isNaN(amount) && amount.toString().indexOf('.') === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`)
        }

        if (amount < 0) {
            throw new BadRequestError('Amount must be a zero or a positive number')
        }

        const updatedBudget = budget.update({
            amount,
            startDate,
            endDate
        }, {
            where: {
                id: budgetId
            }
        })

        return updatedBudget
    }
}

module.exports = new BudgetService()