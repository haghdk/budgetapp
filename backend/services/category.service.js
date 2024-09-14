const { Category, Spending } = require("../models");
const { NotFoundError, ConflictError, BadRequestError } = require("../errors/errors");

class CategoryService {
    async addCategory(name, color) {
        const isHex = /^#[0-9A-F]{6}$/i.test(color);
        if (!isHex) {
            throw new BadRequestError("Color must be in valid hex format without transparency, f.x #000000");
        }

        if (name == null || name === "") {
            throw new BadRequestError("Name cannot be empty");
        }

        const category = await Category.create({
            name,
            color,
        });
        return category;
    }

    async listAllCategories() {
        const categories = await Category.findAll({ attributes: ["id", "name", "color"] });
        if (categories === null) {
            throw new Error("Error finding categories");
        }
        return categories;
    }

    async editCategory(name, color, categoryId) {
        const category = await Category.findByPk(categoryId);
        const isHex = /^#[0-9A-F]{6}$/i.test(color);

        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        if (!isHex) {
            throw new BadRequestError("Color must be in valid hex format without transparency, f.x #000000");
        }

        if (name == null || name === "") {
            throw new BadRequestError("Name cannot be empty");
        }

        const updatedCategory = category.update(
            {
                name,
                color,
            },
            {
                where: { id: categoryId },
            }
        );
        return updatedCategory;
    }

    async deleteCategory(categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const spendings = await Spending.findAll({ where: { categoryId } });
        if (spendings.length > 0) {
            throw new ConflictError(`Cannot delete category with associated spendings. The category you are trying to delete has ${spendings.length} associated spendings.`);
        }

        return await Category.destroy({ where: { id: categoryId } });
    }
}

module.exports = new CategoryService();
