const Code = require('../models/code.model');
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async function createCode(req, res) {
    try {
        const body = req.body;
        body.serverId = req.serverId;
        const code = await Code.create(body);
        res.status(201).json(code);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

exports.status = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const code = await Code.findOne({code: id, serverId: req.serverId, discordId: req.body.discordId});
        if (code) {
            res.status(200).json({status: code.status});
        } else {
            res.status(404).json({status: "NOT_FOUND"});
        }
    } catch (err) {
        res.status(500).json({status: "NOT_FOUND", message: err.message});
    }
})

exports.verify = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await Code.updateOne({code: id, serverId: req.serverId, status: "VALID"}, {status: "VERIFIED"});
        res.status(200).json({updated: updated.modifiedCount >= 1});
    } catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
})