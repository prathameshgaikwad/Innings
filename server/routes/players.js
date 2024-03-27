const express = require("express");
const { getPlayerDetails } = require("../controllers/players");

const router = express.Router();

router.get("/:player_id", getPlayerDetails);

module.exports = router;
