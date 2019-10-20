const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SurveySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  artist: {
      type: String,
      required: true,
  },
  berkat: {
      type: String,
      required: true,
  },
  budget: {
      type: String,
      required: true,
  },
  cakes: {
      type: String,
      required: true,
  },
  comments: {
      type: String,
      required: true,
  },
  date: {
      type: String,
      required: true,
  },
  deco: {
      type: String,
      required: true,
  },
  deco_budget: {
      type: String,
      required: true,
  },
  duration: {
      type: String,
      required: true,
  },
  hours: {
      type: String,
      required: true,
  },
  outfits: {
      type: String,
      required: true,
  },
  outfits_budget: {
      type: String,
      required: true,
  },
  pax: {
      type: String,
      required: true,
  },
  phone: {
      type: String,
      required: true,
  },
  photography: {
      type: String,
      required: true,
  },
  photography_budget: {
      type: String,
      required: true,
  },
  stylist: {
      type: String,
      required: true,
  },
  venue: {
      type: String,
      required: true,
  },
  videography: {
      type: String,
      required: true,
  },
  videography_budget: {
      type: String,
      required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('Survey', SurveySchema);
