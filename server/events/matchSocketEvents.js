const Match = require("../models/match");

async function broadcastRuns(io, matchId) {
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      console.error("Match not found");
      return;
    }

    const { toss } = match;
    const tossConducted = toss.decision.length > 0;

    const runs = !tossConducted ? 0 : 1;

    io.to(matchId).emit("getRuns", runs);
  } catch (error) {
    console.error("Error broadcasting runs:", error);
  }
}

// Function to start broadcasting team1 run log data every 5 seconds
function startBroadcastingRuns(io, matchId) {
  setInterval(async () => {
    await broadcastRuns(io, matchId);
  }, 5000); // Broadcast every 5 seconds
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    socket.on("subscribeToMatch", (matchId) => {
      socket.join(matchId);
      console.log(`User joined match: ${matchId}`);

      // Start broadcasting runs
      // startBroadcastingRuns(io, matchId);
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
