const cloudinary = require('../config/cloudinary');
const fs = require("fs");
const uploadToCloudinary = async (file) => {
    try {
        console.log(file);
        let result = await cloudinary.uploader.upload(file);
        fs.unlinkSync(file)
        return {
            url: result.secure_url,
            publicId: result.public_id
        }; 
        
    } catch (error) {
        throw new Error(error);
    }
} 

module.exports = {uploadToCloudinary};