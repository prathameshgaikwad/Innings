const mongoose = require("mongoose");
const ballSchema = require("./ballLogSchema");
const wicketSchema = require("./wicketSchema");
const battingLogSchema = require("./battingLogSchema");

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
    innings: { type: Number },
    result: {
      winner: { type: String },
    },
    data: {
      team1: {
        runs: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
        balls_completed: { type: Number, default: 0 },
        sixes: { type: Number, default: 0 },
        fours: { type: Number, default: 0 },
        extras: {
          wides: { type: Number, default: 0 },
          byes: { type: Number, default: 0 },
          leg_byes: { type: Number, default: 0 },
          no_balls: { type: Number, default: 0 },
        },
        ball_log: [ballSchema],
        wicket_log: [wicketSchema],
        batting_log: [battingLogSchema],
      },
      team2: {
        runs: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
        balls_completed: { type: Number, default: 0 },
        sixes: { type: Number, default: 0 },
        fours: { type: Number, default: 0 },
        extras: {
          wides: { type: Number, default: 0 },
          byes: { type: Number, default: 0 },
          leg_byes: { type: Number, default: 0 },
          no_balls: { type: Number, default: 0 },
        },
        ball_log: [ballSchema],
        wicket_log: [wicketSchema],
        batting_log: [battingLogSchema],
      },
    },
  },
  { timestamps: true }
);

module.exports = { matchSchema };
