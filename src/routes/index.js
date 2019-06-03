const router = require('express').Router();
const restrictedRouter = require('./restricted');
const userRouter = require('./users');

router.use('/restrito', restrictedRouter);
router.use('/user', userRouter);

module.exports = router;