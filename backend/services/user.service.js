const { NotFoundError, BadRequestError, UnauthorizedError, ConflictError } = require("../errors/errors");
const { User, RefreshToken } = require("../models/");
const TokenUtils = require("../utils/util.token");
const Logger = require("../config/logger.config");

class UserService {
    async register(username, password) {
        if (username == null || username === "" || password == null || password === "") {
            throw new BadRequestError("Username or password cannot be empty");
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            throw new ConflictError(`User ${username} already exists`);
        }

        const user = await User.create({ username, password });
        const accessToken = TokenUtils.generateAccessToken(user);
        const refreshToken = TokenUtils.generateRefreshToken(user);

        return { user, accessToken, refreshToken };
    }

    async login(username, password) {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.isValidPassword(password))) {
            throw new UnauthorizedError("Invalid username or password");
        }
        const accessToken = TokenUtils.generateAccessToken(user);
        const refreshToken = TokenUtils.generateRefreshToken(user);

        await RefreshToken.destroy({ where: { userId: user.id } });

        await RefreshToken.create({
            token: refreshToken,
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            userId: user.id
        })

        return { accessToken, refreshToken };
    }

    async logout(refreshToken) {
        await RefreshToken.destroy({ where: { token: refreshToken } });
    }

    async refresh(refreshToken) {
        const tokenEntry = await RefreshToken.findOne({ where: { token: refreshToken } });
        if (!tokenEntry) {
            throw new UnauthorizedError("Invalid refresh token");
        }

        if (RefreshToken.isExpired(tokenEntry)) {
            await RefreshToken.destroy({ where: { token: refreshToken } });
            throw new UnauthorizedError("Refresh token has expired! Please log in again");
        }

        const decoded = TokenUtils.verifyToken(refreshToken);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new UnauthorizedError("Invalid refresh token. User not found");
        }

        const newAccessToken = TokenUtils.generateAccessToken(user);
        const newRefreshToken = this.issueNewRefreshToken(user);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
    
    async issueNewRefreshToken(user) {
        const newToken = TokenUtils.generateRefreshToken(user);

        await RefreshToken.create({
            token: newToken,
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            userId: user.id,
        });

        return newToken;
    }
}

module.exports = new UserService();
