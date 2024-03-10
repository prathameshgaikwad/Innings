/* eslint-disable react/prop-types */

import { Box, Skeleton } from "@mui/joy";

import RectangularSkeleton from "./RectangularSkeleton";

const TournamentStatisticsListSkeleton = ({ isMobile }) => {
  return (
    <Box mt={4} width={"100%"}>
      <Skeleton
        variant="text"
        level={isMobile ? "h3" : "h2"}
        animation="wave"
        width={"36%"}
      />
      <Box mt={2}>
        <RectangularSkeleton height={138} />
      </Box>
    </Box>
  );
};

export default TournamentStatisticsListSkeleton;
