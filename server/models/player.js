const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  team_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide the team id"],
    ref: "teams",
  },
  tournament_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide the tournament id"],
    ref: "tournaments",
  },
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
  },
  debut: {
    type: Date,
    required: [true, "Debut date is required"],
  },
  picture_url: { type: String },
  statistics: {
    matches: { type: Number },
    runs: { type: Number },
    strike_rate: { type: mongoose.Types.Decimal128 },
    average: { type: mongoose.Types.Decimal128 },
    highest_score: { type: Number },
    fifties: { type: Number },
    hundreds: { type: Number },
    fours: { type: Number },
    sixes: { type: Number },
    wickets: { type: Number },
    economy: { type: mongoose.Types.Decimal128 },
  },
});

module.exports = mongoose.model("Player", playerSchema);
