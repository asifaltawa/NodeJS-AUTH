const Image = require('../Models/image');
const {uploadToCloudinary} = require('../helper/cloudinaryHelper');
const uploadImage = async (req, res) => {
    try {

        // check if file is present in request
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // upload image to cloudinary

        const {url, publicId} = await uploadToCloudinary(req.file.path);

        // store image details in database
        const newlyUploadedImage = await Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });
        await newlyUploadedImage.save();

        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}
 const fetchImageController = async (req, res) => {
    try {
        const images = await Image.find({});
        if(images){
            return res.status(200).json({
                success: true,
                data: images
            });
        }
        return res.status(200).json({
            success: true,
            images
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }




}
module.exports = {uploadImage, fetchImageController};