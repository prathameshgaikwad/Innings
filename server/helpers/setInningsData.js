const setInningsData = ({ data, battingTeam, team1_id, team2_id }) => {
  if (battingTeam._id === team1_id) return data.team1;
  else return data.team2;
};

module.exports = { setInningsData };
