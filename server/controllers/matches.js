const { StatusCodes } = require("http-status-codes");
const Match = require("../models/match");
const Fixture = require("../models/fixture");
const Tournament = require("../models/tournament");
const { generateRichTossData, getRichMatchInfo } = require("../helpers/match");
const Team = require("../models/team");
const { setBattingAndBowlingTeamData } = require("../helpers/team");
const Player = require("../models/player");

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

const getDidNotBatPlayers = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findById(matchId);

    if (!match)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such match" });

    const { team1_id, team2_id, toss, innings } = match;

    const team1 = await Team.findById(team1_id);
    const team2 = await Team.findById(team2_id);

    const { battingTeam } = await setBattingAndBowlingTeamData({
      innings,
      team1,
      team2,
      toss,
    });

    const { players } = battingTeam;
    const playersWhoDidNotBat = [];

    for (const player of players) {
      const playerData = await Player.findById(player._id);
      const { match_performances, first_name, last_name } =
        playerData.toObject();

      const thisMatchPerformance = match_performances.find((matchPerformance) =>
        matchPerformance.match_id.equals(match._id)
      );

      if (thisMatchPerformance) {
        if (thisMatchPerformance.batting_performance.stage === "did_not_bat") {
          playersWhoDidNotBat.push(`${first_name} ${last_name}`.trim());
        }
      }
    }
    res.status(StatusCodes.OK).json(playersWhoDidNotBat);
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
  getDidNotBatPlayers,
};
