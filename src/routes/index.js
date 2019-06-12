const router = require('express').Router();
const restricted = require('./restricted');
const user = require('./users');
const { checkToken } = require('./check_token')

router.use('/restrito', restricted);
router.use('/user', user);
router.get('/token', checkToken, (req, res) => {
    res.send({ success: true });
});

module.exports = router;