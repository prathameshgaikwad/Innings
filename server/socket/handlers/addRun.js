const Match = require("../../models/match");
const mongoose = require("mongoose");
const { addPlayerRuns } = require("./addPlayerRuns");
const { inningsSchema } = require("../../models/schemas/inningsSchema");
const { ballLogSchema } = require("../../models/schemas/ballLogSchema");
const { broadcastInningsData } = require("../broadcasts/broadcastInningsData");

const addRun = ({ io, runLogData }) => {
  const {
    matchId,
    battingTeamId,
    bowlingTeamId,
    batsman,
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
        batsman_id: batsman._id,
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

      addPlayerRuns({ player_id: batsman._id, runs_scored });
      broadcastInningsData(io, matchId);
    };
    updateMatchRunLog();
  } catch (error) {
    console.log(error);
  }
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

module.exports = { addRun };
