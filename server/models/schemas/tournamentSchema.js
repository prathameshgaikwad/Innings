const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
    },
    admin_id: { type: mongoose.Types.ObjectId, ref: "user" },
    name: {
      type: String,
      required: [true, "Tournament name is required"],
      min: 3,
      max: 50,
    },
    start_date: { type: Date, required: [true, "Start date is required"] },
    end_date: { type: Date, required: [true, "End date is required"] },
    venue: { type: String },
    total_overs: {
      type: Number,
      required: [true, "Number of overs is required"],
    },
    teams: [{ type: mongoose.Types.ObjectId, ref: "teams" }],
    fixtures: [{ type: mongoose.Types.ObjectId, ref: "fixtures" }],
    banner_urls: {
      large: { type: String },
      small: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = { tournamentSchema };
