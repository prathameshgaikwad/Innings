const Match = require("../models/match");

async function broadcastTeam1RunLog(io, matchId) {
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      console.error("Match not found");
      return;
    }

    const team1RunLog = match.team1_run_log;

    io.to(matchId).emit("team1RunLog", team1RunLog);
  } catch (error) {
    console.error("Error broadcasting team1 run log:", error);
  }
}

// Function to start broadcasting team1 run log data every 5 seconds
function startBroadcastingTeam1RunLog(io, matchId) {
  setInterval(async () => {
    await broadcastTeam1RunLog(io, matchId);
  }, 5000); // Broadcast every 5 seconds
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    socket.on("subscribeToMatch", (matchId) => {
      socket.join(matchId);
      console.log(`User joined room: ${matchId}`);

      // Start broadcasting team1 run log
      startBroadcastingTeam1RunLog(io, matchId);
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
