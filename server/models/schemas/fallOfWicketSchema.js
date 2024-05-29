const mongoose = require("mongoose");

const fallOfWicketSchema = new mongoose.Schema({
  bowler_id: {
    type: mongoose.Types.ObjectId,
    ref: "players",
  },
  on_strike_batsman_id: {
    type: mongoose.Types.ObjectId,
    ref: "players",
  },
  wicket_number: { type: Number },
  over: { type: Number },
  ball: { type: Number },
  total_runs: { type: Number },
  dismissal_comment: { type: String },
});

module.exports = { fallOfWicketSchema };
