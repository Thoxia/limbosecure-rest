const {Server} = require('../models/ServerSchema');

exports.serverSaver = async function(req, res, next) {
    const ip = req.connection.remoteAddress.split(`:`).pop();
    if (ip == process.env.BOT_IP) {
        next()
        return
    }

    const id = req.serverId;
    if (!id) {
        next()
        return
    }

    const server = await Server.findByPk(id);
    if (!server) {
        await Server.create({
            id: id,
            ip: req.ip,
            premium: false
        });
    }

    next()
}