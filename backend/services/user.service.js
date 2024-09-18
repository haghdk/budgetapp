const jwt = require("../config/jwt.config");
const BadRequestError = require("../errors/error.badrequest");
const ConflictError = require("../errors/error.conflict");
const UnauthorizedError = require("../errors/error.unathorized");
const { User } = require("../models/");
const TokenUtils = require("../utils/util.token");

class UserService {
    async register(username, password) {
        if ((username == null || username === "") || (password == null || password === "")) {
            throw new BadRequestError('Username or password cannot be empty')
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            throw new ConflictError("User already exists");
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

        return { accessToken, refreshToken };
    }

    async refresh(refreshToken) {
        const decoded = TokenUtils.verifyToken(refreshToken);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new UnauthorizedError("Invalid refreshtoken");
        }
        const newAccessToken = TokenUtils.generateAccessToken(user);
        return newAccessToken;
    }
}

module.exports = new UserService();
