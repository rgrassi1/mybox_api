const User = require('../models/User');

const show = async(req, res) => {
    const user = req.body;
    const user = await User.findOne({ email: user.email })
}

module.exports = { show }