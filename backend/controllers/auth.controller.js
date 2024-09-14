const AuthService = require('../services/auth.service')
const StatusCode = require('../utils/util.statuscode')

class AuthController {
    async register(req, res) {
        const { username, password } = req.body
        try {
            const { user, accessToken, refreshToken } = await AuthService.register(username, password)
            res.json({ user, accessToken, refreshToken })            
        } catch (error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })        
        }
    }

    async login(req, res) {
        const { username, password } = req.body
        try {
            const { accessToken, refreshToken } = await AuthService.login(username, password)
            res.json({ accessToken, refreshToken })
        } catch(error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })        
        }
    }

    async refreshToken(req, res) {
        const { refreshToken } = req.body
        try {
            const newAccessToken = await AuthService.refresh(refreshToken)
            res.json({ accessToken: newAccessToken })
        } catch(error) {
            res.status(StatusCode.statusCodeFromErrorType(error)).json({ error: error.message })        
        }
    }
}

module.exports = new AuthController()