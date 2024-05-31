const Player = require("../models/player");
async function updatePlayerBattingStatistics({ player_id, runs_scored }) {
  await Player.updateOne(
    { _id: player_id },
    {
      $inc: {
        "statistics.total_runs": runs_scored,
        "statistics.balls_faced": 1,
        "statistics.fours": runs_scored === 4 ? 1 : 0,
        "statistics.sixes": runs_scored === 6 ? 1 : 0,
      },
    }
  );
}

module.exports = { updatePlayerBattingStatistics };
