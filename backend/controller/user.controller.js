const User = require("../model/User.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const getCurrentUser = async (req, res) => {
  try {
    const userID = req.userId; // Assuming userId is set by authCheck middleware
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userID).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching user data" });
  }
};


const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    // Build update object dynamically
    const updateData = { name };
    if (image) updateData.image = image;

    const user = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating profile" });
  }
};

const getOtherUser=async(req,res)=>{
  try {
    const user =await User.find({
      _id: { $ne: req.userId }, // Exclude current user
    }).select("-password"); // Exclude password field
    return res.status(200).json({ user:user });
  } catch (error) {
   
    return res.status(500).json({ message: "Error fetching other user data" });
    
  }
}
module.exports = { getCurrentUser, editProfile, getOtherUser };
