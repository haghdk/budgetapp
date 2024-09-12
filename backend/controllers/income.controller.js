const IncomeService = require('../services/income.service')
const StatusCode = require('../utils/util.statuscode')

class IncomeController {
    async addIncome(req, res) {
        const { description, amount, source, date, budgetId } = req.body
        try {
            const income = await IncomeService.addIncome(description, amount, source, date, budgetId)
            res.json(income)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message }) 
        }
    }

    async listIncomeInBudget(req, res) {
        const { budgetId } = req.params;
        try {
            const incomeData = await IncomeService.listIncomeInBudget(budgetId);
            res.json(incomeData);
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message }) 
        }
    }
}

module.exports = new IncomeController()