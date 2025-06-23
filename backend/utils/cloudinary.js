const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  if (!filepath) return null;
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: "clearchat-profile",
      
    });
    fs.unlinkSync(filepath); // Remove local file after upload
    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

module.exports = { uploadOnCloudinary };