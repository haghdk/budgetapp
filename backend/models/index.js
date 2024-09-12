const Sequelize = require('sequelize')
const sequelizeConfig = require('../config/database')

const Budget = require('./budget.model')(sequelizeConfig, Sequelize)
const Spending = require('./spending.model')(sequelizeConfig, Sequelize)
const Category = require('./category.model')(sequelizeConfig, Sequelize)
const Income = require('./income.model')(sequelizeConfig, Sequelize)
const User = require('./user.model')(sequelizeConfig, Sequelize)

Budget.hasMany(Spending, { foreignKey: 'budgetId' })
Spending.belongsTo(Budget, { foreignKey: 'budgetId' })

Category.hasMany(Spending, { foreignKey: 'categoryId' })
Spending.belongsTo(Category, { foreignKey: 'categoryId' })

Budget.hasMany(Income, { foreignKey: 'budgetId' })
Income.belongsTo(Budget, { foreignKey: 'budgetId' })

sequelizeConfig.sync({ alter: true })

module.exports = {
    Budget,
    Spending,
    Category,
    User,
    Income,
    sequelizeConfig
}