const {
  generateRichBallLogData,
} = require("../../helpers/generateRichBallLogData");
const Match = require("../../models/match");

async function broadcastInningsData(io, matchId) {
  try {
    const match = await Match.findById(matchId);
    if (!match) {
      console.error("Match not found");
      return;
    }

    const { innings } = match;

    const richBallLogData = await generateRichBallLogData(
      innings[innings.length - 1].data.ball_log.toObject()
    );

    const richInningsData = {
      ...innings[innings.length - 1].data,
      ball_log: richBallLogData,
    };

    io.to(matchId).emit("richInningsData", richInningsData);
  } catch (error) {
    console.error("Error broadcasting Ball Log:", error);
  }
}

module.exports = { broadcastInningsData };
