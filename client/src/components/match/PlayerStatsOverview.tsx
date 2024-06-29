import BattingStats from "../matchManagement/BattingStats/BattingStats";
import BowlingStats from "../matchManagement/BowlingStats/BowlingStats";
import React from "react";

const PlayerStatsOverview: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  return (
    <>
      <BattingStats isLoading={isLoading} />
      <BowlingStats isLoading={isLoading} />
    </>
  );
};

export default PlayerStatsOverview;
