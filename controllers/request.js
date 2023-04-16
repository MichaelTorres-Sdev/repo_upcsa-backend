const Request = require("../models/Request.js");

const test = (req, res) => {
  return res.send("success");
};

module.exports = {
  test,
};
