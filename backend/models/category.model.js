// models/Category.js

/**
 * @typedef {import('sequelize').Model} Model
 * @typedef {import('sequelize').DataTypes} DataTypes
 */

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model}
 */
const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Category
} 

module.exports = CategoryModel