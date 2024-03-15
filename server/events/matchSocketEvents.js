const Match = require("../models/match");

async function broadcastRunLog(io, matchId) {
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      console.error("Match not found");
      return;
    }

    const { status, innings, team1_run_log, team2_run_log } = match;
    const isOngoingMatch = status === "ongoing";
    const isFirstInnings = innings === 1;

    let runLog = {};

    if (isOngoingMatch) {
      if (isFirstInnings) {
        runLog = team1_run_log[team1_run_log.length - 1];
      } else runLog = team2_run_log[team2_run_log.length - 1];
    }

    io.to(matchId).emit("getRunLog", runLog);
  } catch (error) {
    console.error("Error broadcasting runLog:", error);
  }
}

// Function to start broadcasting team1 run log data every 5 seconds
async function startBroadcastingRunLog(io, matchId) {
  // setInterval(async () => {
  //   await broadcastRunLog(io, matchId);
  // }, 5000); // Broadcast every 5 seconds
  await broadcastRunLog(io, matchId);
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    socket.on("subscribeToMatch", (matchId) => {
      socket.join(matchId);
      console.log(`User joined match: ${matchId}`);

      // Start broadcasting runs
      startBroadcastingRunLog(io, matchId);
    });

    socket.on("setRunLog", ({ matchId, runLog }) => {
      console.log(runLog);
    });

    socket.on("unsubscribeFromMatch", (matchId) => {
      socket.leave(matchId);
      console.log(`User left room: ${matchId}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected :(");
    });
  });
};
