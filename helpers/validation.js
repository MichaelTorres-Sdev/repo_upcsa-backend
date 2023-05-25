const validator = require("validator");
const fs = require("fs");

const validateParams = (params) => {
  const allowedKeys = [
    "email",
    "nick",
    "password",
    "notifications_config",
    "description",
    "image",
  ];

  const result = Object.keys(params).every((key) => allowedKeys.includes(key));

  return result;
};

const validateData = async (params) => {
  if (!validateParams(params)) {
    console.log("invalid key detected");
    return false;
  }

  let password = validator.isStrongPassword(params.password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  });
  let email =
    !validator.isEmpty(params.email) && validator.isEmail(params.email);
  let nick =
    !validator.isEmpty(params.nick) &&
    validator.isLength(params.nick, { min: 3, max: undefined });

  let notifications = true;
  if (params.notifications_config) {
    notifications =
      params.notifications_config === "all" ||
      params.notifications_config === "none"
        ? true
        : false;
  }

  let image = true;

  let validateImage = new Promise((resolve) => {
    const filePath = "./uploads/avatars/" + params.image;

    //check if file exists
    fs.stat(filePath, (error, exists) => {
      if (exists && !error) {
        resolve(true);
      }
      if (error || !exists) {
        resolve(false);
      }
    });
  });

  try {
    if (params.image) {
      image = await validateImage;
    }
    if (!password || !email || !nick || !notifications || !image) {
      return false;
    }
    return true;
  } catch {
    console.log("error getting image");
  }
};

module.exports = { validateData, validateParams };
