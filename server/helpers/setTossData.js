const setRichTossData = ({ toss, team1, team2 }) => {
  const richTossData = {
    winner_id: toss.winner_id,
    winner: null,
    decision: toss.decision,
    loser: null,
  };

  const isTeam1Winner = toss.winner_id === team1._id;

  if (isTeam1Winner) {
    richTossData.winner = team1.name_short;
    richTossData.loser = team2.name_short;
  } else {
    richTossData.winner = team2.name_short;
    richTossData.loser = team1.name_short;
  }

  return { richTossData };
};

module.exports = { setRichTossData };
