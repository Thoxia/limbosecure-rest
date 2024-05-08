const express = require('express');
const serverController = require('../controllers/server.controller');
const router = express.Router()

router.get('/', serverController.getAll)
router.post('/', serverController.create)
router.put('/:id', serverController.update)

module.exports = router