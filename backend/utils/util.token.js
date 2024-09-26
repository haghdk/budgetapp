const jwt = require("jsonwebtoken");
const { secret, accessTokenExpiry, refreshTokenExpiry } = require("../config/jwt.config");

class TokenUtils {
    generateAccessToken(user) {
        try {
            return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: accessTokenExpiry });
        } catch (error) {
            console.log("Not good");
        }
    }

    generateRefreshToken(user) {
        try {
            return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: refreshTokenExpiry });
        } catch (error) {
            console.log("Not good");
        }
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            console.log("Not good" + error);
        }
    }
}

module.exports = new TokenUtils();
