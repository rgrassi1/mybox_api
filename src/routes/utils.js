const jwt = require('jsonwebtoken');

const checkToken = token => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);    
    } catch(err) {            
        throw new Error(err);
    }
}

module.exports = { checkToken }