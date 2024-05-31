const Match = require("../models/match");
const { inningsSchema } = require("../models/schemas/inningsSchema");
const mongoose = require("mongoose");

async function ensureInningsStructure({
  match,
  innings_no,
  battingTeamId,
  bowlingTeamId,
}) {
  const { innings, _id, total_overs } = match;

  //CREATE A NEW INNINGS IF INNINGS ARRAY IS EMPTY OR INNINGS ARRAY LENGTH IS NOT EQUAL TO INNINGS_NO
  if (innings.length === 0 || innings.length !== innings_no) {
    const newInnings = new mongoose.model("innings", inningsSchema)({
      match_id: _id,
      innings_no: 1,
      data: {
        batting_team_id: battingTeamId,
        bowling_team_id: bowlingTeamId,
        total_overs,
      },
    });
    innings.push(newInnings);
  }
  return match;
}

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

async function updateFallOfWicketsLog({
  match_id,
  innings_id,
  fall_of_wicket_entry,
}) {
  await Match.updateOne(
    { _id: match_id, "innings._id": innings_id },
    { $push: { "innings.$.data.fall_of_wickets_log": fall_of_wicket_entry } }
  );
}

module.exports = {
  ensureInningsStructure,
  updateWicketCount,
  updateBallLog,
  updateInningsMetrics,
  updateFallOfWicketsLog,
};
