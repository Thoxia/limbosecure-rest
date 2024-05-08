const {Server} = require('../models/ServerSchema');
const settings = require('../settings.json');

exports.serverSaver = async function serverSaver(req, res, next) {
    const ip = req.connection.remoteAddress.split(`:`).pop();
    if (ip == settings.botIp) {
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