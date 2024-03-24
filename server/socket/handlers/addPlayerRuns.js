const Player = require("../../models/player");

const addPlayerRuns = (player_id, runs) => {
  try {
    const updatePlayerRunLog = async () => {
      const player = await Player.findById({ _id: player_id });

      player.statistics.runs += runs;

      if (runs === 4) {
        player.statistics.fours++;
      } else if (runs === 6) {
        player.statistics.sixes++;
      }
      await player.save();
    };
    updatePlayerRunLog();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addPlayerRuns };
