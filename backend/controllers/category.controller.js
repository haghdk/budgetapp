const CategoryService = require('../services/category.service')
const StatusCode = require('../utils/util.statuscode')

class CategoryController {
    async addCategory(req, res) {
        const { name, color } = req.body
        try {
            const category = await CategoryService.addCategory(name, color)
            res.status(201).json(category)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })
        }
    }

    async updateCategory(req, res) {
        const { name, color, categoryId } = req.body
        try {
            const category = await CategoryService.editCategory(name, color, categoryId)
            res.status(201).json(category)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })
        }
    }

    async deleteCategory(req, res) {
        const { categoryId } = req.params
        try {
            const deletedCategory = await CategoryService.deleteCategory(categoryId)
            if (deletedCategory) {
                res.json({ message: 'Category deleted' })
            } else {
                res.status(500).json({ message: 'Category was not deleted for some unexpected reason' })
            }
        } catch(error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message }) 
        }
    }
    
    async listAllCategories(req, res) {
        try {
            const categories = await CategoryService.listAllCategories()
            res.json(categories)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message }) 
        }
    }
}

module.exports = new CategoryController()