const router = require('express').Router();
const { sign } = require('jsonwebtoken')
const User = require('../models/User');

router.post('/auth', async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' })
    }

    if (user !== req.body.password) {
        res.status(401).json({ success: false, message: 'Wrong credentials' })
    }

    

})

module.exports = router;