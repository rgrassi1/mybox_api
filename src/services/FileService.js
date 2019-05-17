const aws = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const removeFromRepository = async key => {
    if (process.env.STORAGE_TYPE === 's3') {
        const s3 = new aws.S3();
        return await s3.deleteObject({ Bucket: 'mybox-repo', Key: key }).promise();                
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", key);
        )
    }
}

module.exports = { removeFromRepository }