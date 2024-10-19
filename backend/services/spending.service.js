const { Spending, Budget, Category } = require("../models");
const SpendingTypes = require("../constants/types");
const { NotFoundError, BadRequestError } = require("../errors/errors");
const { Op } = require("sequelize");

/**
 * Service class for managing spending-related operations.
 *
 * The `SpendingService` class provides methods to create, retrieve, update, and manage spendings
 * in the system. It interacts with the underlying database models to perform CRUD operations for
 * spendings, including filtering and validating input.
 */
class SpendingService {
    async addSpending(description, amount, type, date, budgetId, categoryId) {
        if (!Object.values(SpendingTypes.types).includes(type)) {
            const validTypesString = SpendingTypes.formatValidTypesString();
            throw new BadRequestError(`Invalid type. Must be either ${validTypesString}`);
        }

        if (isNaN(amount) && amount.toString().indexOf(".") === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`);
        }

        const budget = await Budget.findByPk(budgetId);
        const category = await Category.findByPk(categoryId);

        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`);
        }

        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const spending = Spending.create({
            description,
            amount,
            type,
            date,
            budgetId,
            categoryId,
        });

        return spending;
    }

    async listSpendingsInBudget(budgetId, description, startDate, endDate) {
        const budget = await Budget.findByPk(budgetId);

        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`);
        }

        const whereClause = {
            budgetId,
        };

        if (description) {
            whereClause.description = {
                [Op.iLike]: `%${description}%`,
            };
        }

        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [startDate, endDate],
            };
        } else if (startDate) {
            whereClause.date = {
                [Op.gte]: startDate,
            };
        } else if (endDate) {
            whereClause.date = {
                [Op.lte]: endDate,
            };
        }

        const spendings = await Spending.findAndCountAll({
            where: whereClause,
        });

        const totalAmount = await Spending.sum("amount", {
            where: whereClause,
        });

        return {
            count: spendings.count,
            rows: spendings.rows,
            totalAmount: totalAmount || 0,
        };
    }

    async getSpendingById(spendingId) {
        const spending = await Spending.findByPk(spendingId);
        if (!spending) {
            throw new NotFoundError(`Spending with id ${spendingId} not found`);
        }
        return spending;
    }

    async editSpending(description, amount, type, spendingId, categoryId) {
        const spending = await Spending.findByPk(spendingId);
        if (!spending) {
            throw new NotFoundError(`Spending with id ${spendingId} not found`);
        }

        if (isNaN(amount) && amount.toString().indexOf(".") === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`);
        }

        if (!Object.values(SpendingTypes.types).includes(type)) {
            const validTypesString = SpendingTypes.formatValidTypesString();
            throw new BadRequestError(`Invalid type. Must be either ${validTypesString}`);
        }

        const updatedSpending = await spending.update(
            {
                description,
                amount,
                type,
                categoryId,
            },
            {
                where: {
                    id: spendingId,
                },
            }
        );

        return updatedSpending;
    }

    async deleteSpending(spendingId) {
        const spending = await Spending.findByPk(spendingId);
        if (!spending) {
            throw new NotFoundError(`Spending with id ${spendingId} not found`);
        }
        return await Spending.destroy({ where: { id: spendingId } });
    }
}

module.exports = new SpendingService();
