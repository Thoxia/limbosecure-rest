const express = require('express');
const Code = require('../models/code.model');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const codes = await Code.find({serverId: req.serverId});
        res.status(200).json(codes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.get('/status/:id', async (req, res) => {
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

router.put('/verify/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await Code.updateOne({code: id, serverId: req.serverId, status: "VALID"}, {status: "VERIFIED"});
        res.status(200).json({updated: updated.modifiedCount >= 1});
    } catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
})

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        body.serverId = req.serverId;
        const code = await Code.create(body);
        res.status(201).json(code);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const code = await Code.deleteOne({"code": id, "serverId": req.serverId});
        res.status(201).json({deleted: code.deletedCount >= 1});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = router