const express = require('express')
const router = express.Router()
const controller = require('../Controller/postUser')
const multer = require('multer');
const upload = multer({ dest: 'upload/' })

router.post('/signup', controller.postSignup);

router.post('/login', controller.postLogin);

router.get("/:filter", controller.getCards);

router.post("/", upload.single(thumbnail), controller.postCard);

module.exports = router;