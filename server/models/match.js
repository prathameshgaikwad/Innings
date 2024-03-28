const mongoose = require("mongoose");
const { matchSchema } = require("./schemas/matchSchema");

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
