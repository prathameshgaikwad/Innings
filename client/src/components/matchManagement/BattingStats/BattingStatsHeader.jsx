/* eslint-disable react/prop-types */

import { Stack, Typography } from "@mui/joy";

import { MdSportsCricket } from "react-icons/md";

const BattingStatsHeader = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography
        color="warning"
        level="title-md"
        startDecorator={<MdSportsCricket />}>
        BATTING
      </Typography>
    </Stack>
  );
};

export default BattingStatsHeader;
