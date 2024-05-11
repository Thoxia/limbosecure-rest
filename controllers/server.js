const Server = require('../models/ServerSchema');
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
        const server = await Server.findOneAndUpdate({serverId: req.params.id}, req.body, {new: true});
        res.status(200).json(server);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

exports.getAll = asyncHandler(async function getAll(req, res) {
    try {
        const servers = await Server.find({});
        res.status(201).json(servers);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

exports.get = asyncHandler(async function get(req, res) {
    try {
        const server = await Server.findOne({serverId: req.params.id});
        res.status(201).json(server);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})