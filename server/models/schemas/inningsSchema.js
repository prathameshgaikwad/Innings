const mongoose = require("mongoose");
const { extrasSchema } = require("./extrasSchema");
const { ballLogSchema } = require("./ballLogSchema");

const inningsSchema = new mongoose.Schema(
  {
    innings_no: {
      type: Number,
      required: [true, "innings number is required"],
    },
    data: {
      batting_team_id: {
        type: mongoose.Types.ObjectId,
        ref: "teams",
        required: [true, "batting team id is required"],
      },
      bowling_team_id: {
        type: mongoose.Types.ObjectId,
        ref: "teams",
        required: [true, "bowling team id is required"],
      },
      total_runs: { type: Number, default: 0 },
      total_wickets: { type: Number, default: 0 },
      balls_completed: { type: Number, default: 0 },
      total_overs: { type: Number, required: [true, "overs is required"] },
      total_sixes: { type: Number, default: 0 },
      total_fours: { type: Number, default: 0 },
      extras: {
        total: { type: Number, default: 0 },
        wides: { type: Number, default: 0 },
        byes: { type: Number, default: 0 },
        leg_byes: { type: Number, default: 0 },
        no_balls: { type: Number, default: 0 },
        penalties: { type: Number, default: 0 },
      },
      ball_log: [ballLogSchema],
    },
  },
  { timestamps: true }
);

module.exports = { inningsSchema };
