const express = require("express");
const { getTeam, createTeam } = require("../controllers/teams");

const router = express.Router();

router.get("/:teamId", getTeam);
router.post("/create", createTeam);

module.exports = router;
