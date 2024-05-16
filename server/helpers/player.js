const {
  matchPerformanceSchema,
} = require("../models/schemas/matchPerformanceSchema");
const mongoose = require("mongoose");

const setPlayerStrikeRate = (matchPerformanceObject) => {
  matchPerformanceObject.batting_performance.strike_rate =
    (matchPerformanceObject.batting_performance.runs_scored /
      matchPerformanceObject.batting_performance.balls_faced) *
    100;
};

const handleBattingPerformance = ({ matchPerformanceObj, runs_scored }) => {
  const { batting_performance } = matchPerformanceObj;

  if (runs_scored === 4) {
    batting_performance.fours += 1;
  } else if (runs_scored === 6) {
    batting_performance.sixes += 1;
  }

  batting_performance.runs_scored += runs_scored;
  batting_performance.balls_faced += 1;
  setPlayerStrikeRate(matchPerformanceObj);
};

const getMatchPerformanceObject = async ({ match_id, player }) => {
  // CREATE A NEW OBJECT IF MATCH PERFORMANCE ARRAY IS EMPTY
  if (player.match_performances.length === 0) {
    const newMatchPerformanceObj = new mongoose.model(
      "MatchPerformance",
      matchPerformanceSchema
    )({
      match_id,
    });
    // PUSH IT TO THE PLAYER MATCH PERFORMANCE ARRAY
    player.match_performances.push(newMatchPerformanceObj);
    await player.save();
  }

  // RETURN THE MATCH PERFORMANCE OBJECT IF IT EXISTS
  return player.match_performances.find((matchPerformanceObj) => {
    if (matchPerformanceObj.match_id.equals(match_id)) {
      return matchPerformanceObj;
    }
  });
};

module.exports = {
  setPlayerStrikeRate,
  handleBattingPerformance,
  getMatchPerformanceObject,
};
