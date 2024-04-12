/* eslint-disable react/prop-types */

import { Stack, Typography } from "@mui/joy";

import { MdSportsCricket } from "react-icons/md";
import SelectPlayer from "../SelectPlayer";

const BattingStatsHeader = ({ rawPlayersData, batsmenCount, isLoading }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography
        color="warning"
        level="title-md"
        startDecorator={<MdSportsCricket />}>
        BATTING
      </Typography>
      {rawPlayersData && batsmenCount !== 2 && (
        <SelectPlayer
          playerType={"Batsman"}
          rawPlayersData={rawPlayersData}
          disabled={isLoading}
        />
      )}
    </Stack>
  );
};

export default BattingStatsHeader;
