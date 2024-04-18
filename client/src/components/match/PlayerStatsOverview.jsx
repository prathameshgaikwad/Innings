/* eslint-disable react/prop-types */

import BattingStats from "../matchManagement/BattingStats/BattingStats";
import BowlingStats from "../matchManagement/BowlingStats/BowlingStats";

const PlayerStatsOverview = ({ isLoading }) => {
  return (
    <>
      <BattingStats isLoading={isLoading} />
      <BowlingStats isLoading={isLoading} />
    </>
  );
};

export default PlayerStatsOverview;
