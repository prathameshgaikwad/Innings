const Team = require("../models/team");
const Player = require("../models/player");

const getRichTeamData = async ({ team_id }) => {
  try {
    const teamData = await Team.findById(team_id);
    const { players } = teamData;

    const captain_id = players.find((player) => player.is_captain);
    const captain = await Player.findById(captain_id);
    const captain_name = `${captain.first_name} ${captain.last_name}`;

    const richPlayersData = await Promise.all(
      players.map(async (player) => {
        const playerData = await Player.findById(player._id);
        const richPlayerData = playerData.toObject();
        return richPlayerData;
      })
    );

    richPlayersData.sort((a, b) => {
      const playerA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const playerB = `${b.first_name} ${b.last_name}`.toLowerCase();
      if (playerA < playerB) return -1;
      if (playerA > playerB) return 1;
      return 0;
    });

    const richTeamData = {
      ...teamData.toObject(),
      players: richPlayersData,
      captain_name,
    };

    return richTeamData;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getRichTeamData };
