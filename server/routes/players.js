const express = require("express");
const { getPlayerDetails } = require("../controllers/players");

const router = express.Router();

router.get("/:playerId", getPlayerDetails);

module.exports = router;
