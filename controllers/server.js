const {Server} = require('../models/ServerSchema');
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async function createServer(req, res) {
    try {
        const server = await Server.create(req.body);
        res.status(201).json(server);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

exports.update = asyncHandler(async function updateServer(req, res) {
    try {
        const server = await Server.findByPk(req.params.id);
        if (server) {
            await server.update(req.body);
            res.status(200).json(server);
        } else {
            res.status(500).json({message: "Server not found!"});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

exports.getAll = asyncHandler(async function getAll(req, res) {
    try {
        const servers = await Server.findAll();
        res.status(201).json(servers);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})