const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default: ""
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
