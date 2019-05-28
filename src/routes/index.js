const router = require('express').Router();
const boxesRouter = require('./boxes');
const filesRouter = require('./files');
const userRouter = require('./users');

router.use('/boxes', boxesRouter);
router.use('/files', filesRouter);
router.use('/user', userRouter);

module.exports = router;