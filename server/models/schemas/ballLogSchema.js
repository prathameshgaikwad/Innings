const mongoose = require("mongoose");

const ballLogSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  bowler_id: {
    type: mongoose.Types.ObjectId,
    ref: "players",
  },
  batsman_id: {
    type: mongoose.Types.ObjectId,
    ref: "players",
  },
  runs_scored: { type: Number },
  wicket: {
    is_wicket: { type: Boolean, default: false },
    wicket_id: {
      type: mongoose.Types.ObjectId,
      ref: "wickets",
    },
  },
  extra: {
    is_extra: { type: Boolean, default: false },
    extra_type: { type: String, enum: ["WD", "NB", "B", "LB"] },
    runs_this_ball: { type: Number, default: 0 },
  },
});

module.exports = { ballLogSchema };
