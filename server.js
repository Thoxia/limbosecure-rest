const express = require('express')
const mongoose  = require('mongoose');
const app = express()
const settings = require('./settings.json');
const port = settings.port;

app.use(express.json());
app.use(logger)
app.use(serverIdVerifier)

const codeRouter = require('./routes/code');
app.use('/v1/code', codeRouter);

function logger(req, res, next) {
    console.log(`[${new Date().toLocaleString()}] Got a request to "${req.originalUrl}" from "${req.connection.remoteAddress.split(`:`).pop()}". ServerID: "${req.get("X-API-Key") || "Not Found!"}"`)
    next()
}

function serverIdVerifier(req, res, next) {
    const serverId = req.get("X-API-Key");
    if (serverId == null) {
        res.status(401).json({status: false, message: "You must provide a server id!"})
        return
    }
    req.serverId = serverId;
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