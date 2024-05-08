const settings = require('../settings.json');

exports.secretKeyVerifier = function secretKeyVerifier(req, res, next) {
    if (req.originalUrl.startsWith("/api/v1/code")) {
        next()
        return
    }
    
    const key = req.get("X-API-Secret");
    if (key != settings.secretKey) {
        res.status(401).json({status: false, message: "Secret key is not valid!"})
        return
    }

    next()
}