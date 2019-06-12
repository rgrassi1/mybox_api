const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/signin', UserController.signIn);
router.post('/signup', UserController.signUp);

module.exports = router;