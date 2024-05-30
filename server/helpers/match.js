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

const updateInningMetrics = ({
  innings,
  innings_no,
  newBallLogItem,
  runs_scored,
  isExtra,
  extraType,
  runs_this_ball,
}) => {
  const newRunsScored = (runs_scored ?? 0) + (runs_this_ball ?? 0);

  innings[innings_no - 1].data.ball_log.push(newBallLogItem);
  innings[innings_no - 1].data.total_runs += newRunsScored;
  innings[innings_no - 1].data.balls_completed += isExtra ? 0 : 1;
  innings[innings_no - 1].data.total_fours += runs_scored === 4 ? 1 : 0;
  innings[innings_no - 1].data.total_sixes += runs_scored === 6 ? 1 : 0;
  innings[innings_no - 1].data.extras.total += isExtra ? 1 : 0;
  innings[innings_no - 1].data.extras.wides += extraType === "WD" ? 1 : 0;
  innings[innings_no - 1].data.extras.byes += extraType === "B" ? 1 : 0;
  innings[innings_no - 1].data.extras.leg_byes += extraType === "LB" ? 1 : 0;
  innings[innings_no - 1].data.extras.no_balls += extraType === "NB" ? 1 : 0;
  innings[innings_no - 1].data.extras.penalties += extraType === "P" ? 1 : 0;
};

module.exports = {
  getRichMatchInfo,
  generateRichTossData,
  generateRichBallLogData,
  updateInningMetrics,
};
