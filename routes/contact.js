var express = require('express');
var router = express.Router();
const controller = require('../controller/contactcontroler');

router.post('/create',controller.SECURE,controller.CREATE);

router.get('/read',controller.SECURE,controller.READ)

router.put('/update/:id',controller.SECURE,controller.UPDATE);

router.delete('/delete/:id',controller.SECURE,controller.DELETE);

module.exports = router;