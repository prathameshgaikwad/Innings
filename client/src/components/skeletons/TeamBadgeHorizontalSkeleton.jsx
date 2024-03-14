/* eslint-disable react/prop-types */

import { Box, Skeleton } from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";

const TeamBadgeHorizontalSkeleton = ({ isSmall }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}>
      <AspectRatio
        ratio="1"
        sx={{
          borderRadius: "50%",
          border: "4px solid",
          width: isSmall ? 40 : 50,
        }}>
        <Skeleton variant="circular" animation="wave" />
      </AspectRatio>
      <Skeleton
        animation="wave"
        variant="text"
        level={isSmall ? "title-lg" : "h3"}
        width={150}
      />
    </Box>
  );
};

export default TeamBadgeHorizontalSkeleton;
