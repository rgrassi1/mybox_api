const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true });

FileSchema.pre('save', function() {
    const file = this;

    if (!file.url) {
        file.url = `${process.env.APP_URL}/files/${file.key}`
    }
});

const File = mongoose.model('File', FileSchema);
module.exports = File;