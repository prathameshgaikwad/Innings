const { addRun } = require("../handlers/addRun");
const { addExtra } = require("../handlers/addExtra");
const { unsubscribeFromMatch } = require("../handlers/unsubscribeFromMatch");
const { subscribeToMatch } = require("../handlers/subscribeToMatch");
const { addWicket } = require("../handlers/addWicket");

const socketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    socket.on("subscribeToMatch", (matchId) =>
      subscribeToMatch(socket, matchId)
    );

    socket.on("addRun", (runLogData) => addRun({ io, runLogData }));

    socket.on("addExtra", (extraLogItem) => addExtra({ io, extraLogItem }));

    socket.on("addWicket", (wicketLogItem) => addWicket({ io, wicketLogItem }));

    socket.on("unsubscribeFromMatch", (matchId) =>
      unsubscribeFromMatch(socket, matchId)
    );

    socket.on("disconnect", () => {
      console.log("Disconnected :(");
    });
  });
};

module.exports = { socketEvents };
