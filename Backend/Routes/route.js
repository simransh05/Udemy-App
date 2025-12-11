const express = require('express')
const router = express.Router()
const controller = require('../Controller/postUser')
const multer = require('multer');
const upload = multer({
    dest: 'upload/', limits: {
        fileSize: 50 * 1024 * 1024,
    }
})

router.post('/signup', controller.postSignup);

router.post('/login', controller.postLogin);

router.get("/:filter", controller.getCards);

router.get('/', controller.getAllCards);

router.post("/", upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), controller.postCard);

router.post('/cart', controller.postCart);

router.post('/fav', controller.postFav);

router.get('/cart/:userId', controller.getCart);

router.get('/fav/:userId', controller.getFav);

router.delete('/cart', controller.deleteCartItem);

router.delete('/fav', controller.deleteFavItem);

router.post('/learn', controller.postLearn);

router.get('/learn/:userId', controller.getLearn);

router.delete('/learn', controller.deleteLearnItem);

router.delete('/:cardId', controller.deleteCardItem);

module.exports = router;