const mongoose = require("mongoose");
const { extrasSchema } = require("./extrasSchema");

const inningsSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
    },
    match_id: {
      type: mongoose.Types.ObjectId,
      ref: "matches",
      required: [true, "match id is required"],
    },
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
      extras: extrasSchema,
      ball_log: [
        {
          _id: {
            type: mongoose.Types.ObjectId,
            ref: "ball_log",
            required: [true, "innings id is required"],
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = { inningsSchema };
