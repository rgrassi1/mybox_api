const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signIn = async(req, res) => {
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

const signUp = async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.send({ success: false, message: 'User not available' })
    }

    const newUser = await User.create(req.body);
    const restrictedUser = { _id: newUser._id, email: newUser.email }
    res.status(201).json(restrictedUser);
}

const updateAvatar = async(req, res) => {
    const { key = '', location: url = '' } = req.file;
    
    const user = await User.findOne({ email: req.params.email });
    if (user) {
        user.avatar_key = key;
        user.avatar_url = url;    
        const updatedUser = await user.save();
        res.json(updatedUser);    
    } else {
        res.status(404).send({ success: false, message: 'User not found' })
    }
}

module.exports = { signIn, signUp, updateAvatar }