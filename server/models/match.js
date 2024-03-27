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
    tournament_id: {
      type: mongoose.Types.ObjectId,
      ref: "tournament",
      required: [true, "tournament id is required"],
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
      winner_id: {
        type: mongoose.Types.ObjectId,
        ref: "teams",
      },
    },
    result: {
      winner_id: {
        type: mongoose.Types.ObjectId,
        ref: "teams",
      },
    },
    data: {
      team1: {
        runs: { type: Number, default: 0 },
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
              number: { type: Number },
              type: { type: String },
            },
            extra: {
              isExtra: { type: Boolean },
              type: { type: String, enum: ["WD", "NB", "B", "LB"] },
            },
          },
        ],
      },
      team2: {
        runs: { type: Number, default: 0 },
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
            bowler: {
              type: mongoose.Types.ObjectId,
              ref: "players",
            },
            runs_conceded: { type: Number },
            wicket: {
              isWicket: { type: Boolean },
              number: { type: Number },
              type: { type: String },
            },
            extra: {
              isExtra: { type: Boolean },
              type: { type: String, enum: ["WD", "NB", "B", "LB"] },
            },
          },
        ],
      },
      innings: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
