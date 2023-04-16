const { Schema, model } = require("mongoose");

const RequestSchema = Schema({
  created_at: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "created",
  },
  reply: String,
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  admin: {
    type: Schema.ObjectId,
    ref: "Admin",
  },
  repository: {
    type: Schema.ObjectId,
    ref: "Repository",
  },
});

module.exports = model("Request", RequestSchema, "requests");
