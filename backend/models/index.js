const Sequelize = require('sequelize')
const sequelizeConfig = require('../config/database')

const Budget = require('./budget.model')(sequelizeConfig, Sequelize)
const Spending = require('./spending.model')(sequelizeConfig, Sequelize)
const Category = require('./category.model')(sequelizeConfig, Sequelize)

Budget.hasMany(Spending, { foreignKey: 'budgetId' })
Spending.belongsTo(Budget, { foreignKey: 'budgetId' })

Category.hasMany(Spending, { foreignKey: 'categoryId' })
Spending.belongsTo(Category, { foreignKey: 'categoryId' })

sequelizeConfig.sync()

module.exports = {
    Budget,
    Spending,
    Category,
    sequelize
}