exports.serverIdVerifier = function(req, res, next) {
    if (req.originalUrl.startsWith("/api/v1/server")) {
        next()
        return
    }

    const serverId = req.get("X-API-KEY");
    if (serverId === null || serverId === undefined || serverId.length <= 10) {
        res.status(401).json({status: false, message: "You must provide a server id!"})
        return
    }

    if (serverId.length >= 60) {
        res.status(431).json({status: false, message: "Provided server id is too big!"})
        return
    }

    req.serverId = serverId;
    next()
}