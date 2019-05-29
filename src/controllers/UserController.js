const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signin = async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const signed = await user.checkPassword(req.body.password);
    if (!signed) {
        return res.status(401).json({ success: false, message: 'Wrong credentials' });
    }

    const payload = { id: user._id, email: user.email }
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }, (error, token) => {
        return res.status(200).json({ success: true, token: token });
    });
}

const signup = async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(409).json({ success: false, message: 'User not available' })
    }

    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
}

module.exports = { signin, signup }