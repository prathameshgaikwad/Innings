const mongoose = require("mongoose");

const fixtureSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
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
    match_id: {
      type: mongoose.Types.ObjectId,
      ref: "matches",
    },
    match_no: { type: Number, required: [true, "match number is required"] },
    date: { type: Date, required: [true, "match date is required"] },
    time: { type: String, required: [true, "match time is required"] },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = { fixtureSchema };
