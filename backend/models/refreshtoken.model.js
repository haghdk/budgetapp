const RefreshTokenModel = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define("RefreshToken", {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    RefreshToken.isExpired = function (token) {
        return token.expiryDate.getTime() < new Date().getTime();
    };

    return RefreshToken;
};

module.exports = RefreshTokenModel;
