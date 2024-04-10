const { StatusCodes } = require("http-status-codes");
const Match = require("../models/match");
const Team = require("../models/team");
const Fixture = require("../models/fixture");
const Tournament = require("../models/tournament");
const {
  setBattingAndBowlingTeamData,
} = require("../helpers/setBattingAndBowlingTeamData");

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

    const team1 = await Team.findById(team1_id);
    const team2 = await Team.findById(team2_id);

    const { battingTeam, bowlingTeam } = setBattingAndBowlingTeamData({
      innings,
      team1,
      team2,
      toss,
    });

    const matchData = {
      _id,
      match_no,
      total_overs,
      venue,
      status,
      result,
      toss,
      innings,
      team1_id,
      team2_id,
      battingTeam,
      bowlingTeam,
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
    const { matchId, toss } = req.body;
    const match = await Match.findById({ _id: matchId });

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { decision, winnerId } = toss;
    const { toss: tossFromDb } = match;

    tossFromDb.decision = decision;
    tossFromDb.winner_id = winnerId;

    match.status = "ongoing";
    await match.save();

    const { name_short: winner_name } = await Team.findById(
      tossFromDb.winner_id
    );
    const losingTeamId =
      tossFromDb.winner_id === match.team1_id ? team2_id : team1_id;
    const { name_short: loser_name } = await Team.findById(losingTeamId);

    const richTossData = {
      decision,
      winner_id: tossFromDb.winner_id,
      winner_name,
      loser_name,
    };

    res.status(StatusCodes.OK).json({ toss: richTossData });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getTossResult = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findById({ _id: matchId });

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { toss, status } = match;

    const { name_short: winner_name } = await Team.findById(toss.winner_id);
    const losingTeamId =
      toss.winner_id === match.team1_id ? team2_id : team1_id;
    const { name_short: loser_name } = await Team.findById(losingTeamId);

    const richTossData = {
      decision,
      winner_id: toss.winner_id,
      winner_name,
      loser_name,
    };

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
