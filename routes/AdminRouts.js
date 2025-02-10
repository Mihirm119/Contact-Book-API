var express = require('express');
var router = express.Router();
const controller = require('../controller/Admincontroler');

router.get('/read',controller.SECURE,controller.READ);

router.post('/signup', controller.SIGNUP);

router.post('/login', controller.LOGIN);

router.put('/update/:id',controller.SECURE,controller.UPDATE);

router.delete('/delete/:id',controller.DELETE);

module.exports = router;