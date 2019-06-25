const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/signin', UserController.signIn);
router.post('/signup', UserController.signUp);
router.get('/send-email', UserController.sendEmail);

module.exports = router;