const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  if (!Validator.isLength(data.handle, { min: 5, max: 30 })) {
    errors.handle = "Username needs to between 5 and 30 characters";
  }

  if (!Validator.isAlpha(data.handle)) {
    errors.handle = "Vendor username should be alphabets only";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Vendor username is required";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = "Description field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
