const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Tournament = require("../models/tournament");

const getJoinedTournaments = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist!" });

    const joinedTournamentsIds = user.joined_tournaments;

    res.status(StatusCodes.OK).json({
      length: joinedTournamentsIds.length,
      data: joinedTournamentsIds,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch joined tournaments" });
  }
};

const getCreatedTournaments = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist!" });

    const createdTournamentIds = user.created_tournaments;

    res.status(StatusCodes.OK).json({
      length: createdTournamentIds.length,
      data: createdTournamentIds,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch created tournaments" });
  }
};

const getLatestTournamentDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such user" });

    const { joined_tournaments } = user;

    if (!joined_tournaments || joined_tournaments.length === 0) {
      return res
        .status(StatusCodes.OK)
        .json({ isEmpty: true, message: "No tournaments joined" });
    }

    const ongoingTournaments = [];

    // Iterate over joined_tournaments asynchronously
    for (const tournamentId of joined_tournaments) {
      const tournament = await Tournament.findById(tournamentId);
      if (
        tournament &&
        tournament.start_date <= new Date() &&
        tournament.end_date > new Date()
      )
        ongoingTournaments.push(tournament);
    }

    if (ongoingTournaments.length === 0)
      return res
        .status(StatusCodes.OK)
        .json({ isEmpty: true, message: " No ongoing tournaments" });

    ongoingTournaments.sort((a, b) => a.start_date - b.start_date);

    const latestTournament = ongoingTournaments[0];

    res.status(StatusCodes.OK).json({ isEmpty: false, latestTournament });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getJoinedTournaments,
  getCreatedTournaments,
  getLatestTournamentDetails,
};
