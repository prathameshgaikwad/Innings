const Player = require("../../models/player");
const {
  handleBattingPerformance,
  getMatchPerformanceObject,
} = require("../../helpers/player");

const updatePlayerMatchPerformance = ({ player_id, runs_scored, match_id }) => {
  try {
    const updatePerformance = async () => {
      const player = await Player.findById(player_id);

      // HANDLE MATCH PERFORMANCE OBJECT INSTANCE
      const matchPerformanceObj = await getMatchPerformanceObject({
        match_id,
        player,
      });

      handleBattingPerformance({ matchPerformanceObj, runs_scored });
      // HANDLE BOWLING PERFORMANCE

      await player.save();
    };
    updatePerformance();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updatePlayerMatchPerformance };
