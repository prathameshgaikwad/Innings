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
const { ensureInningsStructure } = require("../../services/matchService");

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
      let match = await Match.findById(matchId);

      match = await ensureInningsStructure({
        match,
        innings_no,
        battingTeamId,
        bowlingTeamId,
      });

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
