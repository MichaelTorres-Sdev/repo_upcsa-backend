const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const validate = require("../helpers/validation.js");
const jwt = require("../helpers/jwt.js");
const fs = require("fs");
const path = require("path");

//login
const login = async (req, res) => {
  //get the params
  let params = req.body;

  //validate data
  if (!params.email || !params.password) {
    return res
      .status(400)
      .send({ status: "error", message: "password and email are required" });
  }

  //find the user in the database
  try {
    let user = await User.findOne({
      email: params.email,
    });

    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "user does not exist",
      });
    }

    //check password
    const pwd = bcrypt.compareSync(params.password, user.password);

    if (!pwd) {
      return res.status(400).send({
        status: "error",
        message: "incorrect password",
      });
    }

    //get JWT token
    const token = jwt.createToken(user);

    //return token
    return res.status(200).send({
      status: "success",
      token,
    });
  } catch {
    return res.status(400).send({
      status: "error",
      message: "error finding user",
    });
  }
};

//get profile
const profile = (req, res) => {
  //get user id from params
  const userId = req.params.id;

  //get profile data
  User.findById(userId)
    .select({
      password: false,
      role: false,
      email: false,
      __v: false,
      _id: false,
      notifications_config: false,
    })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          status: "error",
          message: "user does not exist",
        });
      }

      return res.status(200).send({
        status: "success",
        user,
      });
    })
    .catch(() => {
      return res.status(400).send({
        status: "error",
        message: "error finding user",
      });
    });
};

//update identified user
const update = async (req, res) => {
  //get user data
  let identifiedUser = req.user;

  //get data to update
  let userToUpdate = req.body;

  //make sure user only can modify modifiable data and validate userToUpdate data
  let isValid = await validate.validateData(userToUpdate);
  if (!isValid) {
    return res.send({
      status: "error",
      message: "couldn't validate user data",
    });
  }
  //check if user exists
  try {
    let users = await User.find({
      $or: [{ email: userToUpdate.email }, { nick: userToUpdate.nick }],
    });

    //check if user to update is the identified user
    let userIsSet = false;

    users.forEach((user) => {
      if (user && user._id != identifiedUser.id) userIsSet = true;
    });

    if (userIsSet) {
      return res.status(200).send({
        status: "success",
        message: "user already exists",
      });
    }
  } catch {
    return res.status(500).send({
      status: "error",
      message: "error getting user",
    });
  }

  //crypt password if it is gotten (it is, because is required, otherwise an error had occurred during validation)
  if (userToUpdate.password) {
    let pwd = await bcrypt.hash(userToUpdate.password, 14);
    userToUpdate.password = pwd;
  } else {
    delete userToUpdate.password;
  }

  //update user
  try {
    let updatedUser = await User.findByIdAndUpdate(
      { _id: identifiedUser.id },
      userToUpdate,
      { new: true }
    ).select({
      _id: false,
      password: false,
      role: false,
    });

    if (!updatedUser) {
      return res.status(500).send({
        status: "error",
        message: "error updating user",
      });
    }

    //return response
    return res.status(200).send({
      status: "success",
      message: "user updated successfully",
      updatedUser,
    });
  } catch {
    return res.status(500).send({
      status: "error",
      message: "error updating user",
    });
  }
};

//get user image
const avatar = (req, res) => {
  if (!req.params.file) {
    return res
      .status(400)
      .send({ status: "error", message: "image name not received" });
  }

  //get params
  const file = req.params.file;

  //show image path
  const filePath = "./uploads/avatars/" + file;

  //check if file exists
  fs.stat(filePath, (error, exists) => {
    if (!exists || error) {
      return res
        .status(404)
        .send({ status: "error", message: "couldn't get image" });
    }
  });

  //return image
  return res.sendFile(path.resolve(filePath));
};

module.exports = {
  login,
  profile,
  update,
  avatar,
};
