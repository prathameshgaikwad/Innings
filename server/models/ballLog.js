const mongoose = require("mongoose");
const { ballLogSchema } = require("./schemas/ballLogSchema");

const BallLog = mongoose.model("ball_log", ballLogSchema);

module.exports = BallLog;
