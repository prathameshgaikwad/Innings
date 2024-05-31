const Match = require("../models/match");

async function updateWicketCount({ match_id, innings_id, increment }) {
  await Match.updateOne(
    { _id: match_id, "innings._id": innings_id },
    { $inc: { "innings.$.data.total_wickets": increment } }
  );
}

async function updateBallLog({ match_id, innings_id, ball_log_entry }) {
  await Match.updateOne(
    { _id: match_id, "innings._id": innings_id },
    { $push: { "innings.$.data.ball_log": ball_log_entry } }
  );
}

async function updateInningsMetrics({
  match_id,
  innings_id,
  runs_scored,
  valid_ball,
}) {
  await Match.updateOne(
    { _id: match_id, "innings._id": innings_id },
    {
      $inc: {
        "innings.$.data.total_runs": runs_scored,
        "innings.$.data.balls_completed": valid_ball ? 1 : 0,
        "innings.$.data.total_fours": runs_scored === 4 ? 1 : 0,
        "innings.$.data.total_sixes": runs_scored === 6 ? 1 : 0,
      },
    }
  );
}

module.exports = { updateWicketCount, updateBallLog, updateInningsMetrics };
