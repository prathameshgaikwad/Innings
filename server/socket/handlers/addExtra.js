const { addRun } = require("./addRun");

const addExtra = ({ io, extraLogItem }) => {
  const {
    matchId,
    bowlingTeamId,
    battingTeamId,
    batsman,
    bowler,
    extraType,
    runs_this_ball = 1,
    innings_no,
  } = extraLogItem;

  const runLogData = {
    matchId,
    battingTeamId,
    bowlingTeamId,
    batsman,
    bowler,
    innings_no,
    isExtra: true,
    extraType,
    runs_this_ball,
  };

  addRun({ io, runLogData });
};

module.exports = { addExtra };
