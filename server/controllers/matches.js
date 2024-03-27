const { StatusCodes } = require("http-status-codes");
const Match = require("../models/match");
const Team = require("../models/team");
const Fixture = require("../models/fixture");
const Tournament = require("../models/tournament");

const getMatchDetails = async (req, res) => {
  try {
    const { match_id } = req.params;
    const match = await Match.findOne({ _id: match_id });

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { venue } = await Tournament.findById({ _id: match.tournament_id });

    const team1 = await Team.findOne({ _id: team1_id });
    const team2 = await Team.findOne({ _id: team2_id });

    const matchData = {
      ...match.toObject(),
      venue,
      team1,
      team2,
    };

    res.status(StatusCodes.OK).json(matchData);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const setTossResult = async (req, res) => {
  try {
    const { match_id, toss_result } = req.body;
    const match = await Match.findOne({ _id: match_id });

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { decision, winner, winner_id, loser } = toss_result;
    const { toss } = match;

    toss.decision = decision;
    toss.winner = winner;
    toss.loser = loser;
    toss.winner_id = winner_id;

    match.status = "ongoing";

    await match.save();

    res.status(StatusCodes.OK).json(toss);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getTossResult = async (req, res) => {
  try {
    const { match_id } = req.params;
    const match = await Match.findOne({ _id: match_id });

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { toss, status } = match;

    res.status(StatusCodes.OK).json({ toss, status });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  setTossResult,
  getMatchDetails,
  getTossResult,
};
