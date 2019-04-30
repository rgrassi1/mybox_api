const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

const router = express.Router();

const indexRouter = io => {
    router.get("/boxes", BoxController.showAll);
    router.post("/boxes", BoxController.store);
    router.get("/boxes/:id", BoxController.show);
    
    router.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);
    router.delete("/boxes/:idBox/files/:idFile", FileController.remove);

    return router;
}


module.exports = indexRouter;