const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const BoxController = require('./controllers/BoxController');

const router = express.Router();

const indexRouter = ({ io }) => {

    const FileController = require('./controllers/FileController')({ io });

    io.on('connect', socket => {
        const { match } = socket.handshake.query
        if (match) {
            console.log('user connected on match', match);
            socket.join(`user-${match}`);
        }    
    })

    router.get("/boxes", BoxController.showAll);
    router.post("/boxes", BoxController.store);
    router.get("/boxes/:id", BoxController.show);
    
    router.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);
    router.delete("/boxes/:idBox/files/:idFile", FileController.remove);

    return router;
}


module.exports = indexRouter;