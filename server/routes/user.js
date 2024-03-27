const express = require("express");
const {
  getJoinedTournaments,
  getCreatedTournaments,
  getLatestTournamentDetails,
} = require("../controllers/user");

const router = express.Router();

router.get("/:user_id/joined-tournaments", getJoinedTournaments);
router.get("/:user_id/created-tournaments", getCreatedTournaments);
router.get("/:user_id/latest-tournament", getLatestTournamentDetails);

module.exports = router;
