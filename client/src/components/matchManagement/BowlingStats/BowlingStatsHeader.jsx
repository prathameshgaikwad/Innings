/* eslint-disable react/prop-types */

import { Stack, Typography } from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";

const BowlingStatsHeader = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography
        color="warning"
        level="title-md"
        startDecorator={<BiSolidCricketBall />}>
        BOWLING
      </Typography>
    </Stack>
  );
};

export default BowlingStatsHeader;
