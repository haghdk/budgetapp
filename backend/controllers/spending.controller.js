const SpendingService = require('../services/spending.service')

class SpendingController {
    async addSpending(req, res) {
        const { description, amount, type, budgetId, categoryId } = req.body
        try {
            const spending = await SpendingService.addSpending(description, amount, type, budgetId, categoryId)
            res.json(spending)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = new SpendingController()