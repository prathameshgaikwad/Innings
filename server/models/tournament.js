const mongoose = require("mongoose");
const { tournamentSchema } = require("./schemas/tournamentSchema");

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
