const BudgetService = require("../services/budget.service");
const StatusCode = require("../utils/util.statuscode");

class BudgetController {
    async addBudget(req, res) {
        const { title, amount, startDate, endDate } = req.body;
        try {
            const budget = await BudgetService.addBudget(title, amount, startDate, endDate);
            res.json(budget);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }

    async getBudgetById(req, res) {
        const { budgetId } = req.params;
        try {
            const budget = await BudgetService.getBudgetById(budgetId);
            res.json(budget);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }

    async listAllBudgets(req, res) {
        try {
            const budgets = await BudgetService.allBudgets();
            res.json(budgets);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }

    async editBudget(req, res) {
        const { budgetId, title, amount, startDate, endDate } = req.body;
        try {
            const budget = await BudgetService.editBudget(budgetId, title, amount, startDate, endDate);
            res.json(budget);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }
}

module.exports = new BudgetController();
