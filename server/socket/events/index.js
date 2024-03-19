const { addRun } = require("../handlers/addRun");
const { addExtra } = require("../handlers/addExtra");
const { unsubscribeFromMatch } = require("../handlers/unsubscribeFromMatch");
const { subscribeToMatch } = require("../handlers/subscribeToMatch");

const socketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    socket.on("subscribeToMatch", (matchId) =>
      subscribeToMatch(socket, matchId)
    );

    socket.on("addRun", (runLogData) => addRun(runLogData));

    socket.on("addExtra", (extraLogItem) => addExtra(extraLogItem));

    socket.on("unsubscribeFromMatch", (matchId) =>
      unsubscribeFromMatch(socket, matchId)
    );

    socket.on("disconnect", () => {
      console.log("Disconnected :(");
    });
  });
};

module.exports = { socketEvents };
