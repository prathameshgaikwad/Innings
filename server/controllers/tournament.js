const { StatusCodes } = require("http-status-codes");
const Tournament = require("../models/tournament");
const User = require("../models/user");
const Team = require("../models/team");
const Fixture = require("../models/fixture");
const Match = require("../models/match");
const fetchRandomImage = require("../helpers/fetchRandomImage");

const createTournament = async (req, res) => {
  try {
    const { admin_id, name, start_date, end_date, overs, venue } = req.body;
    const newTournament = new Tournament({
      admin_id,
      name,
      start_date,
      end_date,
      overs,
      venue,
      banner_url: await fetchRandomImage("abstract", true),
    });

    if (!newTournament)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Did not create tournament object" });

    const savedTournament = await newTournament.save();

    const user = await User.findOne({ _id: admin_id });
    user.createdTournaments.push(savedTournament._id);
    await user.save();

    res.status(StatusCodes.CREATED).json(savedTournament);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const joinTournament = async (req, res) => {
  try {
    const { user_id, tournament_id } = req.body;

    const user = await User.findOne({ _id: user_id });
    user.joinedTournaments.push(tournament_id);
    await user.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Joined tournament successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getTournamentDetails = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findOne({ _id: tournamentId });

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const adminUser = await User.findOne({ _id: tournament.admin_id });
    const adminName = `${adminUser.firstName} ${adminUser.lastName}`;

    const tournamentData = {
      ...tournament.toObject(),
      adminName,
    };

    res.status(StatusCodes.OK).json(tournamentData);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getLiveMatchDetails = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findOne({ _id: tournamentId });

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const { fixture_id } = tournament;

    let ongoingMatchId = null;

    for (const id of fixture_id) {
      const fixture = await Fixture.findOne({ _id: id });
      const { match_id } = fixture;
      const match = await Match.findOne({ _id: match_id });

      if (match.status === "ongoing") {
        ongoingMatchId = match_id;
        break;
      }
    }

    if (!ongoingMatchId)
      return res
        .status(StatusCodes.OK)
        .json({ isEmpty: true, msg: "No ongoing matches." });

    const liveMatch = await Match.findOne({ _id: ongoingMatchId });
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
      team1_id,
      team2_id,
    } = liveMatch;

    const team1Details = await Team.findOne({ _id: team1_id });
    const team2Details = await Team.findOne({ _id: team2_id });

    const responseData = {
      _id,
      match_no,
      overs,
      status,
      venue: tournament.venue,
      team1_ball_log,
      team1_run_log,
      team1_wicket_log,
      team2_ball_log,
      team2_run_log,
      team2_wicket_log,
      toss,
      team1: team1Details,
      team2: team2Details,
    };

    res
      .status(StatusCodes.OK)
      .json({ isEmpty: false, liveMatch: responseData });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getUpcomingMatches = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findOne({ _id: tournamentId });

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const { fixture_id } = tournament;

    const upcomingMatches = [];

    for (const id of fixture_id) {
      const fixture = await Fixture.findOne({ _id: id });

      if (fixture.status === "pending") {
        upcomingMatches.push(id);
      }
    }

    if (upcomingMatches.length === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ isEmpty: true, msg: "No upcoming matches." });

    // upcomingMatches.sort((a, b) => a.match_no - b.match_no);
    upcomingMatches.shift();

    res.status(StatusCodes.OK).json({ isEmpty: false, upcomingMatches });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getCompletedMatches = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findOne({ _id: tournamentId });

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const { fixture_id } = tournament;

    const completedMatches = [];

    for (const id of fixture_id) {
      const fixture = await Fixture.findOne({ _id: id });

      if (fixture.status === "completed") {
        const { match_id } = fixture;
        const { team1_id, team2_id } = fixture;
        const match = await Match.findOne({ _id: match_id });
        const team1 = await Team.findOne({ _id: team1_id });
        const team2 = await Team.findOne({ _id: team2_id });

        const { _id, match_no, winner } = match;

        const responseData = {
          _id,
          match_no,
          winner,
          team1,
          team2,
        };

        completedMatches.push(responseData);
      }
    }

    if (completedMatches.length === 0)
      return res
        .status(StatusCodes.OK)
        .json({ isEmpty: true, msg: "No completed matches." });

    completedMatches.sort((a, b) => a.match_no - b.match_no);

    res.status(StatusCodes.OK).json({ isEmpty: false, completedMatches });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getFeaturedTournaments = async (req, res) => {
  try {
    // gets 10 random tournament ids
    const tournaments = await Tournament.aggregate([
      { $sample: { size: 10 } },
      { $project: { _id: 1 } },
    ]);

    if (!tournaments)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No tournaments to fetch" });

    const tournamentsData = {
      length: tournaments.length,
      data: tournaments.map((tournament) => tournament._id),
    };

    res.status(StatusCodes.OK).json(tournamentsData);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findOne({ _id: tournamentId });

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const allTeams = tournament.teams;

    const teamsData = await Team.find({ _id: { $in: allTeams } }).sort({
      name: 1,
    });

    res
      .status(StatusCodes.OK)
      .json({ length: teamsData.length, teams: teamsData });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPointsTable = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const response = await Tournament.findOne({ _id: tournamentId }).select(
      "teams"
    );

    const teamsData = await Promise.all(
      response.teams.map(async (id) => {
        return await Team.findOne({ _id: id });
      })
    );

    const pointsTable = [...teamsData];

    pointsTable.sort((a, b) => {
      const A = a.performance;
      const B = b.performance;

      if (A.points !== B.points) {
        return B.points - A.points;
      } else if (A.nrr !== B.nrr) {
        return B.nrr - A.nrr;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    res.status(StatusCodes.OK).json(pointsTable);
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
  createTournament,
  joinTournament,
  getTournamentDetails,
  getFeaturedTournaments,
  getLiveMatchDetails,
  getAllTeams,
  getAllFixtures,
  getPointsTable,
  getUpcomingMatches,
  getCompletedMatches,
};
