const Message = require("../model/message.model");
const Conversation = require("../model/conversation.model");


const { uploadOnCloudinary } = require("../utils/cloudinary");
const { getReceiverSocketId,io } = require("../socket/socket"); // Import the function to get receiver's socket ID
// Controller to handle sending a message
const sendMessage = async (req, res) => {
  try {
    const sender = req.userId; // Get sender's user ID from the authenticated request
    const { receiver } = req.params; // Get receiver's user ID from the route parameters
    const { message } = req.body; // Get the message text from the request body
    let image = ""; // Initialize image as empty string

    // If an image file is attached, upload it to Cloudinary
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      image = uploadResult; // Store the upload result (should be a URL or object)
    }

    // Find an existing conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }, // Checks for both participants dekhega //checks if both sender and receiver are in the participants array
    });

    // Create a new message document
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    // If conversation doesn't exist, create a new one with this message
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      // If conversation exists, add the new message to it
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    const receiverSocketId = getReceiverSocketId(receiver);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", {
        newMessage,   
     
      });       
    }
    // Respond with the newly created message
    return res.status(201).json({
      newMessage,
    });
    
  } catch (error) {
    // Log and respond with error if something goes wrong
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all messages between the authenticated user and another user
const getMessages = async (req, res) => {
  try {
    const sender = req.userId; // Get sender's user ID from the authenticated request
    const { receiver } = req.params; // Get receiver's user ID from the route parameters

    // Find the conversation between sender and receiver and populate messages
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    // If no conversation exists, return 404
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Respond with the array of messages in the conversation
    return res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    // Log and respond with error if something goes wrong
    console.log("Error in getMessages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Export the controller functions for use in routes
module.exports = {
  sendMessage,
  getMessages,
}