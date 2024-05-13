const { addRun } = require("./addRun");

const addExtra = ({ io, extraLogItem }) => {
  const {
    matchId,
    bowlingTeamId,
    battingTeamId,
    onStrikeBatsman,
    offStrikeBatsman,
    bowler,
    extraType,
    runs_this_ball = 1,
    innings_no,
  } = extraLogItem;

  const runLogData = {
    matchId,
    battingTeamId,
    bowlingTeamId,
    onStrikeBatsman,
    offStrikeBatsman,
    bowler,
    innings_no,
    isExtra: true,
    extraType,
    runs_this_ball,
  };

  addRun({ io, runLogData });
};

module.exports = { addExtra };
