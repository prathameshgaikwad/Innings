const mongoose = require("mongoose");

const matchPerformanceSchema = new mongoose.Schema({
  match_id: {
    type: mongoose.Types.ObjectId,
    ref: "matches",
  },
  batting_performance: {
    runs_scored: { type: Number, default: 0 },
    balls_faced: { type: Number, default: 0 },
    dismissal: {
      is_dismissed: { type: Boolean, default: false },
      bowler_id: {
        type: mongoose.Types.ObjectId,
        ref: "players",
      },
    },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    strike_rate: { type: mongoose.Types.Decimal128, default: 0.0 },
  },
  bowling_performance: {
    balls_bowled: { type: Number, default: 0 },
    runs_conceded: { type: Number, default: 0 },
    economy: { type: mongoose.Types.Decimal128, default: 0.0 },
    wickets: {
      wickets_taken: { type: Number, default: 0 },
      wicket_log: [
        {
          type: mongoose.Types.ObjectId,
          ref: "wickets",
        },
      ],
    },
    extras: {
      total: { type: Number, default: 0 },
      wides: { type: Number, default: 0 },
      byes: { type: Number, default: 0 },
      leg_byes: { type: Number, default: 0 },
      no_balls: { type: Number, default: 0 },
      penalties: { type: Number, default: 0 },
    },
  },
});

module.exports = { matchPerformanceSchema };
