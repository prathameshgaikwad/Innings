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

  const isFirstInnings = innings.length === 0;
  const isChoiceToBat = toss.decision === "bat";
  const tossWinningTeam =
    toss.winnerId === team1._id ? richTeam1Data : richTeam2Data;
  const tossLosingTeam =
    toss.winnerId === team1._id ? richTeam2Data : richTeam1Data;

  if (isFirstInnings) {
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
