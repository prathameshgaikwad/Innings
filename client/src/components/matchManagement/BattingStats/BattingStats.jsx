/* eslint-disable react/prop-types */

import BattingStatsTable from "./BattingStatsTable";
import { Box } from "@mui/joy";
import { MdSportsCricket } from "react-icons/md";
import NoData from "../../fallbacks/NoData";
import StatsOverviewHeader from "../../layouts/StatsOverviewHeader";
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
    <Box variant="plain" sx={{ width: "100%" }}>
      <StatsOverviewHeader title={"BATTING"} startDecorator={MdSportsCricket} />
      {isLoading || battingData.length === 0 ? (
        <NoData height={150} isSmall={true} customStyles={{ my: 2 }} />
      ) : (
        <BattingStatsTable battingData={battingData} />
      )}
    </Box>
  );
};

export default BattingStats;
