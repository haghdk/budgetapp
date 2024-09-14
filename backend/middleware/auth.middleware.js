const TokenUtils = require('../utils/util.token')

class AuthMiddleware {
    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const verifiedToken = TokenUtils.verifyToken(token)
        if (!verifiedToken) {
            return res.status(431).json({ message: 'Forbidden' })
        }
        req.user = verifiedToken.username
        next()
    }
}

module.exports = new AuthMiddleware()