const Player = require("../models/player");

const generateRichBallLogData = async (ball_log) => {
  const richBallLogData = await Promise.all(
    ball_log.map(async (ball_log_item) => {
      const { bowler_id, batsman_id } = ball_log_item;

      const bowler = await Player.findById(bowler_id);
      const batsman = await Player.findById(batsman_id);

      //TODO: Supply latest match performance

      return {
        ...ball_log_item,
        bowler,
        batsman,
      };
    })
  );

  return richBallLogData;
};

module.exports = { generateRichBallLogData };
