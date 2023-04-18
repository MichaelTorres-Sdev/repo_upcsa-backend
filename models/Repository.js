const { Schema, model } = require("mongoose");

const RepositorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    deafult: "en revisión",
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Repository", RepositorySchema, "repositories");
