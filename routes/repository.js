const express = require("express");
const router = express.Router();

const repositoryController = require("../controllers/repository.js");

router.get("/test", repositoryController.test);

module.exports = router;
