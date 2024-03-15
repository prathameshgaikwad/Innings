const express = require("express");
const {
  getTossResult,
  setTossResult,
  getMatchDetails,
} = require("../controllers/matches");

const router = express.Router();

router.get("/:matchId", getMatchDetails);
router.get("/:matchId/toss", getTossResult);
router.post("/toss", setTossResult);

module.exports = router;
