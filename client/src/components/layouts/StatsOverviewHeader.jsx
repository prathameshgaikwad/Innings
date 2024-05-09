/* eslint-disable react/prop-types */

import { Stack, Typography } from "@mui/joy";

const StatsOverviewHeader = ({ title, startDecorator: StartDecorator }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography
        color="primary"
        level="title-md"
        startDecorator={<StartDecorator />}>
        {title}
      </Typography>
    </Stack>
  );
};

export default StatsOverviewHeader;
