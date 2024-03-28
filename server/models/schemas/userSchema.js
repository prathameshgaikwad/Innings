const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    player_id: { type: mongoose.ObjectId, ref: "Player", auto: true },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      min: 3,
      max: 20,
    },
    lastName: {
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
    profileImageURL: { type: String },
    joinedTournaments: [{ type: mongoose.Types.ObjectId, ref: "tournaments" }],
    createdTournaments: [{ type: mongoose.Types.ObjectId, ref: "tournaments" }],
  },
  { timestamps: true }
);

module.exports = { userSchema };
