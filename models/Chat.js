var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  has_new: {
    type: Boolean,
    default: false
  },
  chat: {
    message: String,
    image: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const ChatMessage = mongoose.model("chats", ChatSchema);

module.exports = ChatMessage;
