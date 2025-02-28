const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

const express = require('express');
const router = express.Router();

router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Welcome to the admin page'
    });
});

module.exports = router;