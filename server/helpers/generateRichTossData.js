const Team = require("../models/team");

const generateRichTossData = async ({ toss }) => {
  const { name_short: winner_name } = await Team.findById(toss.winner_id);
  const losingTeamId = toss.winner_id === match.team1_id ? team2_id : team1_id;
  const { name_short: loser_name } = await Team.findById(losingTeamId);

  const richTossData = {
    decision: toss.decision,
    winner_id: toss.winner_id,
    winner_name,
    loser_name,
  };

  return richTossData;
};

module.exports = { generateRichTossData };
