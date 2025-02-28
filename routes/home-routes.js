const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

router.get('/welcome' , authMiddleware, (req,res) => {
    const {userId, username, role} = req.userInfo;
    res.status(200).json({
        messege : "welcome to the home page",
        user : {
           _id :  userId, 
            username, 
            role
        }
    })
    
})

module.exports = router;