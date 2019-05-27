const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

UserSchema.pre('save', function() {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt((err, salt) => { 
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    })
})

const User = mongoose.Schema('User', UserSchema);
module.exports = User;