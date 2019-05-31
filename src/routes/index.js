const router = require('express').Router();
const restritoRouter = require('./restrito');
const userRouter = require('./users');

router.use('/restrito', restritoRouter);
router.use('/user', userRouter);

module.exports = router;