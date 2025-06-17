const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const genToken = async (userID) => {
  try {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};
module.exports = { genToken };
