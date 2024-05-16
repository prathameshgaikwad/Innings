const Player = require("../models/player");
const Team = require("../models/team");

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

const setBattingAndBowlingTeamData = async ({
  innings,
  toss,
  team1,
  team2,
}) => {
  let battingTeam = {};
  let bowlingTeam = {};

  const richTeam1Data = await getRichTeamData({ team_id: team1._id });
  const richTeam2Data = await getRichTeamData({ team_id: team2._id });

  if (!toss.conducted) {
    return { battingTeam: team1, bowlingTeam: team2 };
  }

  const isNewMatch = innings.length === 0;
  const isOddInnings = innings.length % 2 === 1;
  const isChoiceToBat = toss.decision === "bat";
  const tossWinningTeam = toss.winner_id.equals(team1._id)
    ? richTeam1Data
    : richTeam2Data;
  const tossLosingTeam = toss.winner_id.equals(team1._id)
    ? richTeam2Data
    : richTeam1Data;

  if (isNewMatch) {
    if (isChoiceToBat) {
      battingTeam = tossWinningTeam;
      bowlingTeam = tossLosingTeam;
    } else {
      battingTeam = tossLosingTeam;
      bowlingTeam = tossWinningTeam;
    }
    return { battingTeam, bowlingTeam };
  }

  if (isOddInnings) {
    if (isChoiceToBat) {
      battingTeam = tossWinningTeam;
      bowlingTeam = tossLosingTeam;
    } else {
      battingTeam = tossLosingTeam;
      bowlingTeam = tossWinningTeam;
    }
  } else {
    if (isChoiceToBat) {
      battingTeam = tossLosingTeam;
      bowlingTeam = tossWinningTeam;
    } else {
      battingTeam = tossWinningTeam;
      bowlingTeam = tossLosingTeam;
    }
  }
  return { battingTeam, bowlingTeam };
};

module.exports = { setBattingAndBowlingTeamData, getRichTeamData };
