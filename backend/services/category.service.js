const { Category, Spending } = require('../models')
const { NotFoundError, ConflictError } = require('../errors/errors')

class CategoryService {
    async addCategory(name, color) {
        const category = await Category.create({
          name,
          color  
        })
        return category
    }

    async listAllCategories() {
        const categories = await Category.findAll({attributes: ['id', 'name', 'color']})
        if (categories === null) {
            throw new Error('Error finding categories')
        } 
        return categories
    }

    async editCategory(name, color, categoryId) {
        const category = await Category.findByPk(categoryId)
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`)
        }

        const updatedCategory = category.update({
            name,
            color
        }, 
        {
            where: { id: categoryId }
        })
        return updatedCategory
    }
    
    async deleteCategory(categoryId) {
        const category = await Category.findByPk(categoryId)
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`)
        }

        const spendings = await Spending.findAll({ where: { categoryId } })
        if (spendings.length > 0) {
            throw new ConflictError('Cannot delete category with associated spendings')
        }

        return await Category.destroy({ where: { id: categoryId } })
    }
}

module.exports = new CategoryService()