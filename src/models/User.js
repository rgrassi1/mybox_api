const mongoose = require('mongoose');
const { gerarHash } = require('../utils')

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

UserSchema.pre('save', async function() {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    const hash = await gerarHash(user.password);
    user.password = hash;
})

const User = mongoose.Schema('User', UserSchema);
module.exports = User;