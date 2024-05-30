const Match = require("../../models/match");
const { startTransaction } = require("../../utils/database");
const { updateWicketCount } = require("../../services/matchService");

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
      const session = await startTransaction();
      const { innings } = await Match.findById(match_id);
      const innings_id = innings[innings.length - 1]._id;

      await updateWicketCount({
        match_id,
        innings_id,
        increment: 1,
        session,
      });
    };
    addNewWicket();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addWicket };
