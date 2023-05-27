const { validateComment } = require("../helpers/validation.js");
const Comment = require("../models/Comment.js");
const Repository = require("../models/Repository.js");
// eslint-disable-next-line no-unused-vars
const pagination = require("mongoose-pagination");

//create a new comment
const create = async (req, res) => {
  let identifiedUser = req.user;
  let commentData = req.body;

  //validate comment data
  let isValidComment = validateComment(commentData);
  if (!isValidComment) {
    return res.send({
      status: "error",
      message: "Invalid comment",
    });
  }

  commentData.user = identifiedUser.id;

  try {
    let repo = await Repository.findById(commentData.repository);
    if (!repo) {
      return res.send({
        status: "error",
        message: "Repository not found",
      });
    }
  } catch {
    return res.send({
      status: "error",
      message: "Invalid repository",
    });
  }

  let comment = new Comment(commentData);
  comment
    .save()
    .then(() => {
      return res.send({
        status: "success",
        message: "comment saved successfully",
      });
    })
    .catch(() => {
      return res.send({
        status: "error",
        message: "couldn't save comment",
      });
    });
};

//list comments of a given repository
const list = (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //find, sort and paginate comments
  Comment.find({ repository: req.params.repository })
    .sort({ rate: "desc" })
    .select({
      _id: false,
      repository: false,
    })
    .populate({
      path: "user",
      select: "nick image",
    })
    .paginate(page, itemsPerPage)
    .then((Comments) => {
      if (!Comments) {
        return res.status(404).send({
          status: "error",
          message: "no comments found",
        });
      }

      //count documents and send response
      Comment.count()
        .then((total) => {
          return res.status(200).send({
            status: "success",
            page,
            itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage),
            Comments,
          });
        })
        .catch(() => {
          return res.status(500).send({
            status: "error",
            message: "Error while counting comments",
          });
        });
    })
    .catch(() => {
      return res.status(500).send({
        status: "error",
        message: "couldn't find any comment",
      });
    });
};

module.exports = {
  list,
  create,
};
