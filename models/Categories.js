const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  prices: [
    {
      name: {
        type: String
      },
      options: [
        {
          min: {
            type: String
          },
          max: {
            type: String
          }
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("categories", CategorySchema);
