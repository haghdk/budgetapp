const { Income, Budget } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors/errors");

class IncomeService {
    async addIncome(description, amount, source, date, budgetId) {
        const budget = await Income.findByPk(budgetId);

        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`);
        }

        if (description == null || description === "") {
            throw new BadRequestError("Description cannot be empty");
        }

        if (isNaN(amount) && amount.toString().indexOf(".") === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`);
        }

        if (source == null || source === "") {
            throw new BadRequestError("Source cannot be empty");
        }

        const income = await Income.create({
            description,
            amount,
            source,
            date,
            budgetId,
        });
        return income;
    }

    async listIncomeInBudget(budgetId) {
        const budget = await Budget.findByPk(budgetId);
        if (!budget) {
            throw new NotFoundError(`Budget with id ${budgetId} not found`);
        }

        const incomeItems = await Income.findAndCountAll({
            where: {
                budgetId,
            },
        });

        const totalIncome = await Income.sum("amount", {
            where: {
                budgetId,
            },
        });

        return {
            count: incomeItems.count,
            rows: incomeItems.rows,
            totalIncome: totalIncome || 0,
        };
    }

    async editSpending(description, amount, source, date, incomeItemId) {
        const income = await Income.findByPk(incomeItemId);
        if (!income) {
            throw new NotFoundError(`Spending with id ${incomeItemId} not found`);
        }

        if (isNaN(amount) && amount.toString().indexOf(".") === -1) {
            throw new BadRequestError(`Amount must be a number in float format. You send "${typeof amount}"`);
        }

        if (description == null || description === "") {
            throw new BadRequestError("Description cannot be empty");
        }

        if (source == null || source === "") {
            throw new BadRequestError("Source cannot be empty");
        }

        const updateIncomeItem = await income.update(
            {
                description,
                amount,
                source,
                date,
            },
            {
                where: {
                    id: incomeItemId,
                },
            }
        );

        return updateIncomeItem;
    }

    async getIncomeItemById(incomeItemId) {
        const income = await Income.findByPk(incomeItemId);
        if (!income) {
            throw new NotFoundError(`Spending with id ${incomeItemId} not found`);
        }
        return income;
    }

    async deleteIncomeItem(incomeItemId) {
        const income = await Income.findByPk(incomeItemId);
        if (!income) {
            throw new NotFoundError(`Spending with id ${incomeItemId} not found`);
        }
        return await Income.destroy({
            where: {
                id: incomeItemId,
            },
        });
    }
}

module.exports = new IncomeService();
