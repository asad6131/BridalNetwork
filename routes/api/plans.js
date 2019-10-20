const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Survey = require('../../models/Survey');

router.get('/test', (req, res) => res.json({ msg: 'Survey Works' }));


router.get('/', (req, res) => {
  Survey.find()
    .sort({ date: -1 })
    .then(survey => res.json(survey))
    .catch(err => res.status(404).json({ noSurveyFound: 'No Survey found' }));
});


module.exports = router;
