
exports.secretKeyVerifier = function(req, res, next) {
    if (req.originalUrl.startsWith("/api/v1/code")) {
        next()
        return
    }
    
    const key = req.get("X-API-Secret");
    if (key != process.env.SECRET_KEY) {
        res.status(401).json({status: false, message: "Secret key is not valid!"})
        return
    }

    next()
}