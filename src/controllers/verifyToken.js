const jwt = require('jsonwebtoken')
const config = require('../config')

function VerifyToken (req, res, next) {
    const token = req.headers['x-access-token']
    const { secret } = config
    if (!token) return res.status(401).json({
        auth: false,
        status: 'error-credential',
        message: 'no token provided'
    })
    const decoded = jwt.verify(token, secret)
    req.userID = decoded.id
    next()
}

module.exports = VerifyToken