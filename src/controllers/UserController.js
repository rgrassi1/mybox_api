const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const signIn = async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.send({ success: false, message: 'could not find your account' });
    }    
    if (!user.active) {
        return res.send({ success: false, message: 'could not find your account' })
    }

    const signed = await user.checkPassword(req.body.password);
    
    if (!signed) {
        return res.send({ success: false, message: 'wrong credentials' });
    }

    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.send({ success: true, token: token });
}

const signUp = async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.send({ success: false, message: 'user not available' })
    }
    
    const newUser = await User.create(req.body);
    const payload = { id: newUser._id, email: newUser.email };
    res.status(201).send({ success: true, user: payload });
}

const sendEmail = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({ success: false, message: 'user not found' });        
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    const url = `${process.env.APP_URL}/restrito/users/confirm-email/?token=${token}`;
    await transporter.sendMail({
        to: user.email,
        cc: 'kanimalking@gmail.com',
        subject: 'MyBox - ativação de conta',
        html: `<div><p style="font-weight: 400; color: #202124">Por favor clique no botão para ativar a sua conta.</p><a style="display: block; text-align: center; padding: 15px 0; background: #7159c1; color: #FFF; text-decoration: none; border-radius: 4px; font-size: 16px" href="${url}">Ativar a conta</a></div>`
    });

    res.send({ success: true, message: 'email sent' })
}

const confirmEmail = async(req, res) => {
    const { token } = req.query;
    try {
        const userDecoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: userDecoded.email });
        if (!user.active) {
            user.active = true;
            await user.save();    
            res.send({ success: true, message: 'account activated successfully' });
        } else {
            res.send({ success: false, message: 'account has already been activated' });
        }  
    } catch(err) {
        res.send({ success: false, message: err });
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',        
    auth: {
      user: 'kanimalking@gmail.com',
      pass: 'r@@t1234'
    }    
});

const updateAvatar = async(req, res) => {
    const { key = '', location: url = '' } = req.file;
    
    const user = await User.findOne({ email: req.params.email });
    if (user) {
        user.avatar_key = key;
        user.avatar_url = url;    
        const updatedUser = await user.save();
        res.json(updatedUser);    
    } else {
        res.status(404).send({ success: false, message: 'user not found' })
    }
}

module.exports = { signIn, signUp, updateAvatar, confirmEmail, sendEmail }