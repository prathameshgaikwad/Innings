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
        ball_log: [
          {
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
              wicket_number: { type: Number },
              runs_completed: { type: Number, default: 0 },
            },
            extra: {
              isExtra: { type: Boolean },
              extra_type: { type: String, enum: ["WD", "NB", "B", "LB"] },
              runs_completed: { type: Number, default: 0 },
            },
          },
        ],
        wicket_log: [
          {
            bowler_id: {
              type: mongoose.Types.ObjectId,
              ref: "players",
            },
            batsman_id: {
              type: mongoose.Types.ObjectId,
              ref: "players",
            },
            wicket_number: { type: Number },
            runs_completed: { type: Number, default: 0 },
            fall_of_wicket_stamp: { type: String },
          },
        ],
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
        ball_log: [
          {
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
              wicket_number: { type: Number },
              runs_completed: { type: Number, default: 0 },
            },
            extra: {
              isExtra: { type: Boolean },
              extra_type: { type: String, enum: ["WD", "NB", "B", "LB"] },
              runs_completed: { type: Number, default: 0 },
            },
          },
        ],
        wicket_log: [
          {
            bowler_id: {
              type: mongoose.Types.ObjectId,
              ref: "players",
            },
            batsman_id: {
              type: mongoose.Types.ObjectId,
              ref: "players",
            },
            wicket_number: { type: Number },
            runs_completed: { type: Number, default: 0 },
            fall_of_wicket_stamp: { type: String },
          },
        ],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
