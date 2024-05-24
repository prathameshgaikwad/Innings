const { StatusCodes } = require("http-status-codes");
const Team = require("../models/team");
const Tournament = require("../models/tournament");
const Player = require("../models/player");
const fetchRandomImage = require("../helpers/fetchRandomImage");
const { generateShortName } = require("../helpers/generateShortName");
const { generateCleanString } = require("../helpers/generateCleanString");
const { getRichTeamData } = require("../helpers/team");
const redisClient = require("../db/redisClient");

const getTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);

    const richTeamData = await getRichTeamData({ team_id: teamId });

    redisClient.setEx(`team:${teamId}`, 3600, JSON.stringify(richTeamData));

    res.status(StatusCodes.OK).json(richTeamData);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const { teamName, teamColor, players, tournamentId } = req.body;

    let needToMarkCaptain = true;

    const indexOfCaptain = players.indexOf(
      (player) => player.isCaptain === true
    );

    if (indexOfCaptain !== -1) {
      needToMarkCaptain = false;
    }

    if (needToMarkCaptain) {
      players[0].isCaptain = true;
    }

    const newTeam = new Team({
      name: generateCleanString(teamName),
      name_short: generateShortName(teamName),
      team_color: teamColor,
      players: [],
      logo_url: await fetchRandomImage("digital-art", false),
    });

    const playerPromises = players.map(async (player) => {
      const first_name = player.playerName.split(" ")[0];
      const last_name = player.playerName.split(" ")[1] || "";

      const newPlayer = new Player({
        team_id: newTeam._id,
        tournament_id: tournamentId,
        first_name: generateCleanString(first_name),
        last_name: generateCleanString(last_name),
        debut: Date.now(),
        picture_url: await fetchRandomImage("person", false),
      });
      await newPlayer.save();

      const isCaptain = player.isCaptain;

      const savedPlayer = {
        _id: newPlayer._id,
        is_captain: isCaptain,
      };
      return savedPlayer;
    });

    newTeam.players = await Promise.all(playerPromises);

    if (!newTeam)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Did not create team object" });

    const savedTeam = await newTeam.save();
    const tournament = await Tournament.findById(tournamentId);
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
