const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment.js");

router.get("/test", commentController.test);

module.exports = router;
