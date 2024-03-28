const mongoose = require("mongoose");

const battingLogSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  batsman_id: {
    type: mongoose.Types.ObjectId,
    ref: "players",
  },
  runs_scored: { type: Number },
  balls_faced: { type: Number },
  fours: { type: Number },
  sixes: { type: Number },
  strike_rate: { type: mongoose.Types.Decimal128 },
  wicket: {
    isDismissed: { type: Boolean },
    _id: {
      type: mongoose.Types.ObjectId,
      ref: "wickets",
    },
  },
});

module.exports = { battingLogSchema };
