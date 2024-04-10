const mongoose = require("mongoose");

const wicketSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  match_id: {
    type: mongoose.Types.ObjectId,
    ref: "matches",
  },
  bowler_id: {
    type: mongoose.Types.ObjectId,
    ref: "players",
  },
  batsman_id: {
    type: mongoose.Types.ObjectId,
    ref: "players",
  },
  wicket_number: { type: Number },
  runs_this_ball: { type: Number, default: 0 },
  dismissal_type: { type: String },
  fall_of_wicket_stamp: { type: String },
});

module.exports = { wicketSchema };
