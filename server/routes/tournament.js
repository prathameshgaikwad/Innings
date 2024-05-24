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
const cache = require("../middleware/cache");

const router = express.Router();

router.get("/featured", getFeaturedTournaments);
router.get(
  "/:tournamentId",
  cache((req) => `tournament:${req.params.tournamentId}`),
  getTournamentDetails
);
router.get("/:tournamentId/live", getLiveMatchDetails);
router.get("/:tournamentId/upcoming-matches", getUpcomingMatches);
router.get("/:tournamentId/completed-matches", getCompletedMatches);
router.get("/:tournamentId/teams", getAllTeams);
router.get(
  "/:tournamentId/fixtures",
  cache((req) => `fixtures:${req.params.tournamentId}`),
  getAllFixtures
);
router.get("/:tournamentId/points-table", getPointsTable);
router.post("/create", createTournament);
router.post("/join", joinTournament);

module.exports = router;
