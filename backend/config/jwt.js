require("dotenv").config();

module.exports = {
    secret: process.env.JWT_SECRET,
    accessTokenExpiry: "15m",
    refreshTokenExpiry: "30d",
};
