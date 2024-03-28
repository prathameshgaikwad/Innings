const express = require("express");
const {
  getJoinedTournaments,
  getCreatedTournaments,
  getLatestTournamentDetails,
} = require("../controllers/user");

const router = express.Router();

router.get("/:userId/joined-tournaments", getJoinedTournaments);
router.get("/:userId/created-tournaments", getCreatedTournaments);
router.get("/:userId/latest-tournament", getLatestTournamentDetails);

module.exports = router;
