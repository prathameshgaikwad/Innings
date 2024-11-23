import { Skeleton, Stack, Typography } from "@mui/joy";

import React from "react";

const UpcomingMatchesSkeleton: React.FC = () => {
  return (
    <>
      <Stack
        sx={{
          mt: 8,
          mb: 4,
          mx: "auto",
          justifyContent: "center",
        }}
        gap={2}
        direction={"row"}>
        <Typography level="h3">Up next in </Typography>
        <Skeleton animation="wave" variant="text" level="h3" width={"25%"} />
      </Stack>
      <Skeleton
        variant="rectangular"
        height={280}
        width={"100%"}
        animation="wave"
      />
    </>
  );
};

export default UpcomingMatchesSkeleton;
