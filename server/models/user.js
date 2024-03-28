const mongoose = require("mongoose");
const { userSchema } = require("./schemas/userSchema");

const User = mongoose.model("User", userSchema);

module.exports = User;
