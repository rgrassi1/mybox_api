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
    }
}, { timestamps: true });

UserSchema.pre('save', async function() {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    //const hash = await gerarHash(user.password);
    const hash = await gerarHash(user.password);
    user.password = hash;
})

UserSchema.methods.gerarHash = async function(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

UserSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

/*UserSchema.methods.checkPassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (error, isMatch) => {
            if (error) {
                reject(error)
            } else {
                resolve(isMatch)
            }
        })
    })
}*/

const User = mongoose.model('User', UserSchema);
module.exports = User;