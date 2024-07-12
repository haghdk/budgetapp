const CategoryService = require('../services/category.service')

class CategoryController {
    async addCategory(req, res) {
        const { name, color } = req.body
        try {
            const category = await CategoryService.addCategory(name, color)
            res.json(category)
        } catch (error) {
            const statusCode = error.statusCode != null ? error.statusCode : 500
            res.status(statusCode).json({ error: error.message }) 
        }
    }

    async updateCategory(req, res) {
        const { name, color, categoryId } = req.body
        try {
            const category = await CategoryService.editCategory(name, color, categoryId)
            res.json(category)
        } catch (error) {
            const statusCode = error.statusCode != null ? error.statusCode : 500
            res.status(statusCode).json({ error: error.message }) 
        }
    }
    
    async listAllCategories(req, res) {
        try {
            const categories = await CategoryService.listAllCategories()
            res.json(categories)
        } catch (error) {
            const statusCode = error.statusCode != null ? error.statusCode : 500
            res.status(statusCode).json({ error: error.message }) 
        }
    }    
}

module.exports = new CategoryController()