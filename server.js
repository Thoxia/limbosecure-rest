require('dotenv').config();
const express = require('express')
const mongoose  = require('mongoose');
const app = express()
const {serverRateLimiter} = require('./middlewares/ratelimit');
const {serverSaver} = require('./middlewares/serversaver');
const {secretKeyVerifier} = require('./middlewares/secret');
const {codeLengthChecker} = require('./middlewares/length');
const {serverIdVerifier} = require('./middlewares/id');
const port = process.env.PORT || 3000;

app.set('trust proxy', 1)

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
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(`:`).pop();
    req.ip = ip;
    console.log(`[${new Date().toLocaleString()}] Got a request to "${req.originalUrl}" from "${ip}". ServerID: "${req.get("X-API-Key") || "Not Found!"}"`)
    next()
}

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongoose connected")
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.log("could not connect to mongo!")
    console.log(err.message)
})