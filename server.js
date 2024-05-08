const express = require('express')
const mongoose  = require('mongoose');
const app = express()
const settings = require('./settings.json');
const port = settings.port;

app.use(express.json());
app.use(logger)
app.use(serverIdVerifier)
app.use(codeLengthChecker)

const codeRouter = require('./routes/code');
app.use('/api/v1/code', codeRouter);

function logger(req, res, next) {
    console.log(`[${new Date().toLocaleString()}] Got a request to "${req.originalUrl}" from "${req.connection.remoteAddress.split(`:`).pop()}". ServerID: "${req.get("X-API-Key") || "Not Found!"}"`)
    next()
}

function serverIdVerifier(req, res, next) {
    const serverId = req.get("X-API-Key");
    if (serverId == null || serverId.length <= 10) {
        res.status(401).json({status: false, message: "You must provide a server id!"})
        return
    }

    if (serverId.length >= 60) {
        res.status(431).json({status: false, message: "Provided server id is too big!"})
        return
    }

    req.serverId = serverId;
    next()
}

function codeLengthChecker(req, res, next) {
    var code = req.body.code;
    if (!code) {
        next()
        return
    }
    
    if (code.length > 15) {
        res.status(502).json({status: false, message: "Provided code is too big!"})
        return
    }

    next()
}

mongoose.connect(settings.mongo)
.then(() => {
    console.log("mongoose connected")
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(() => {
    console.log("could not connect to mongo!")
})