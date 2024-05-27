const express = require("express");
const {
  getTossResult,
  setTossResult,
  getMatchDetails,
  getDidNotBatPlayers,
} = require("../controllers/matches");

const router = express.Router();

router.get("/:matchId", getMatchDetails);
router.get("/:matchId/toss", getTossResult);
router.get("/:matchId/battingTeam/didNotBat", getDidNotBatPlayers);
router.post("/toss", setTossResult);

module.exports = router;
