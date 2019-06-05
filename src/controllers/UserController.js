const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signin = async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        const signed = await user.checkPassword(req.body.password);
        if (signed) {
            const payload = { id: user._id, email: user.email }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60  * 60 * 24 });
            res.send({ success: true, token: token })
        } else {
            res.send({ success: false, message: 'Wrong credentials' });
        }    
    } else {
        res.send({ success: false, message: 'Wrong credentials' });
    } 
}

const signup = async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.send({ success: false, message: 'User not available' })
    }

    await User.create(req.body);
    return res.status(201).json({ success: true, message: 'User created' });
}

module.exports = { signin, signup }