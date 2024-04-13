const { StatusCodes } = require("http-status-codes");
const Team = require("../models/team");
const Tournament = require("../models/tournament");
const Player = require("../models/player");
const fetchRandomImage = require("../helpers/fetchRandomImage");
const { generateShortName } = require("../helpers/generateShortName");
const { generateCleanString } = require("../helpers/generateCleanString");

const getTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);

    if (!team)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "No such team" });

    const { players } = team;

    const richPlayersData = [];
    let captain_name = "";

    for (let player of players) {
      const playerData = await Player.findById(player._id);
      const player_name = `${playerData.first_name} ${playerData.last_name}`;
      richPlayersData.push({
        ...player.toObject(),
        player_name,
      });

      if (player.is_captain) {
        captain_name = player_name;
      }
    }

    richPlayersData.sort((a, b) => {
      const playerA = a.player_name.toLowerCase();
      const playerB = b.player_name.toLowerCase();
      if (playerA < playerB) return -1;
      if (playerA > playerB) return 1;
      return 0;
    });

    const richTeamsData = {
      ...team.toObject(),
      players: richPlayersData,
      captain_name,
    };

    res.status(StatusCodes.OK).json(richTeamsData);
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
