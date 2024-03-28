const mongoose = require("mongoose");
const { playerSchema } = require("./schemas/playerSchema");

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
