const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String
  },
  berkat: {
    type: String
  },
  cakes: {
    type: String
  },
  stylist: {
    type: String
  },
  heena: {
    type: String
  },
  searchviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  price: [
    {
      name: {
        type: String
      },
      min: {
        type: String
      },
      max: {
        type: String
      }
    }
  ],
  website: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  brochure: {
    type: String
  },
  instagram: {
    type: String
  },
  slider: [
    {
      img: {
        type: String,
        required: true
      },
      tags: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  views: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  featured: {
    type: Boolean,
    default: false
  },
  top: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  msg: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("vendor", VendorSchema);
