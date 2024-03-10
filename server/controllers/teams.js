const { StatusCodes } = require("http-status-codes");
const Team = require("../models/team");
const Tournament = require("../models/tournament");
const fetchRandomImage = require("../helpers/fetchRandomImage");
const { generateShortName } = require("../helpers/generateShortName");

const getTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findOne({ _id: teamId });

    if (!team)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such team" });

    res.status(StatusCodes.OK).json(team);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const { teamName, teamColor, players, tournamentId } = req.body;

    let assumedCaptain = players[0].playerName;
    let givenCaptain = "";

    const indexOfCaptain = players.indexOf(
      (player) => player.isCaptain === true
    );

    if (indexOfCaptain !== -1) {
      givenCaptain = players.find(
        (player) => player.isCaptain === true
      ).playerName;
    }
    const nameShort = generateShortName(teamName);
    const logoURL = await fetchRandomImage("digital-art", false);

    const newTeam = new Team({
      name: teamName,
      nameShort,
      color: teamColor,
      players,
      captainName: indexOfCaptain === -1 ? assumedCaptain : givenCaptain,
      logoURL,
    });

    if (!newTeam)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Did not create team object" });

    const savedTeam = await newTeam.save();
    const tournament = await Tournament.findOne({ _id: tournamentId });
    tournament.teams.push(savedTeam._id);
    await tournament.save();

    res.status(StatusCodes.CREATED).json(savedTeam);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getTeam,
  createTeam,
};
