const { StatusCodes } = require("http-status-codes");
const Match = require("../models/match");
const Fixture = require("../models/fixture");
const Tournament = require("../models/tournament");
const { generateRichTossData } = require("../helpers/generateRichTossData");
const { getRichMatchInfo } = require("../helpers/getRichMatchInfo");

const getMatchDetails = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findById(matchId);

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const fixture = await Fixture.findOne({ match_id: match._id });
    const tournament = await Tournament.findOne({ fixtures: fixture._id });
    const { venue } = tournament;

    const {
      _id,
      match_no,
      total_overs,
      status,
      result,
      toss,
      innings,
      team1_id,
      team2_id,
    } = match;

    const matchData = await getRichMatchInfo({
      _id,
      team1_id,
      team2_id,
      innings,
      toss,
      match_no,
      total_overs,
      venue,
      status,
      result,
    });

    res.status(StatusCodes.OK).json(matchData);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const setTossResult = async (req, res) => {
  try {
    const { matchId, toss } = req.body;
    const match = await Match.findById(matchId);
    const { team1_id, team2_id } = match;

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { decision, winnerId } = toss;
    const { toss: tossFromDb } = match;

    tossFromDb.decision = decision;
    tossFromDb.winner_id = winnerId;
    tossFromDb.conducted = true;

    match.status = "ongoing";
    await match.save();

    const richTossData = generateRichTossData({
      toss: tossFromDb,
      team1_id,
      team2_id,
    });

    res
      .status(StatusCodes.OK)
      .json({ toss: richTossData, status: match.status });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getTossResult = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findById(matchId);
    const { team1_id, team2_id } = match;

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { toss, status } = match;

    const richTossData = generateRichTossData({ toss, team1_id, team2_id });

    res.status(StatusCodes.OK).json({ toss: richTossData, status });
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
