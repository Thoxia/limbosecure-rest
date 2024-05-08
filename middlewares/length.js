exports.codeLengthChecker = function codeLengthChecker(req, res, next) {
    var code = req.body.code;
    if (!code) {
        next()
        return
    }
    
    if (code.length > 15) {
        res.status(502).json({status: false, message: "Provided code is too big!"})
        return
    }

    next()
}