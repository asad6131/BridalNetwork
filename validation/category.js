const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategoryInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 5, max: 100 })) {
    errors.name = 'Category must be between 5 and 100 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Category field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
