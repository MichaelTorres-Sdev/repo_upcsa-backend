const express = require("express");
const router = express.Router();

const repositoryController = require("../controllers/repository.js");
const check = require("../middlewares/auth.js");

router.get("/get/:id", check.auth, repositoryController.getRepository);
router.get(
  "/getRepo/:id",
  check.auth,
  repositoryController.getPublicRepository
);
router.post("/create", check.auth, repositoryController.create);
router.get("/listByDate/:page?", check.auth, repositoryController.listByDate);
router.get("/listByName/:page?", check.auth, repositoryController.listByName);
router.get("/listByRate:page?", check.auth, repositoryController.listByRate);
router.get(
  "/listPending:page?",
  check.auth,
  repositoryController.listPendingOnes
);
module.exports = router;
