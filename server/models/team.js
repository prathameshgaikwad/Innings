const mongoose = require("mongoose");
const { teamSchema } = require("./schemas/teamSchema");

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
