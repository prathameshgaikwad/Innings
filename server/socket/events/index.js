const { addRun } = require("../handlers/addRun");
const { addExtra } = require("../handlers/addExtra");
const { unsubscribeFromMatch } = require("../handlers/unsubscribeFromMatch");
const { subscribeToMatch } = require("../handlers/subscribeToMatch");

const socketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    socket.on("subscribeToMatch", (match_id) =>
      subscribeToMatch(socket, match_id)
    );

    socket.on("addRun", (runLogData) => addRun(io, runLogData));

    socket.on("addExtra", (extraLogItem) => addExtra(extraLogItem));

    socket.on("unsubscribeFromMatch", (match_id) =>
      unsubscribeFromMatch(socket, match_id)
    );

    socket.on("disconnect", () => {
      console.log("Disconnected :(");
    });
  });
};

module.exports = { socketEvents };
