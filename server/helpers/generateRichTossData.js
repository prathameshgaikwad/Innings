const Team = require("../models/team");

const generateRichTossData = async ({ toss, team1_id, team2_id }) => {
  const { name_short: winner_name } = await Team.findById(toss.winner_id);
  const losingTeamId = toss.winner_id.equals(team1_id) ? team2_id : team1_id;
  const { name_short: loser_name } = await Team.findById(losingTeamId);

  const richTossData = {
    decision: toss.decision,
    winner_id: toss.winner_id,
    winner_name,
    loser_name,
    conducted: toss.conducted,
  };

  return richTossData;
};

module.exports = { generateRichTossData };
