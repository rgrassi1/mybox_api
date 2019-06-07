const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar_key: {
        type: String
    },
    avatar_url: {
        type: String,
    }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    const user = this;

    if (!user.avatar_url) {
        user.avatar_url = `${process.env.APP_URL}/files/${user.avatar_key}`;
    }

    if (!user.isModified('password')) {
        return next();
    }

    const hash = await this.gerarHash(user.password);
    user.password = hash;
    next();
})

UserSchema.methods.gerarHash = async function(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

UserSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;