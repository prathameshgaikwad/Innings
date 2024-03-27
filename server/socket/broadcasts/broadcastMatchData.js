const Match = require("../../models/match");

async function broadcastMatchData(io, match_id) {
  try {
    const match = await Match.findById(match_id);
    if (!match) {
      console.error("Match not found");
      return;
    }

    const { status, innings, data, toss, team1_id } = match;
    const isOngoingMatch = status === "ongoing";
    const isFirstInnings = innings === 1;
    const isTeam1Winner = toss.winner_id === team1_id;

    let ball_log = {};

    if (isOngoingMatch) {
      if (isFirstInnings) {
        if (isTeam1Winner) {
          ball_log = data.team1.ball_log[data.team1.ball_log.length - 1];
        } else ball_log = data.team2.ball_log[data.team2.ball_log.length - 1];
      } else {
        if (isTeam1Winner) {
          ball_log = data.team2.ball_log[data.team2.ball_log.length - 1];
        } else ball_log = data.team1.ball_log[data.team1.ball_log.length - 1];
      }
    }

    io.to(match_id).emit("getBallLog", ball_log);
  } catch (error) {
    console.error("Error broadcasting Ball Log:", error);
  }
}

module.exports = { broadcastMatchData };
