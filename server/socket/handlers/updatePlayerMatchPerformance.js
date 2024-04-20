const Player = require("../../models/player");

const updatePlayerMatchPerformance = ({ player_id, runs_scored, match_id }) => {
  try {
    const updateBattingPerformance = async () => {
      const player = await Player.findById(player_id);
      const { matchPerformance } = player.toObject();

      //TODO: SAVE MATCH PERFORMANCE LOGIC
      await player.save();
    };
    updateBattingPerformance();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updatePlayerMatchPerformance };
