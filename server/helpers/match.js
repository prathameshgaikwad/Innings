const Player = require("../models/player");
const Team = require("../models/team");
const { setBattingAndBowlingTeamData } = require("./team");

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

const generateRichBallLogData = async (ball_log) => {
  const richBallLogData = await Promise.all(
    ball_log.map(async (ball_log_item) => {
      const { bowler_id, on_strike_batsman_id, off_strike_batsman_id } =
        ball_log_item;

      const bowler = await Player.findById(bowler_id);
      const onStrikeBatsman = await Player.findById(on_strike_batsman_id);
      const offStrikeBatsman = await Player.findById(off_strike_batsman_id);

      //TODO: Supply latest match performance

      return {
        ...ball_log_item,
        bowler,
        onStrikeBatsman,
        offStrikeBatsman,
      };
    })
  );

  return richBallLogData;
};

module.exports = {
  getRichMatchInfo,
  generateRichTossData,
  generateRichBallLogData,
};
