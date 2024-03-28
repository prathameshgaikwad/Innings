const Player = require("../models/player");

const getPlayerDetails = async (req, res) => {
  try {
    const { playerId } = req.params;
    const player = await Player.findById({ _id: playerId });

    if (!player)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such player" });

    res.status(StatusCodes.OK).json(player);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = { getPlayerDetails };
