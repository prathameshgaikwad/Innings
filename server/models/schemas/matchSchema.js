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
    total_overs: { type: Number, required: [true, "overs is required"] },
    toss: {
      decision: {
        type: String,
        enum: ["bat", "field"],
      },
      winner_id: {
        type: mongoose.Types.ObjectId,
        ref: "teams",
      },
    },
    result: {
      winner_id: { type: mongoose.Types.ObjectId, ref: "teams" },
      comment: { type: String },
      player_of_the_match: {
        _id: {
          type: mongoose.Types.ObjectId,
          auto: true,
          ref: "players",
        },
      },
    },
    innings: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: "innings",
          required: [true, "innings id is required"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = { matchSchema };
