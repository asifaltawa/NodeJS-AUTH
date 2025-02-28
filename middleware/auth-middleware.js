
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
   const authHeader = req.header("Authorization");
   const token = authHeader && authHeader.split(" ")[1];
   console.log(token);
   if(!token){
       return res.status(404).json({
           success: false,
           message: 'Access token not found'
       });
   }


   // decode this username
   let decodedInfo;
   try{
     decodedInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
   }catch(err){
    return res.status(401).json({
        success: false,
        message: 'Token is Invalid or expired'
    });
}
    console.log(decodedInfo);
    req.userInfo = decodedInfo;
    next();
}

module.exports = authMiddleware;