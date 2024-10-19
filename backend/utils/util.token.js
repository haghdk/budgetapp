const jwt = require("jsonwebtoken");
const { secret, accessTokenExpiry, refreshTokenExpiry } = require("../config/jwt.config");
const TokenGenerationError = require("../errors/error.tokengeneration");

class TokenUtils {
    generateAccessToken(user) {
        try {
            return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: accessTokenExpiry });
        } catch (error) {
            throw new TokenGenerationError("Failed to generate token");
        }
    }

    generateRefreshToken(user) {
        try {
            return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: refreshTokenExpiry });
        } catch (error) {
            throw new TokenGenerationError("Failed to generate token");
        }
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            throw new TokenGenerationError("Failed to verify acccesstoken");
        }
    }
}

module.exports = new TokenUtils();
