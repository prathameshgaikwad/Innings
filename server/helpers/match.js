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

  const richInningsData = await generateRichInningsData(innings);

  return (matchData = {
    _id,
    match_no,
    total_overs,
    venue,
    status,
    result,
    toss: tossData,
    innings: richInningsData,
    team1_id,
    team2_id,
    battingTeam,
    bowlingTeam,
  });
};

const generateFallOfWicketsLog = async (inningData) => {
  let fallOfWicketsLog = await Promise.all(
    inningData.ball_log.map(async (ball_log_item) => {
      if (ball_log_item.wicket.is_wicket) {
        const { bowler_id, on_strike_batsman_id, wicket } = ball_log_item;
        const { over, ball, wicket_number, total_runs, dismissal_comment } =
          wicket;

        const bowler = await Player.findById(bowler_id);
        const onStrikeBatsman = await Player.findById(on_strike_batsman_id);

        const fallOfWicketItem = {
          bowler: {
            _id: bowler_id,
            first_name: bowler.first_name,
            last_name: bowler.last_name,
          },
          onStrikeBatsman: {
            _id: on_strike_batsman_id,
            first_name: onStrikeBatsman.first_name,
            last_name: onStrikeBatsman.last_name,
          },
          wicket_number,
          over,
          ball,
          total_runs,
          dismissal_comment,
        };

        return fallOfWicketItem;
      } else {
        return null;
      }
    })
  );
  fallOfWicketsLog = fallOfWicketsLog.filter((item) => item !== null);
  return fallOfWicketsLog;
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

const generateRichInningsData = async (innings) => {
  const richInningsData = await Promise.all(
    innings.map(async (inning) => {
      const fallOfWicketsLog = await generateFallOfWicketsLog(inning.data);
      return {
        ...inning.data,
        fall_of_wickets_log: fallOfWicketsLog,
      };
    })
  );
  return richInningsData;
};

module.exports = {
  getRichMatchInfo,
  generateRichTossData,
  generateRichBallLogData,
  generateFallOfWicketsLog,
  generateRichInningsData,
};
