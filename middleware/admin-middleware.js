

const isAdmin = (req, res, next) => {
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({
            success: false,
            message: 'You are not authorized to access this page'
        });
    }
    next();
}


module.exports = isAdmin;