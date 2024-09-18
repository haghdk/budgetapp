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
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }

    async refreshToken(req, res) {
        const { refreshToken } = req.body;
        try {
            const newAccessToken = await UserService.refresh(refreshToken);
            res.json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
