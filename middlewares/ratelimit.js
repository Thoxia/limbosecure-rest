const rateLimit = require("express-rate-limit");
const Server = require('../models/ServerSchema');

// non-premium servers can handle ~5 verification per 30 minutes
// premium servers can handle over 25 verification per 30 minutes
const serverRateLimiters = {
    false: rateLimit({
        validate: {trustProxy: false},
        keyGenerator: (req, res) => req.serverId,
        windowMs: 60 * 30 * 1000,
        max: 200,
        message: {message: "You have exceeded your 200 requests per 30 minutes limit."},
        headers: true,
    }),
    true: rateLimit({
        validate: {trustProxy: false},
        keyGenerator: (req, res) => req.serverId,
        windowMs: 60 * 30 * 1000,
        max: 1000,
        message: {message: "You have exceeded your 1000 requests per 30 minutes limit."},
        headers: true,
    }),
};

exports.serverRateLimiter = async function(req, res, next) {
    const key = req.serverId;
    const server = await Server.findOne({serverId: key});
    if (!server) {
        serverRateLimiters[false](req, res, next);
        return
    }
    
    const limiter = serverRateLimiters[server.premium];
    limiter(req, res, next)
}