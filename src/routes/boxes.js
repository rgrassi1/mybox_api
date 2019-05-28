const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const BoxController = require('../controllers/BoxController');    
const FileController = require('../controllers/FileController');    

router.get("/", BoxController.showAll);
router.post("/", BoxController.store);
router.get("/:id", BoxController.show);
router.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);

module.exports = router;