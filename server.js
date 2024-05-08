const express = require('express')
const mongoose  = require('mongoose');
const app = express()
const settings = require('./settings.json');
const {Server} = require('./models/server.model');
const {serverRateLimiter} = require('./middlewares/ratelimit.middleware');
const {serverSaver} = require('./middlewares/serversaver.middleware');
const {secretKeyVerifier} = require('./middlewares/secret.middleware');
const {codeLengthChecker} = require('./middlewares/length.middleware');
const {serverIdVerifier} = require('./middlewares/id.middleware');
const port = settings.port;

Server.sync()

app.use(express.json())
app.use(logger)
app.use(serverIdVerifier)
app.use(codeLengthChecker)
app.use(serverRateLimiter)
app.use(serverSaver)

const codeRouter = require('./routes/code');
app.use('/api/v1/code', codeRouter);

app.use(secretKeyVerifier)
const serverRouter = require('./routes/server');
app.use('/api/v1/server', serverRouter);

function logger(req, res, next) {
    const ip = req.connection.remoteAddress.split(`:`).pop();
    console.log(`[${new Date().toLocaleString()}] Got a request to "${req.originalUrl}" from "${ip}". ServerID: "${req.get("X-API-Key") || "Not Found!"}"`)
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