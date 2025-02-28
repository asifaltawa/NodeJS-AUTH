const express = require('express');
const router = express.Router();
const  authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const upload = require('../middleware/uploadMiddleware');
const {uploadImage, fetchImageController} = require('../controller/imageController');

// upload image
router.post('/upload', authMiddleware, adminMiddleware, upload.single("image"), uploadImage);


// to get all images

router.get('/get',authMiddleware, fetchImageController);
module.exports = router;