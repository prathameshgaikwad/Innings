/* eslint-disable react/prop-types */

import { Card, CardContent } from "@mui/joy";

import BattingStatsHeader from "./BattingStatsHeader";
import BattingStatsTable from "./BattingStatsTable";
import NoData from "../../fallbacks/NoData";
import { useSelector } from "react-redux";

function createBattingData(
  sr_no,
  name,
  wicket,
  runs,
  balls,
  fours,
  sixes,
  strike_rate
) {
  return { sr_no, name, wicket, runs, balls, fours, sixes, strike_rate };
}

const BattingStats = ({ isLoading }) => {
  const batsmen = useSelector((state) => state.matchManagement.batsmen);

  const battingData = [
    createBattingData(
      "1",
      batsmen.onStrikeBatsman.name,
      "",
      3,
      6,
      0,
      0,
      "50.00"
    ),
    createBattingData(
      "2",
      batsmen.offStrikeBatsman.name,
      "",
      83,
      45,
      6,
      6,
      "184.44"
    ),
  ];

  return (
    <Card variant="plain" sx={{ width: "100%" }}>
      <CardContent>
        <BattingStatsHeader />
        {isLoading || battingData.length === 0 ? (
          <NoData height={150} isSmall={true} />
        ) : (
          <BattingStatsTable battingData={battingData} />
        )}
      </CardContent>
    </Card>
  );
};

export default BattingStats;
