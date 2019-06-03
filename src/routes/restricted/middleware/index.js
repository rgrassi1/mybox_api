const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch(err) {            
        return res.status(401).json({ success: false, message: err.message });        
    }
}

module.exports = { checkToken }