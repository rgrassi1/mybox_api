const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch(err) {            
        res.status(401);
        res.send({ success: false, message: err.message });
    }
}

module.exports = { checkToken }