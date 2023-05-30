const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth.js");

const adminController = require("../controllers/admin.js");

router.post("/login", adminController.login);
router.get("/profile/:id", check.auth, adminController.profile);
router.put("/update", check.auth, adminController.update);
router.get("/avatar/:file", check.auth, adminController.avatar);
router.post("/reply", check.auth, adminController.replyRequest);

module.exports = router;
