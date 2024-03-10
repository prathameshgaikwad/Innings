const express = require("express");
const {
  getFixtureDetails,
  createFixturesBatch,
} = require("../controllers/fixtures");

const router = express.Router();

router.get("/:fixtureId", getFixtureDetails);
router.post("/create-batch", createFixturesBatch);

module.exports = router;
