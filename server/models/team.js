const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  name_short: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  players: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
        ref: "players",
      },
      player_name: {
        type: String,
        required: true,
      },
      is_captain: {
        type: Boolean,
        default: false,
      },
    },
  ],
  logo_url: {
    type: String,
  },
  captain_name: {
    type: String,
    required: true,
  },
  performance: {
    matches: { type: Number, default: 0 },
    win: { type: Number, default: 0 },
    loss: { type: Number, default: 0 },
    draw: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    nrr: { type: mongoose.Schema.Types.Decimal128, default: 0.0 },
  },
});

module.exports = mongoose.model("Team", teamSchema);
