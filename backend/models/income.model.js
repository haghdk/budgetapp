const IncomeModel = (sequelize, DataTypes) => {
    const Income = sequelize.define('Income', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'null'
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        source: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        budgetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Income
}

module.exports = IncomeModel