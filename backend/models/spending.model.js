const SpendingTypes = require("../constants/types");

const SpendingModel = (sequelize, DataTypes) => {
    const Spending = sequelize.define("Spending", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(Object.values(SpendingTypes.types)),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        budgetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Categories",
                key: "id",
            },
        },
    });
    return Spending;
};

module.exports = SpendingModel;
