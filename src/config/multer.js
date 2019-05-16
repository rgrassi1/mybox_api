const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws');
const multerS3 = require('multer-s3');

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'mybox-repo',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),  
    storage: storageTypes['local'], 
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}
