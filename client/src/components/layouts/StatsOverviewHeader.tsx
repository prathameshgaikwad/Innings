import { Stack, Typography } from "@mui/joy";

import React from "react";

type StatsOverviewHeaderProps = {
  title: string;
  startDecorator: React.ComponentType;
};

const StatsOverviewHeader: React.FC<StatsOverviewHeaderProps> = ({
  title,
  startDecorator: StartDecorator,
}) => {
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
