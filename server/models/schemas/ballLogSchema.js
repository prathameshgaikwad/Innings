const mongoose = require("mongoose");

const ballSchema = new mongoose.Schema({
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
    isWicket: { type: Boolean },
    _id: {
      type: mongoose.Types.ObjectId,
      ref: "wickets",
    },
  },
  extra: {
    isExtra: { type: Boolean },
    extra_type: { type: String, enum: ["WD", "NB", "B", "LB"] },
    runs_completed: { type: Number, default: 0 },
  },
});

module.exports = { ballSchema };
