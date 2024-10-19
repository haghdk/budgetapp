const { Budget } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors/errors");

/**
 * Service class for managing budget-related operations.
 *
 * The `BudgetService` class provides methods for creating, retrieving, updating,
 * and managing budgets in the system.
 */
class BudgetService {
    async addBudget(title, amount, startDate, endDate) {
        if (isNaN(amount) && amount.toString().indexOf(".") === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`);
        }

        if (amount < 0) {
            throw new BadRequestError("Amount must be a zero or a positive number");
        }

        if (title === null || title === "") {
            throw new BadRequestError("Title cannot be empty");
        }

        if (startDate === null || endDate === null) {
            throw new BadRequestError("Invalid date");
        }

        const budget = await Budget.create({
            title,
            amount,
            startDate,
            endDate,
        });

        return budget;
    }

    async getBudgetById(budgetId) {
        const budget = await Budget.findByPk(budgetId);
        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`);
        }
        return budget;
    }

    async allBudgets() {
        const budgets = await Budget.findAll();
        if (budgets === null) {
            throw new Error("An error occured when trying to find budgets");
        }
        return budgets;
    }

    async editBudget(budgetId, title, amount, startDate, endDate) {
        const budget = await Budget.findByPk(budgetId);
        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`);
        }

        if (isNaN(amount) && amount.toString().indexOf(".") === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`);
        }

        if (amount < 0) {
            throw new BadRequestError("Amount must be a zero or a positive number");
        }

        if (title === null || title === "") {
            throw new BadRequestError("Title cannot be empty");
        }

        const updatedBudget = budget.update(
            {
                amount,
                title,
                startDate,
                endDate,
            },
            {
                where: {
                    id: budgetId,
                },
            }
        );

        return updatedBudget;
    }
}

module.exports = new BudgetService();
