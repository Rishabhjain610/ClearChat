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

const getOtherUser = async (req, res) => {
  try {
    const user = await User.find({
      _id: { $ne: req.userId }, // Exclude current user
    }).select("-password"); // Exclude password field
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching other user data" });
  }
};

const searchUser = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }
    const users = await User.find({
      // $and: Logical AND operator - ALL conditions inside must be true
      $and: [
        // $ne: "Not Equal" operator - excludes documents where _id equals req.userId
        { _id: { $ne: req.userId } }, // ✅ Exclude current user from results

        // $or: Logical OR operator - AT LEAST ONE condition inside must be true
        {
          $or: [
            // $regex: Regular expression pattern matching operator
            // $options: "i" makes the regex case-insensitive (ignores upper/lower case)
            { name: { $regex: query, $options: "i" } }, // ✅ Search in name field (case-insensitive)
            { username: { $regex: query, $options: "i" } }, // ✅ Search in username field (case-insensitive)
          ],
        },
      ],
    }).select("-password"); // - (minus) excludes the password field from results
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user data" });
  }
};
module.exports = { getCurrentUser, editProfile, getOtherUser, searchUser };
