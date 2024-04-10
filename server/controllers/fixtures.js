const { StatusCodes } = require("http-status-codes");
const Tournament = require("../models/tournament");
const Team = require("../models/team");
const Fixture = require("../models/fixture");
const Match = require("../models/match");

const createFixturesBatch = async (req, res) => {
  try {
    const { fixtures: createdFixtures, tournamentId } = req.body;

    for (const fixture of createdFixtures) {
      const { team1_id, team2_id, match_no, date, time, overs } = fixture;

      const newFixture = new Fixture({
        team1_id,
        team2_id,
        match_no,
        date,
        time,
        match_id: null,
      });

      const savedFixture = await newFixture.save();
      const tournament = await Tournament.findById(tournamentId);
      tournament.fixtures.push(savedFixture._id);
      await tournament.save();

      const newMatch = new Match({
        team1_id,
        team2_id,
        total_overs: overs,
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
    const fixture = await Fixture.findById(fixtureId);

    if (!fixture)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such fixture" });

    const { date, time, match_id, team1_id, team2_id } = fixture.toObject();

    const match = await Match.findById(match_id);
    const team1 = await Team.findById(team1_id);
    const team2 = await Team.findById(team2_id);

    const { _id, match_no, total_overs, toss } = match;

    const responseData = {
      match_id: _id,
      match_no,
      total_overs,
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

module.exports = {
  createFixturesBatch,
  getFixtureDetails,
};
