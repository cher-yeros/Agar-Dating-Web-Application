const express = require("express");
const MatchController = require("../controllers/matchController");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
router.post("/add-criteria", authMiddleware, MatchController.addMatchCriteria);
router.post("/get-suggestion", authMiddleware, MatchController.getSuggestion);
router.post(
  "/create-suggestion",
  authMiddleware,
  MatchController.createSuggestion
);
router.post("/get-matches", authMiddleware, MatchController.getMatches);
router.post("/get-my-partner", authMiddleware, MatchController.getMyPartner);

module.exports = router;
