const { Category } = require('../models')
const { NotFoundError } = require('../errors/errors')

class CategoryService {
    async addCategory(name, color) {
        const category = await Category.create({
          name,
          color  
        })
        return category
    }

    async listAllCategories() {
        const categories = await Category.findAll()
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
}

module.exports = new CategoryService()