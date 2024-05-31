const Match = require("../../models/match");
const mongoose = require("mongoose");
const { addPlayerRuns } = require("./addPlayerRuns");
const { inningsSchema } = require("../../models/schemas/inningsSchema");
const { ballLogSchema } = require("../../models/schemas/ballLogSchema");
const { broadcastInningsData } = require("../broadcasts/broadcastInningsData");
const {
  updatePlayerMatchPerformance,
} = require("./updatePlayerMatchPerformance");
const { updateInningMetrics } = require("../../helpers/match");

const addRun = ({ io, runLogData }) => {
  const {
    matchId,
    battingTeamId,
    bowlingTeamId,
    onStrikeBatsman,
    offStrikeBatsman,
    bowler,
    runs_scored = 0,
    innings_no,
    isExtra = false,
    extraType,
    runs_this_ball,
  } = runLogData;

  try {
    const updateMatchRunLog = async () => {
      const match = await Match.findById(matchId);
      const { innings, total_overs } = match;

      //CREATE A NEW INNINGS IF INNINGS ARRAY IS EMPTY OR INNINGS ARRAY LENGTH IS NOT EQUAL TO INNINGS_NO
      if (innings.length === 0 || innings.length !== innings_no) {
        const newInnings = new mongoose.model("innings", inningsSchema)({
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

      const detailedExtraObject = {
        is_extra: true,
        extra_type: extraType,
        runs_this_ball,
      };

      const simpleExtraObject = {
        is_extra: false,
      };

      //CREATE A BALL_LOG ITEM AND PUSH IT TO THE RESPECTIVE INNINGS' DATA
      const newBallLogItem = new mongoose.model("Ball_logs", ballLogSchema)({
        bowler_id: bowler._id,
        on_strike_batsman_id: onStrikeBatsman._id,
        off_strike_batsman_id: offStrikeBatsman._id,
        runs_scored,
        wicket: {
          is_wicket: false,
        },
        extra: isExtra ? detailedExtraObject : simpleExtraObject,
      });

      updateInningMetrics({
        innings,
        innings_no,
        newBallLogItem,
        runs_scored,
        isExtra,
        extraType,
        runs_this_ball,
      });

      await match.save();

      addPlayerRuns({ player_id: onStrikeBatsman._id, runs_scored });
      updatePlayerMatchPerformance({
        player_id: onStrikeBatsman._id,
        runs_scored,
        match_id: matchId,
        isBattingPerformance: true,
        isbowlingPerformance: false,
      });
      broadcastInningsData(io, matchId);
    };
    updateMatchRunLog();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addRun };
