const mongoose = require("mongoose");
const Match = require("../../models/match");
const { ballLogSchema } = require("../../models/schemas/ballLogSchema");
const {
  fallOfWicketSchema,
} = require("../../models/schemas/fallOfWicketSchema");
const Player = require("../../models/player");
const {
  updatePlayerMatchPerformance,
} = require("./updatePlayerMatchPerformance");
const { addPlayerRuns } = require("./addPlayerRuns");
const { updateInningMetrics } = require("../../helpers/match");

const addWicket = ({ io, wicketLogItem }) => {
  const {
    match_id,
    runs_this_ball,
    on_strike_batsman_id,
    off_strike_batsman_id,
    bowler_id,
    wicket_number,
    over,
    ball,
    total_runs,
    dismissal_comment,
  } = wicketLogItem;

  try {
    const addNewWicket = async () => {
      const match = await Match.findById(match_id);

      if (!match) {
        throw new Error("Match not found");
      }

      const latestInningsData = match.innings[match.innings.length - 1].data;

      // UPDATE WICKET COUNT
      latestInningsData.total_wickets += 1;
      await match.save();

      // UPDATE BALL LOG
      // const newBallLogItem = new mongoose.model("Ball_logs", ballLogSchema)({
      //   bowler_id,
      //   on_strike_batsman_id,
      //   off_strike_batsman_id: off_strike_batsman_id || null,
      //   runs_scored: runs_this_ball,
      //   wicket: {
      //     is_wicket: true,
      //     wicket_number,
      //     runs_this_ball,
      //     dismissal_comment,
      //     over,
      //     ball,
      //     total_runs,
      //   },
      //   extra: {
      //     is_extra: false,
      //   },
      // });

      // latestInningsData.ball_log.push(newBallLogItem);

      // // UPDATE INNING METRICS IF RUNS THIS BALL
      // if (runs_this_ball) {
      //   updateInningMetrics({
      //     innings,
      //     innings_no: innings.length - 1,
      //     newBallLogItem,
      //     runs_this_ball,
      //     isExtra: false,
      //     extraType: null,
      //   });
      // }

      // // UPDATE FALL OF WICKET LOG
      // const newFallOfWicketLogItem = new mongoose.model(
      //   "Fall_of_wickets",
      //   fallOfWicketSchema
      // )({
      //   bowler_id,
      //   on_strike_batsman_id,
      //   wicket_number,
      //   over,
      //   ball,
      //   total_runs,
      //   dismissal_comment,
      // });
      // latestInningsData.fall_of_wickets_log.push(newFallOfWicketLogItem);

      // // UPDATE BATSMAN PERFORMANCE
      // addPlayerRuns({
      //   player_id: on_strike_batsman_id,
      //   runs_scored: runs_this_ball,
      // });
      // updatePlayerMatchPerformance({
      //   player_id: on_strike_batsman_id,
      //   runs_scored: runs_this_ball,
      //   match_id,
      //   isBattingPerformance: true,
      //   isbowlingPerformance: false,
      // });

      // // UPDATE BOWLER PERFORMANCE
      // updatePlayerMatchPerformance({
      //   player_id: bowler_id,
      //   match_id,
      //   runs_conceded: runs_this_ball,
      //   isBattingPerformance: false,
      //   isbowlingPerformance: true,
      // });
    };
    addNewWicket();

    // EVENTUALLY SEND FALL OF WICKET LOG ITEM ID TO CLIENT TO CONFIRM OPTIMISTIC UPDATE
    // const sendFallOfWicketID = async () => {};
    // sendFallOfWicketID();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addWicket };
