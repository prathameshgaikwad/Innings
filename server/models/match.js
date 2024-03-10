const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
    },
    match_no: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    team1_id: {
      type: mongoose.Types.ObjectId,
      ref: "teams",
      required: [true, "team1 id is required"],
    },
    team2_id: {
      type: mongoose.Types.ObjectId,
      ref: "teams",
      required: [true, "team2 id is required"],
    },
    overs: { type: Number, required: [true, "overs is required"] },
    toss: {
      decision: {
        type: String,
        enum: ["bat", "field"],
      },
      winner: {
        type: String,
      },
      loser: {
        type: String,
      },
      winnerId: {
        type: mongoose.Types.ObjectId,
        ref: "teams",
      },
    },
    winner: { type: String },
    team1_runs: { type: Number },
    team2_runs: { type: Number },
    team1_sixes: { type: Number },
    team2_sixes: { type: Number },
    team1_fours: { type: Number },
    team2_fours: { type: Number },
    team1_run_log: [
      {
        run_scorer: {
          type: mongoose.Types.ObjectId,
          ref: "players",
        },
        count: { type: Number },
      },
    ],
    team2_run_log: [
      {
        run_scorer: {
          type: mongoose.Types.ObjectId,
          ref: "players",
        },
        count: { type: Number },
      },
    ],
    team1_extras: {
      wides: { type: Number },
      byes: { type: Number },
      leg_byes: { type: Number },
      no_balls: { type: Number },
    },
    team2_extras: {
      wides: { type: Number },
      byes: { type: Number },
      leg_byes: { type: Number },
      no_balls: { type: Number },
    },
    team1_ball_log: [{ type: String }],
    team2_ball_log: [{ type: String }],
    team1_wicket_log: [
      {
        wicket_taker: { type: String },
        how_out: { type: String },
        fall_of_wicket_stamp: { type: String },
      },
    ],
    team2_wicket_log: [
      {
        wicket_taker: { type: String },
        how_out: { type: String },
        fall_of_wicket_stamp: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
