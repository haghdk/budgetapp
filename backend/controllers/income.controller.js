const IncomeService = require("../services/income.service");
const StatusCode = require("../utils/util.statuscode");

class IncomeController {
    async addIncome(req, res) {
        const { description, amount, source, date, budgetId } = req.body;
        try {
            const income = await IncomeService.addIncome(description, amount, source, date, budgetId);
            res.json(income);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }

    async listIncomeInBudget(req, res) {
        const { budgetId } = req.params;
        try {
            const incomeData = await IncomeService.listIncomeInBudget(budgetId);
            res.json(incomeData);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }

    async getIncomeItemById(req, res) {
        const { incomeItemId } = req.params;
        try {
            const incomeItem = await IncomeService.getIncomeItemById(incomeItemId);
            res.json(incomeItem);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }

    async editSpending(req, res) {
        const { incomeItemId, description, amount, source, date } = req.body;
        try {
            const income = await IncomeService.editSpending(description, amount, source, date, incomeItemId);
            res.json(income);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }

    async deleteIncomeItem(req, res) {
        const { incomeItemId } = req.params;
        try {
            const deletedIncomeItem = await IncomeService.deleteIncomeItem(incomeItemId);
            if (deletedIncomeItem) {
                res.json({ message: "Income item deleted" });
            } else {
                res.status(500).json({ message: "Income item was not deleted for some unexpected reason" });
            }
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }
}

module.exports = new IncomeController();
