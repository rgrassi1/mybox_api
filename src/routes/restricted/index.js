const router = require('express').Router();
const boxes = require('./boxes');
const files = require('./files');
const users = require('./users');
const { checkToken } = require('../check_token')

router.use(checkToken);
router.use('/boxes', boxes);
router.use('/files', files);
router.use('/users', users);

module.exports = router;