/* eslint-disable react/prop-types */

import { Card, CardContent } from "@mui/joy";

import BowlingStatsHeader from "./BowlingStatsHeader";
import BowlingStatsTable from "./BowlingStatsTable";
import NoData from "../../fallbacks/NoData";
import { useSelector } from "react-redux";

function createBowlingData(
  name,
  overs = 0.0,
  runs = 0,
  wickets = 0,
  economy = 0.0,
  dots = 0,
  maidens = 0
) {
  return { name, overs, runs, wickets, economy, dots, maidens };
}

const BowlingStats = ({ isLoading }) => {
  const bowler = useSelector((state) => state.matchManagement.bowler);

  const bowlingData = [
    createBowlingData("Mohammad Siraj", 4, 30, 1, "7.50", 10),
    createBowlingData(bowler.name, 4, 48, 1, "12.00", 7),
  ];

  return (
    <Card variant="plain" sx={{ width: "100%" }}>
      <CardContent>
        <BowlingStatsHeader />
        {isLoading || bowlingData.length === 0 ? (
          <NoData height={150} isSmall={true} />
        ) : (
          <BowlingStatsTable bowlingData={bowlingData} />
        )}
      </CardContent>
    </Card>
  );
};

export default BowlingStats;
