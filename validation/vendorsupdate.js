const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVendorInputUpdate(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.instagram = !isEmpty(data.instagram) ? data.instagram : "";
  data.website = !isEmpty(data.website) ? data.website : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.artist = !isEmpty(data.artist) ? data.artist : "";
  data.berkat = !isEmpty(data.berkat) ? data.berkat : "";
  data.cakes = !isEmpty(data.cakes) ? data.cakes : "";
  data.stylist = !isEmpty(data.stylist) ? data.stylist : "";
  data.makeup = !isEmpty(data.makeup) ? data.makeup : "";
  data.bridal = !isEmpty(data.bridal) ? data.bridal : "";
  data.outfits14 = !isEmpty(data.outfits14) ? data.outfits14 : "";
  data.outfits17 = !isEmpty(data.outfits17) ? data.outfits17 : "";
  data.outfits2 = !isEmpty(data.outfits2) ? data.outfits2 : "";
  data.outfits3 = !isEmpty(data.outfits3) ? data.outfits3 : "";
  data.outfits4 = !isEmpty(data.outfits4) ? data.outfits4 : "";
  data.photography = !isEmpty(data.photography) ? data.photography : "";
  data.event4 = !isEmpty(data.event4) ? data.event4 : "";
  data.event8 = !isEmpty(data.event8) ? data.event8 : "";
  data.eventout10 = !isEmpty(data.eventout10) ? data.eventout10 : "";
  data.preeventout = !isEmpty(data.preeventout) ? data.preeventout : "";
  data.videography = !isEmpty(data.videography) ? data.videography : "";
  data.event4video = !isEmpty(data.event4video) ? data.event4video : "";
  data.event8video = !isEmpty(data.event8video) ? data.event8video : "";
  data.eventout10video = !isEmpty(data.eventout10video)
    ? data.eventout10video
    : "";
  data.preeventoutvideo = !isEmpty(data.preeventoutvideo)
    ? data.preeventoutvideo
    : "";
  data.catering = !isEmpty(data.catering) ? data.catering : "";
  data.fcatering = !isEmpty(data.fcatering) ? data.fcatering : "";
  data.fwcatering = !isEmpty(data.fwcatering) ? data.fwcatering : "";
  // console.log(data);

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  if (!Validator.isEmpty(data.category)) {
    if (data.category == "5cfe717427ef3e0844de5cf5") {
      if (Validator.isEmpty(data.event4)) {
        errors.event4 = "This field is required";
      }
      if (Validator.isEmpty(data.event8)) {
        errors.event8 = "This field is required";
      }
      if (Validator.isEmpty(data.eventout10)) {
        errors.eventout10 = "This field is required";
      }
      if (Validator.isEmpty(data.preeventout)) {
        errors.preeventout = "This field is required";
      }
    }
    if (data.category == "5cfe718627ef3e0844de5cf6") {
      if (Validator.isEmpty(data.outfits14)) {
        errors.outfits14 = "This field is required";
      }
      if (Validator.isEmpty(data.outfits17)) {
        errors.outfits17 = "This field is required";
      }
      if (Validator.isEmpty(data.outfits2)) {
        errors.outfits2 = "This field is required";
      }
      if (Validator.isEmpty(data.outfits3)) {
        errors.outfits3 = "This field is required";
      }
      if (Validator.isEmpty(data.outfits4)) {
        errors.outfits4 = "This field is required";
      }
    }
    if (data.category == "5cfe71a727ef3e0844de5cf7") {
      if (Validator.isEmpty(data.event4video)) {
        errors.event4video = "This field is required";
      }
      if (Validator.isEmpty(data.event8video)) {
        errors.event8video = "This field is required";
      }
      if (Validator.isEmpty(data.eventout10video)) {
        errors.eventout10video = "This field is required";
      }
      if (Validator.isEmpty(data.preeventoutvideo)) {
        errors.preeventoutvideo = "This field is required";
      }
    }
    if (data.category == "5cfe71b627ef3e0844de5cf8") {
      if (Validator.isEmpty(data.fcatering)) {
        errors.fcatering = "This field is required";
      }
      if (Validator.isEmpty(data.fwcatering)) {
        errors.fwcatering = "This field is required";
      }
    }
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
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
