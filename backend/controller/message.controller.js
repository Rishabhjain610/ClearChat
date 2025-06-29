const Message = require("../model/message.model");
const Conversation = require("../model/conversation.model");
const User = require("../model/user.model");

const { uploadOnCloudinary } = require("../utils/cloudinary");
const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;
    let image = "";
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      image = uploadResult; // Assuming the uploadOnCloudinary function returns an object with a url property
    }
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }, //past message check karega
    });
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    return res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    return res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    console.log("Error in getMessages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  sendMessage,
  getMessages,
};
