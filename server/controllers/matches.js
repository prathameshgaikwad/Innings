const { StatusCodes } = require("http-status-codes");
const Match = require("../models/match");
const Team = require("../models/team");
const Fixture = require("../models/fixture");
const Tournament = require("../models/tournament");

const getMatchDetails = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findOne({ _id: matchId });

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const fixture = await Fixture.findOne({ match_id: matchId });
    const tournament = await Tournament.findOne({ fixture_id: fixture._id });
    const { venue } = tournament;

    const {
      _id,
      match_no,
      overs,
      status,
      team1_ball_log,
      team1_run_log,
      team2_ball_log,
      team2_run_log,
      team1_wicket_log,
      team2_wicket_log,
      toss,
      innings,
      team1_id,
      team2_id,
    } = match;

    const team1 = await Team.findOne({ _id: team1_id });
    const team2 = await Team.findOne({ _id: team2_id });

    const data = {
      _id,
      match_no,
      overs,
      venue,
      status,
      team1_ball_log,
      team1_run_log,
      team2_ball_log,
      team2_run_log,
      team1_wicket_log,
      team2_wicket_log,
      toss,
      innings,
      team1,
      team2,
    };

    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const setTossResult = async (req, res) => {
  try {
    const { matchId, toss } = req.body;
    const match = await Match.findOne({ _id: matchId });

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { decision, winner, winnerId, loser } = toss;
    const { toss: tossFromDb } = match;

    tossFromDb.decision = decision;
    tossFromDb.winner = winner;
    tossFromDb.loser = loser;
    tossFromDb.winnerId = winnerId;

    match.status = "ongoing";

    await match.save();

    res.status(StatusCodes.OK).json({ toss: tossFromDb });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getTossResult = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findOne({ _id: matchId });

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
