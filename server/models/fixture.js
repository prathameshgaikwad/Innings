const mongoose = require("mongoose");
const { fixtureSchema } = require("./schemas/fixtureSchema");

const Fixture = mongoose.model("Fixture", fixtureSchema);

module.exports = Fixture;
