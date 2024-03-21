const Match = require("../../models/match");

async function broadcastRunLog(io, matchId) {
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      console.error("Match not found");
      return;
    }

    console.log("Trying to broadcast.......");

    // const { status, innings, team1_run_log, team2_run_log } = match;
    // const isOngoingMatch = status === "ongoing";
    // const isFirstInnings = innings === 1;

    // let runLog = {};

    // if (isOngoingMatch) {
    //   if (isFirstInnings) {
    //     runLog = team1_run_log[team1_run_log.length - 1];
    //   } else runLog = team2_run_log[team2_run_log.length - 1];
    // }

    // io.to(matchId).emit("getRunLog", runLog);
  } catch (error) {
    console.error("Error broadcasting runLog:", error);
  }
}

module.exports = { broadcastRunLog };
