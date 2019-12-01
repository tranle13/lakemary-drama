const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePostInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.userId = !isEmpty(data.userId) ? data.userId : "";
  data.userImage = !isEmpty(data.userImage) ? data.userImage : "";
  data.postImage = !isEmpty(data.postImage) ? data.postImage : "";
  data.caption = !isEmpty(data.caption) ? data.caption : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  // // data.date = !isEmpty(data.date) ? data.date : "";
// User checks
  if (Validator.isEmpty(data.userId)) {
    errors.userId = "User is required";
  } else if (Validator.isEmpty(data.userImage)) {
    errors.userImage = "User image is required";
  }
// Post checks
  if (Validator.isEmpty(data.postImage)) {
    errors.postImage = "Post image is required";
  }
  if (Validator.isEmpty(data.caption)) {
    errors.caption = "Caption field is required";
  }
  if (!Validator.isLength(data.caption, { min: 2, max: 120 })) {
    errors.caption = "Caption field must be at least 2 characters";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};