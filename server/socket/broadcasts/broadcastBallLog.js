const Match = require("../../models/match");

async function broadcastBallLog(io, matchId) {
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      console.error("Match not found");
      return;
    }

    const { status, innings, team1_ball_log, team2_ball_log, toss, team1_id } =
      match;
    const isOngoingMatch = status === "ongoing";
    const isFirstInnings = innings === 1;
    const isTeam1Winner = toss.winnerId === team1_id;

    let ball_Log = {};

    if (isOngoingMatch) {
      if (isFirstInnings) {
        if (isTeam1Winner) {
          ball_Log = team1_ball_log[team1_ball_log.length - 1];
        } else ball_Log = team2_ball_log[team2_ball_log.length - 1];
      } else {
        if (isTeam1Winner) {
          ball_Log = team2_ball_log[team2_ball_log.length - 1];
        } else ball_Log = team1_ball_log[team1_ball_log.length - 1];
      }
    }

    io.to(matchId).emit("getBallLog", ball_Log);
  } catch (error) {
    console.error("Error broadcasting Ball Log:", error);
  }
}

module.exports = { broadcastBallLog };
