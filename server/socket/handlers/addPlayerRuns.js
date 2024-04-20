const Player = require("../../models/player");

const addPlayerRuns = ({ player_id, runs_scored }) => {
  try {
    const updatePlayerRunLog = async () => {
      const player = await Player.findById(player_id);

      player.statistics.total_runs += runs_scored;

      if (runs_scored === 4) {
        player.statistics.fours++;
      } else if (runs_scored === 6) {
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
