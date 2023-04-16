const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.js");

router.get("/test", adminController.test);

module.exports = router;
