const express = require('express');
const codeController = require('../controllers/code.controller');
const router = express.Router()

router.post('/', codeController.create)
router.get('/status/:id', codeController.status)
router.put('/verify/:id', codeController.verify)

module.exports = router