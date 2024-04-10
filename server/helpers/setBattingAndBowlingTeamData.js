const setBattingAndBowlingTeamData = ({ innings, toss, team1, team2 }) => {
  let battingTeam = {};
  let bowlingTeam = {};

  const isFirstInnings = innings.length === 0;
  const isChoiceToBat = toss.decision === "bat";
  const tossWinningTeam = toss.winnerId === team1._id ? team1 : team2;
  const tossLosingTeam = toss.winnerId === team1._id ? team2 : team1;

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
