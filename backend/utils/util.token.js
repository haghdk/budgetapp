const jwt = require("jsonwebtoken");
const { secret, accessTokenExpiry, refreshTokenExpiry } = require("../config/jwt");

class TokenUtils {
    generateAccessToken(user) {
        return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: accessTokenExpiry });
    }

    generateRefreshToken(user) {
        return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: refreshTokenExpiry });
    }

    verifyToken(token) {
        return jwt.verify(token, secret);
    }
}

module.exports = new TokenUtils();
