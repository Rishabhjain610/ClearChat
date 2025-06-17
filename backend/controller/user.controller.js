const User = require("../model/User.model");
const getCurrentUser =async (req, res) => {
  try {
    const userID = req.userId; // Assuming userId is set by authCheck middleware
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user=await User.findById(userID).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching user data" });
    
  }
}
module.exports = { getCurrentUser };