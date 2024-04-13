const mongoose = require("mongoose");
const { matchPerformanceSchema } = require("./matchPerformanceSchema");

const playerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  team_id: {
    type: mongoose.Types.ObjectId,
    ref: "teams",
  },
  tournament_id: {
    type: mongoose.Types.ObjectId,
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
    matches: { type: Number, default: 0 },
    total_runs: { type: Number, default: 0 },
    strike_rate: { type: mongoose.Types.Decimal128, default: 0.0 },
    average: { type: mongoose.Types.Decimal128, default: 0.0 },
    highest_score: {
      runs: {
        type: Number,
        default: 0,
      },
      dismissed: { type: Boolean },
    },
    fifties: { type: Number, default: 0 },
    hundreds: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    total_dismissals: { type: Number, default: 0 },
    balls_faced: { type: Number, default: 0 },
    wickets_taken: { type: Number, default: 0 },
    maidens: { type: Number, default: 0 },
    economy: { type: mongoose.Types.Decimal128, default: 0.0 },
  },
  match_performances: [matchPerformanceSchema],
});

module.exports = { playerSchema };
