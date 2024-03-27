const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    player_id: { type: mongoose.ObjectId, ref: "Player", auto: true },
    first_name: {
      type: String,
      required: [true, "First name is required"],
      min: 3,
      max: 20,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String },
    profile_image_url: { type: String },
    joined_tournaments: [{ type: mongoose.Types.ObjectId, ref: "tournaments" }],
    created_tournaments: [
      { type: mongoose.Types.ObjectId, ref: "tournaments" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
