const { StatusCodes } = require("http-status-codes");
const Tournament = require("../models/tournament");
const Team = require("../models/team");
const Fixture = require("../models/fixture");
const Match = require("../models/match");

const createFixturesBatch = async (req, res) => {
  try {
    const { fixtures, tournamentId } = req.body;

    for (const fixture of fixtures) {
      const { team1_id, team2_id, match_no, date, time, overs } = fixture;

      const newFixture = new Fixture({
        team1_id,
        team2_id,
        match_no,
        overs,
        date,
        time,
        match_id: null,
      });

      const savedFixture = await newFixture.save();
      const tournament = await Tournament.findOne({ _id: tournamentId });
      tournament.fixture_id.push(savedFixture._id);
      await tournament.save();

      const newMatch = new Match({
        team1_id,
        team2_id,
        overs,
        match_no,
      });

      const savedMatch = await newMatch.save();

      await Fixture.findByIdAndUpdate(savedFixture._id, {
        match_id: savedMatch._id,
      });
    }

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Fixtures saved successfully!" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getFixtureDetails = async (req, res) => {
  try {
    const { fixtureId } = req.params;
    const fixture = await Fixture.findOne({ _id: fixtureId });

    if (!fixture)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such fixture" });

    const { date, time } = fixture;
    const { match_id } = fixture;
    const { team1_id, team2_id } = fixture;

    const match = await Match.findOne({ _id: match_id });
    const team1 = await Team.findOne({ _id: team1_id });
    const team2 = await Team.findOne({ _id: team2_id });

    const { _id, match_no, overs, toss } = match;

    const responseData = {
      match_id: _id,
      match_no,
      overs,
      date,
      time,
      toss,
      team1,
      team2,
    };

    res.status(StatusCodes.OK).json({ fixture: responseData });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getAllFixtures = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findOne({ _id: tournamentId });
    const { fixture_id } = tournament;

    const responseObject = [];

    for (const element of fixture_id) {
      const fixture = await Fixture.findOne({ _id: element });
      const { team1_id, team2_id, match_no, match_id, date, time, status } =
        fixture;

      const team1 = await Team.findOne({ _id: team1_id });
      const team2 = await Team.findOne({ _id: team2_id });
      const match = await Match.findOne({ _id: match_id });

      const team1Details = {
        name: team1.name,
        nameShort: team1.nameShort,
        color: team1.color,
        logoURL: team1.logoURL,
      };
      const team2Details = {
        name: team2.name,
        nameShort: team2.nameShort,
        color: team2.color,
        logoURL: team2.logoURL,
      };

      responseObject.push({
        team1Details,
        team2Details,
        match_no,
        match_id,
        date,
        time,
        status,
        overs: match.overs,
      });
    }

    res.status(StatusCodes.OK).json(responseObject);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createFixturesBatch,
  getAllFixtures,
  getFixtureDetails,
};
