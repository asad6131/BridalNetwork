const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContactsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Contacts = mongoose.model("contacts", ContactsSchema);
