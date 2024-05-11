const { StatusCodes } = require("http-status-codes");
const Tournament = require("../models/tournament");
const User = require("../models/user");
const Team = require("../models/team");
const Fixture = require("../models/fixture");
const Match = require("../models/match");
const Player = require("../models/player");
const fetchRandomImage = require("../helpers/fetchRandomImage");
const {
  setBattingAndBowlingTeamData,
} = require("../helpers/setBattingAndBowlingTeamData");
const { generateCleanString } = require("../helpers/generateCleanString");

const MAX_ELEMENTS_PER_ARRAY = 10;

const createTournament = async (req, res) => {
  try {
    const { admin_id, name, start_date, end_date, overs, venue } = req.body;
    const { large, small } = await fetchRandomImage("abstract", true);
    const newTournament = new Tournament({
      admin_id,
      name: generateCleanString(name),
      start_date,
      end_date,
      total_overs: overs,
      venue,
      banner_urls: { large, small },
    });

    if (!newTournament)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Did not create tournament object" });

    const savedTournament = await newTournament.save();

    const user = await User.findById(admin_id);
    user.created_tournaments.push(savedTournament._id);
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

    const user = await User.findById(user_id);
    user.joined_tournaments.push(tournament_id);
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
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const adminUser = await User.findById(tournament.admin_id);
    const adminName = `${adminUser.first_name} ${adminUser.last_name}`;

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
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });
    }
    const { fixtures, venue } = tournament;

    let ongoingMatchId = null;

    for (const id of fixtures) {
      const fixture = await Fixture.findById(id);
      const { match_id } = fixture.toObject();
      const match = await Match.findOne(match_id);

      if (match.status === "ongoing") {
        ongoingMatchId = match_id;
        break;
      }
    }
    if (!ongoingMatchId)
      return res
        .status(StatusCodes.OK)
        .json({ isEmpty: true, msg: "No ongoing matches." });

    const liveMatch = await Match.findById(ongoingMatchId);
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
    } = liveMatch;

    const team1 = await Team.findById(team1_id);
    const team2 = await Team.findById(team2_id);

    const { battingTeam, bowlingTeam } = setBattingAndBowlingTeamData({
      innings,
      team1,
      team2,
      toss,
    });

    const responseData = {
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
    const tournament = await Tournament.findOne(tournamentId);

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const { fixtures } = tournament;

    const upcomingMatches = [];

    for (const id of fixtures) {
      const fixture = await Fixture.findOne(id);

      if (fixture.toObject().status === "pending") {
        upcomingMatches.push(id);
      }

      if (upcomingMatches.length >= MAX_ELEMENTS_PER_ARRAY) break;
    }

    if (upcomingMatches.length === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ isEmpty: true, msg: "No upcoming matches." });

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
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const { fixtures } = tournament.toObject();

    const completedMatches = [];

    for (const id of fixtures) {
      const fixture = await Fixture.findById(id);

      if (fixture.status === "completed") {
        const { match_id, team1_id, team2_id } = fixture;
        const match = await Match.findById(match_id);
        const team1 = await Team.findById(team1_id);
        const team2 = await Team.findById(team2_id);

        const { _id, match_no, result } = match;

        const responseData = {
          _id,
          match_no,
          result,
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
      { $sample: { size: MAX_ELEMENTS_PER_ARRAY } },
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
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No such tournament" });

    const allTeams = tournament.teams;

    const teamsData = await Team.find({ _id: { $in: allTeams } }).sort({
      name: 1,
    });

    const richTeamsData = [];

    for (let team of teamsData) {
      const { players } = team;
      let captain_name = "";
      for (let player of players) {
        if (player.is_captain) {
          const captain = await Player.findById(player._id);
          captain_name = `${captain.first_name} ${captain.last_name}`;
        }
      }
      const richIndividualTeamData = { ...team.toObject(), captain_name };
      richTeamsData.push(richIndividualTeamData);
    }

    res
      .status(StatusCodes.OK)
      .json({ length: teamsData.length, teams: richTeamsData });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPointsTable = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const response = await Tournament.findById(tournamentId).select("teams");

    const teamsData = await Promise.all(
      response.teams.map(async (id) => {
        return await Team.findById(id);
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
    const tournament = await Tournament.findById(tournamentId);
    const { fixtures } = tournament;

    const responseData = [];

    for (const id of fixtures) {
      const fixture = await Fixture.findById(id);
      const { team1_id, team2_id, match_no, match_id, date, time, status } =
        fixture.toObject();

      const team1 = await Team.findById(team1_id);
      const team2 = await Team.findById(team2_id);
      const match = await Match.findById(match_id);

      const team1Details = {
        name: team1.name,
        name_short: team1.name_short,
        team_color: team1.team_color,
        logo_url: team1.logo_url,
      };
      const team2Details = {
        name: team2.name,
        name_short: team2.name_short,
        team_color: team2.team_color,
        logo_url: team2.logo_url,
      };

      responseData.push({
        team1Details,
        team2Details,
        match_no,
        match_id,
        date,
        time,
        status,
        overs: match.total_overs,
      });
    }
    res.status(StatusCodes.OK).json(responseData);
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
