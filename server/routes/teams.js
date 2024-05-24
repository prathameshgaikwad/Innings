const express = require("express");
const { getTeam, createTeam } = require("../controllers/teams");
const cache = require("../middleware/cache");

const router = express.Router();

router.get(
  "/:teamId",
  cache((req) => `team:${req.params.teamId}`),
  getTeam
);
router.post("/create", createTeam);

module.exports = router;
