const Team = require("../models/team");
const { generateRichTossData } = require("./generateRichTossData");
const {
  setBattingAndBowlingTeamData,
} = require("./setBattingAndBowlingTeamData");

const getRichMatchInfo = async ({
  _id,
  team1_id,
  team2_id,
  innings,
  toss,
  match_no,
  total_overs,
  venue,
  status,
  result,
}) => {
  const team1 = await Team.findById(team1_id);
  const team2 = await Team.findById(team2_id);

  const { battingTeam, bowlingTeam } = await setBattingAndBowlingTeamData({
    innings,
    team1,
    team2,
    toss,
  });

  let tossData = toss;

  if (toss.conducted) {
    tossData = await generateRichTossData({
      toss,
      team1_id,
      team2_id,
    });
  }

  return (matchData = {
    _id,
    match_no,
    total_overs,
    venue,
    status,
    result,
    toss: tossData,
    innings,
    team1_id,
    team2_id,
    battingTeam,
    bowlingTeam,
  });
};

module.exports = { getRichMatchInfo };
