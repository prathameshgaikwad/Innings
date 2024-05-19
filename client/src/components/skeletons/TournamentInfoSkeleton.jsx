import { Box, Divider, Skeleton, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TournamentInfoSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "inline-flex",
        width: "100%",
        gap: isMobile ? 1.3 : 4,
        py: 1.5,
        justifyContent: "center",
      }}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={25}
        width={100}
        level="body-xs"
      />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={25}
        width={100}
        level="body-xs"
      />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={25}
        width={250}
        level="body-xs"
      />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={25}
        width={100}
        level="body-xs"
      />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={25}
        width={100}
        level="body-xs"
      />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={25}
        width={100}
        level="body-xs"
      />
    </Box>
  );
};

export default TournamentInfoSkeleton;
