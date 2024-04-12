/* eslint-disable react/prop-types */

import { Stack, Typography } from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";
import SelectPlayer from "../SelectPlayer";

const BowlingStatsHeader = ({
  rawPlayersData,
  isBowlerSelected,
  isLoading,
}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography
        color="warning"
        level="title-md"
        startDecorator={<BiSolidCricketBall />}>
        BOWLING
      </Typography>
      {rawPlayersData && !isBowlerSelected && (
        <SelectPlayer
          playerType={"Bowler"}
          rawPlayersData={rawPlayersData}
          disabled={isLoading}
        />
      )}
    </Stack>
  );
};

export default BowlingStatsHeader;
