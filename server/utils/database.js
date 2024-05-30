const mongoose = require("mongoose");

const startTransaction = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();
  return session;
};
const commitTransaction = async (session) => {
  await session.commitTransaction();
  session.endSession();
};
const abortTransaction = async (session) => {
  await session.abortTransaction();
  session.endSession();
};

module.exports = { startTransaction, commitTransaction, abortTransaction };
