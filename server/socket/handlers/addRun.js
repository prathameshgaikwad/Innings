const Match = require("../../models/match");
const { broadcastMatchData } = require("../broadcasts/broadcastMatchData");
const { addPlayerRuns } = require("./addPlayerRuns");

const addRun = (io, runLogData) => {
  const { match_id, batting_team_id, batsman, bowler, score } = runLogData;
  try {
    const updateMatchRunLog = async () => {
      const match = await Match.findById(match_id);

      const isTeam1 = match.team1_id.toString() === batting_team_id;

      const runLogItem = {
        run_scorer: batsman._id,
        score,
      };
      const ballLogItem = {
        bowler: bowler._id,
        runs_conceded: score,
        wicket: {
          isWicket: false,
        },
      };

      if (isTeam1) {
        match.team1_run_log.push(runLogItem);
        match.team1_runs = match.team1_runs + score;
        if (score === 4) match.team1_fours++;
        else if (score === 6) match.team1_sixes++;
        match.team2_ball_log.push(ballLogItem);
      } else {
        match.team2_run_log.push(runLogItem);
        match.team2_runs = match.team2_runs + score;
        if (score === 4) match.team2_fours++;
        else if (score === 6) match.team2_sixes++;
        match.team1_ball_log.push(ballLogItem);
      }

      await match.save();

      addPlayerRuns(batsman._id, score);
      broadcastMatchData(io, match_id);
    };
    updateMatchRunLog();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addRun };
