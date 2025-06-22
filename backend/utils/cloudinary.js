const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const uploadOnCloudinary = async (filepath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });
  try {
    if (!filepath) {
      return res.status(400).json({ message: "File path is required" });
    }
    const uploadResult = await cloudinary.uploader.upload(filepath, {
      folder: "ClearChat",
    });
    fs.unlinkSync(filepath); // Delete the file after upload
    return uploadResult.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    fs.unlinkSync(filepath); // Delete the file in case of error
    console.error("Error uploading to Cloudinary:", error);
  }
};
module.exports = uploadOnCloudinary;
