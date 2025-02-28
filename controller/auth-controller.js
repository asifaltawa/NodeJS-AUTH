const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//register controller
const registerUser = async (req, res) => {
    
    try{

        // extract data from request body
        const {username, email, password, role} = req.body;

        // check if user already exists
        let checkExistingUser = await User.findOne({$or: [{username}, {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists with this username or email'});
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        // create new user and save to database
        let newUser = new User({
            username, 
            email, 
            password: hashedPassword,
            role: role ||  'user'
        });
        await newUser.save();

        // newUser.password = undefined;

        if(newUser){

            return res.status(200).json({
                success: true,
                message: 'User registered successfully',
                user:newUser
            });
        }
        else{
            return res.status(400).json({
                success: false,
                message: 'User registration failed'
            });
        }
       
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
};


//login controller

const loginUser = async (req, res) => {
    
    try{

        const {email, password} = req.body;
        // console.log(req.body);

        // find if the current user is exists in database
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not registered'
            });
        }

        // check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username : user.name,
            role: user.role,

        }, process.env.JWT_SECRET_KEY,{
            expiresIn: '15m',
        })

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            accessToken,
            user
        });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
}

// change password controller
const changePassword = async (req, res) => {
    try{
        const userId = req.userInfo.userId;

        // extract old and new password
        const {oldPassword, newPassword} = req.body;

        //find the current loged in user
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }
    

    //check if old password is correct
    
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        });

    }
    if(oldPassword === newPassword){
        return res.status(400).json({
            success: false,
            message: 'New password cannot be same as old password'
        });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // update password in database
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Password changed successfully',
        user
    });
 } catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports = {registerUser, loginUser, changePassword};