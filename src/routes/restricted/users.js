const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../../config/multer');
const UserController = require('../../controllers/UserController');

router.post('/:id/avatar', multer(multerConfig).single('file'), UserController.updateAvatar);

module.exports = router;