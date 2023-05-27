const User = require("../models/User.js");
const Repository = require("../models/Repository.js");
// eslint-disable-next-line no-unused-vars
const pagination = require("mongoose-pagination");
const { validateRepository } = require("../helpers/validation.js");

//create a new Repository
const create = async (req, res) => {
  let identifiedUser = req.user;
  let repositoryData = req.body;

  //validate comment data
  let isValidRepository = validateRepository(repositoryData);
  if (!isValidRepository) {
    return res.send({
      status: "error",
      message: "Invalid comment",
    });
  }

  repositoryData.user = identifiedUser.id;

  let repository = new Repository(repositoryData);
  repository
    .save()
    .then(() => {
      return res.send({
        status: "success",
        message: "repository saved successfully",
      });
    })
    .catch(() => {
      return res.send({
        status: "error",
        message: "couldn't save repository",
      });
    });
};

module.exports = {
  create,
};
