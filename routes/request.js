const express = require("express");
const router = express.Router();

const requestController = require("../controllers/request.js");

router.get("/test", requestController.test);

module.exports = router;
