const router = require('express').Router();
const boxes = require('./boxes');
const files = require('./files');
const { checkToken } = require('../utils')

router.use((req, res, next) => {
    const token = req.headers['x-access-token'];
    try {
        checkToken(token);
        next();
    } catch(err) {
        return res.status(401).send({ success: false, message: err });
    }
});
router.use('/boxes', boxes);
router.use('/files', files);

module.exports = router;