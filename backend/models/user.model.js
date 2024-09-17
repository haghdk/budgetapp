const brcrypt = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");

const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            hooks: {
                beforeCreate: async (user) => {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await brcrypt.hash(user.password, salt);
                },
            },
        }
    );
    User.prototype.isValidPassword = async function (password) {
        return brcrypt.compare(password, this.password);
    };
    return User;
};

module.exports = UserModel;
