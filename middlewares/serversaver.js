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

    const server = await Server.findOne({serverId: id});
    if (!server) {
        await Server.create({serverId: id, ip: ip});
    } else {
        await Server.updateOne({serverId: id}, {ip: ip});
    }

    next()
}