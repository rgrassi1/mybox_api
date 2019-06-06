const router = require('express').Router();
const restricted = require('./restricted');
const user = require('./users');
const { checkToken } = require('./utils')

router.use('/restrito', restricted);
router.use('/user', user);
router.get('/token', (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        checkToken(token);
        res.send();
    } catch(err) {
        return res.status(401).send({ success: false, message: err });
    }
});

module.exports = router;