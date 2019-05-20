const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const BoxController = require('./controllers/BoxController');    
const FileController = require('./controllers/FileController');

router.get("/boxes", BoxController.showAll);
router.post("/boxes", BoxController.store);
router.get("/boxes/:id", BoxController.show);

router.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);
router.delete("/files/:idFile", FileController.remove);

module.exports = router;