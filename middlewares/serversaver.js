const Server = require('../models/ServerSchema');

exports.serverSaver = async function(req, res, next) {
    const ip = req.ip;
    if (ip == process.env.BOT_IP) {
        next()
        return
    }

    const id = req.serverId;
    // js is weird...
    if (!id || id === undefined || id == null) {
        next()
        return
    }

    await Server.findOneAndUpdate({serverId: id}, {ip: ip}, {
        new: true,
        upsert: true
    });

    next()
}