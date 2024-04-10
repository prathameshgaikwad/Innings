const mongoose = require("mongoose");

const extrasSchema = new mongoose.Schema({
  total: { type: Number, default: 0 },
  wides: { type: Number, default: 0 },
  byes: { type: Number, default: 0 },
  leg_byes: { type: Number, default: 0 },
  no_balls: { type: Number, default: 0 },
  penalties: { type: Number, default: 0 },
});

module.exports = { extrasSchema };
