const express = require("express");
const router = express.Router();

const repositoryController = require("../controllers/repository.js");
const check = require("../middlewares/auth.js");

router.post("/create", check.auth, repositoryController.create);

module.exports = router;
