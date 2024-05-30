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

module.exports = { updateWicketCount, updateBallLog };
