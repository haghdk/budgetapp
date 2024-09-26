const UserService = require("../services/user.service");
const StatusCode = require("../utils/util.statuscode");
const Logger = require("../config/logger.config");

class UserController {
    async register(req, res) {
        const { username, password } = req.body;
        try {
            const { user, accessToken, refreshToken } = await UserService.register(username, password);
            res.json({ user, accessToken, refreshToken });
            Logger.info(`User registered with ${username}`)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
            Logger.error(`User registration failed with error: ${error}`)
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const { accessToken, refreshToken } = await UserService.login(username, password);
            res.json({ accessToken, refreshToken });
            Logger.info(`User ${username} successfully logged in`)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
            Logger.error(`User failed to login with error: ${error}`)
        }
    }

    async refreshToken(req, res) {
        const { refreshToken } = req.body;
        try {
            const newAccessToken = await UserService.refresh(refreshToken);
            res.json({ accessToken: newAccessToken });
            Logger.info(`Accesstoken generated`)
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
            Logger.error(`Refreshtoken failed to generate with error: ${error}`)
        }
    }
}

module.exports = new UserController();
