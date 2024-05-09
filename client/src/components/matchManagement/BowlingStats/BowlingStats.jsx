/* eslint-disable react/prop-types */

import { BiSolidCricketBall } from "react-icons/bi";
import BowlingStatsTable from "./BowlingStatsTable";
import { Box } from "@mui/joy";
import NoData from "../../fallbacks/NoData";
import StatsOverviewHeader from "../../layouts/StatsOverviewHeader";
import { useSelector } from "react-redux";

function createBowlingData(
  sr_no,
  name,
  overs = 0.0,
  runs = 0,
  wickets = 0,
  economy = 0.0,
  dots = 0,
  maidens = 0
) {
  return { sr_no, name, overs, runs, wickets, economy, dots, maidens };
}

const BowlingStats = ({ isLoading }) => {
  const bowler = useSelector((state) => state.matchManagement.bowler);

  const bowlingData = [
    createBowlingData(1, "Mohammad Siraj", 4, 30, 1, "7.50", 10),
    createBowlingData(2, bowler.name, 4, 48, 1, "12.00", 7),
  ];

  return (
    <Box variant="plain" sx={{ width: "100%" }}>
      <StatsOverviewHeader
        title={"BOWLING"}
        startDecorator={BiSolidCricketBall}
      />
      {isLoading || bowlingData.length === 0 ? (
        <NoData height={150} isSmall={true} customStyles={{ my: 2 }} />
      ) : (
        <BowlingStatsTable bowlingData={bowlingData} />
      )}
    </Box>
  );
};

export default BowlingStats;
