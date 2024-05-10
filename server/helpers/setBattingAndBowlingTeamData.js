const { getRichTeamData } = require("./getRichTeamData");

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

  if (!toss.decision || toss.decision.length === 0) {
    return { battingTeam: team1, bowlingTeam: team2 };
  }

  const isOddInnings = innings.length % 2 === 0;
  const isChoiceToBat = toss.decision === "bat";
  const tossWinningTeam = toss.winner_id.equals(team1._id)
    ? richTeam1Data
    : richTeam2Data;
  const tossLosingTeam = toss.winner_id.equals(team1._id)
    ? richTeam2Data
    : richTeam1Data;

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

module.exports = { setBattingAndBowlingTeamData };
