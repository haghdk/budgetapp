const { Category } = require('../models')

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
            throw new Error('No categories found')
        } 
        return categories
    }

    async editCategory(name, color, categoryId) {
        const category = await Category.findByPk(categoryId)
        if (!category) {
            throw new Error(`Category with id ${categoryId} not found`)
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