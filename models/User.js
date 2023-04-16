const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  nick: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "No aprobado",
  },
  description: {
    type: String,
  },
  notifications_config: {
    type: String,
    default: "all",
  },
  image: {
    type: String,
    default: "default_user_image.png",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", UserSchema, "users");