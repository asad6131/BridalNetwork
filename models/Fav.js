const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FavSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "vendor"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Fav = mongoose.model("favs", FavSchema);
