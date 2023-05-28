const express = require("express");
const router = express.Router();

const repositoryController = require("../controllers/repository.js");
const check = require("../middlewares/auth.js");

router.post("/create", check.auth, repositoryController.create);
router.get("/listByDate/:page?", check.auth, repositoryController.listByDate);
router.get("/listByName/:page?", check.auth, repositoryController.listByName);
router.get("/listByRate:page?", check.auth, repositoryController.listByRate);
router.get(
  "/listPending:page?",
  check.auth,
  repositoryController.listPendingOnes
);
router.put("/changeState", check.auth, repositoryController.changeState);
module.exports = router;
