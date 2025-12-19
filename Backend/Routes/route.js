const express = require('express')
const router = express.Router()
const controller = require('../Controller/postUser')
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024,
    }
});

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

router.get('/individualLearn/:cardId', controller.getIndividualLearn);

router.delete('/:cardId', controller.deleteCardItem);

router.post('/guest', controller.getGuestCart);

router.post('/guest', controller.addGuestCart);

router.post('/rating', controller.addRating);

router.post('/logout' , controller.logout);

router.get('/user' , controller.getUser)

module.exports = router;