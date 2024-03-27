const express = require("express");
const {
  getTossResult,
  setTossResult,
  getMatchDetails,
} = require("../controllers/matches");

const router = express.Router();

router.get("/:match_id", getMatchDetails);
router.get("/:match_id/toss", getTossResult);
router.post("/toss", setTossResult);

module.exports = router;
