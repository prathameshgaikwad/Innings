const mongoose = require("mongoose");
const { inningsSchema } = require("./schemas/inningsSchema");

const Innings = mongoose.model("Innings", inningsSchema);

module.exports = Innings;
