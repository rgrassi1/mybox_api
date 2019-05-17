const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const router = express.Router();

const indexRouter = ({ io }) => {

    const BoxController = require('./controllers/BoxController');    
    const FileController = require('./controllers/FileController')({ io });

    io.on('connect', socket => {
        const { match } = socket.handshake.query
        if (match) {
            socket.join(`user-${match}`);
        }    
    })

    router.get("/boxes", BoxController.showAll);
    router.post("/boxes", BoxController.store);
    router.get("/boxes/:id", BoxController.show);
    
    router.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);
    router.delete("/files/:idFile", FileController.remove);

    return router;
}

module.exports = indexRouter;