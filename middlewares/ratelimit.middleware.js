const rateLimit = require("express-rate-limit");
const {Server} = require('../models/server.model');

// non-premium servers can handle ~5 verification per 30 minutes
// premium servers can handle over 20 verification per 30 minutes
const serverRateLimiters = {
    false: rateLimit({
        windowMs: 60 * 30 * 1000,
        max: 200,
        message: {message: "You have exceeded your 200 requests per 30 minutes limit."},
        headers: true,
    }),
    true: rateLimit({
        windowMs: 60 * 30 * 1000,
        max: 800,
        message: {message: "You have exceeded your 800 requests per 30 minutes limit."},
        headers: true,
    }),
};

exports.serverRateLimiter = async function serverRateLimiter(req, res, next) {
    const key = req.serverId;
    const server = await Server.findByPk(key);
    if (!server) {
        serverRateLimiters[false](req, res, next);
        return
    }
    
    const limiter = serverRateLimiters[server.dataValues.premium];
    limiter(req, res, next)
}