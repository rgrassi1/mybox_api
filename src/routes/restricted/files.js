const router = require('express').Router();
const FileController = require('../../controllers/FileController');

router.delete("/:idFile", FileController.remove);

module.exports = router;