// services/CategoryService.js

const { Category } = require('../models')

/**
 * @typedef {import('../models').Category} Category
 */

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
            return null
        } 
        return categories
    }
}

module.exports = new CategoryService()