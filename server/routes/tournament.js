const express = require("express");
const {
  createTournament,
  getTournamentDetails,
  getFeaturedTournaments,
  joinTournament,
  getPointsTable,
  getLiveMatchDetails,
  getUpcomingMatches,
  getCompletedMatches,
  getAllTeams,
  getAllFixtures,
} = require("../controllers/tournament");

const router = express.Router();

router.get("/featured", getFeaturedTournaments);
router.get("/:tournament_id", getTournamentDetails);
router.get("/:tournament_id/live", getLiveMatchDetails);
router.get("/:tournament_id/upcoming-matches", getUpcomingMatches);
router.get("/:tournament_id/completed-matches", getCompletedMatches);
router.get("/:tournament_id/teams", getAllTeams);
router.get("/:tournament_id/fixtures", getAllFixtures);
router.get("/:tournament_id/points-table", getPointsTable);
router.post("/create", createTournament);
router.post("/join", joinTournament);

module.exports = router;
