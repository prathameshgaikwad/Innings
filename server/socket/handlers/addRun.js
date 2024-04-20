const Match = require("../../models/match");
const mongoose = require("mongoose");
const { broadcastMatchData } = require("../broadcasts/broadcastMatchData");
const { addPlayerRuns } = require("./addPlayerRuns");
const { inningsSchema } = require("../../models/schemas/inningsSchema");
const { ballLogSchema } = require("../../models/schemas/ballLogSchema");

const addRun = (io, runLogData) => {
  const {
    matchId,
    battingTeamId,
    bowlingTeamId,
    batsman,
    bowler,
    runs_scored,
    innings_no,
  } = runLogData;

  try {
    const updateMatchRunLog = async () => {
      const match = await Match.findById(matchId);
      const { innings, total_overs } = match;

      //CREATE A NEW INNINGS IF INNINGS ARRAY IS EMPTY OR INNINGS ARRAY LENGTH IS NOT EQUAL TO INNINGS_NO
      if (innings.length === 0 || innings.length !== innings_no) {
        const newInnings = new mongoose.model("Innings", inningsSchema)({
          match_id: matchId,
          innings_no: 1,
          data: {
            batting_team_id: battingTeamId,
            bowling_team_id: bowlingTeamId,
            total_overs,
          },
        });
        innings.push(newInnings);
      }

      //CREATE A BALL_LOG ITEM AND PUSH IT TO THE RESPECTIVE INNINGS' DATA
      const newBallLogItem = new mongoose.model("Ball_logs", ballLogSchema)({
        bowler_id: bowler._id,
        batsman_id: batsman._id,
        runs_scored,
        wicket: {
          is_wicket: false,
        },
        extra: {
          is_extra: false,
        },
      });

      innings[innings_no - 1].data.ball_log.push(newBallLogItem);
      innings[innings_no - 1].data.total_runs += runs_scored;
      innings[innings_no - 1].data.balls_completed += 1;
      await match.save();

      addPlayerRuns({ player_id: batsman._id, runs_scored });
      // broadcastMatchData(io, matchId);
    };
    updateMatchRunLog();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addRun };
