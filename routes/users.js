var express = require('express');
var router = express.Router();
const controller = require('../controller/usercontroller');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "."+ file.originalname.split('.').pop())
    }
  })
  
const upload = multer({ storage: storage })
  

router.get('/read',controller.SECURE,controller.READ)

router.post('/signup', upload.single('profile'), controller.SIGNUP);

router.post('/login', controller.LOGIN);

router.patch('/update/:id',controller.SECURE,controller.UPDATE);

router.delete('/delete/:id',controller.SECURE,controller.DELETE);

module.exports = router;