const express = require("express");
const {
  getAllFixtures,
  getFixtureDetails,
  createFixturesBatch,
} = require("../controllers/fixtures");

const router = express.Router();

router.get("/:tournamentId/all", getAllFixtures);
router.get("/:fixtureId", getFixtureDetails);
router.post("/create-batch", createFixturesBatch);

module.exports = router;
