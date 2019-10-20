const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Survey = require('../../models/Survey');


router.get('/test', (req, res) => res.json({ msg: 'Survey Works' }));

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Get fields
    const surveyFields = {};
    surveyFields.user = req.user.id;
    surveyFields.artist = (req.body.artist) ? req.body.artist : '';
    surveyFields.berkat = (req.body.berkat) ? req.body.berkat : '';
    surveyFields.budget = (req.body.budget) ? req.body.budget : '';
    surveyFields.cakes = (req.body.cakes) ? req.body.cakes : ''; 
    surveyFields.comments = (req.body.comments) ? req.body.comments : ''; 
    surveyFields.date = (req.body.date) ? req.body.date : ''; 
    surveyFields.deco = (req.body.deco) ? req.body.deco : '';
    surveyFields.deco_budget = (req.body.deco_budget) ? req.body.deco_budget : ''; 
    surveyFields.duration = (req.body.duration) ? req.body.duration : '';
    surveyFields.hours = (req.body.hours) ? req.body.hours : '';
    surveyFields.outfits = (req.body.outfits) ? req.body.outfits : '';
    surveyFields.outfits_budget = (req.body.outfits_budget) ? req.body.outfits_budget : '';
    surveyFields.pax = (req.body.pax) ? req.body.pax : ''; 
    surveyFields.phone = (req.body.phone) ? req.body.phone : ''; 
    surveyFields.photography = (req.body.photography) ? req.body.photography : ''; 
    surveyFields.photography_budget = (req.body.photography_budget) ? req.body.photography_budget : ''; 
    surveyFields.stylist = (req.body.stylist) ? req.body.stylist : ''; 
    surveyFields.venue = (req.body.venue) ? req.body.venue : ''; 
    surveyFields.videography = (req.body.videography) ? req.body.videography : '';
    surveyFields.videography_budget = (req.body.videography_budget) ? req.body.videography_budget : ''; 

    Survey.findOne({ user: req.user.id }).then(survey => {
      if (survey) {
        // Update
        Survey.findOneAndUpdate(
          { user: req.user.id },
          { $set: surveyFields },
          { new: true }
        ).then(survey => res.json(survey));
      } else {
        // Save Survey
        new Survey(surveyFields).save().then(survey => res.json(survey));
      }
    });
  }
);


module.exports = router;
