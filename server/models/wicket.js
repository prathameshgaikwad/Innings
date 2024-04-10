const mongoose = require("mongoose");
const { wicketSchema } = require("./schemas/wicketSchema");

const Wicket = mongoose.model("wicket", wicketSchema);

module.exports = Wicket;
