const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Budget = require('./budget.model')(sequelize, Sequelize)
const Spending = require('./spending.model')(sequelize, Sequelize)
const Category = require('./category.model')(sequelize, Sequelize)

Budget.hasMany(Spending, { foreignKey: 'budgetId' })
Spending.belongsTo(Budget, { foreignKey: 'budgetId' })

Category.hasMany(Spending, { foreignKey: 'categoryId' })
Spending.belongsTo(Category, { foreignKey: 'categoryId' })

sequelize.sync()

module.exports = {
    Budget,
    Spending,
    Category,
    sequelize
}