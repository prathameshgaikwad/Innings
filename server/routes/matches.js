const express = require("express");
const {
  getTossResult,
  setTossResult,
  getMatchDetails,
} = require("../controllers/matches");

const router = express.Router();

router.get("/:matchId", getMatchDetails);
router.get("/:matchId/getToss", getTossResult);
router.post("/setToss", setTossResult);

module.exports = router;
