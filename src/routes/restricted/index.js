const router = require('express').Router();
const boxesRouter = require('./boxes');
const filesRouter = require('./files');
const { checkToken } = require('./middleware');

router.use(checkToken);

router.use('/boxes', boxesRouter);
router.use('/files', filesRouter);

module.exports = router;