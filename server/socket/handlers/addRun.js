const Match = require("../../models/match");
const Innings = require("../../models/innings");
const BallLog = require("../../models/ballLog");
const { broadcastMatchData } = require("../broadcasts/broadcastMatchData");
const { addPlayerRuns } = require("./addPlayerRuns");

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
      const { innings } = match.toObject();

      //CREATE A NEW INNINGS IF INNINGS ARRAY IS EMPTY OR INNINGS ARRAY LENGTH IS NOT EQUAL TO INNINGS_NO
      if (innings.length === 0 || innings.length !== innings_no) {
        const newInnings = new Innings({
          match_id: matchId,
          innings_no: 1,
          data: {
            batting_team_id: battingTeamId,
            bowling_team_id: bowlingTeamId,
          },
        });
        await newInnings.save();
        innings.push(newInnings._id);
        await match.save();
      }

      //CREATE A BALL_LOG ITEM AND PUSH IT TO THE RESPECTIVE INNINGS' DATA
      const newBallLogItem = new BallLog({
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

      await newBallLogItem.save();
      innings[innings_no - 1].data.ball_log.push(newBallLogItem._id);
      await innings.save();

      addPlayerRuns({ player_id: batsman._id, runs_scored });
      // broadcastMatchData(io, matchId);
    };
    updateMatchRunLog();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addRun };
