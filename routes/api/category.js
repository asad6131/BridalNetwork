const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Categories = require('../../models/Categories');
// Validation
const validateCategoryInput = require('../../validation/category');

router.get('/test', (req, res) => res.json({ msg: 'Category Works' }));

// @route   GET api/category
// @desc    Get category
// @access  Public
router.get('/', (req, res) => {
  Categories.find()
    .sort({ date: -1 })
    .then(categories => res.json(categories))
    .catch(err => res.status(404).json({ noCategoriesFound: 'No Categories found' }));
});

// @route   GET api/category/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Categories.findById(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.status(404).json({ noCategoriesFound: 'No Category found' }));
});

// @route   POST api/category
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newCategory = new Categories({
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    Categories.findOne({ name: req.body.name }).then(cat => {
      if (cat) {
        errors.name = 'That category already exists';
        res.status(400).json(errors);
      } else {
        newCategory.save().then(categories => res.json(categories));
      }
    });
  }
);

// @route   DELETE api/category/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Categories.findById(req.params.id)
        .then(category => {
          // Check for category owner
          if (category.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }
          // Delete
          category.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ noCategoriesFound: 'No Category found' }));
  }
);

router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Get fields
    const categoryFields = {};
    if (req.body.title) categoryFields.name = req.body.title;
    if (req.body.avatar) categoryFields.avatar = req.body.avatar;

    Categories.findOneAndUpdate(
      { _id: req.body.id },
      { $set: categoryFields },
      { new: true }
    ).then(category => res.json(category));
  }
);

module.exports = router;
