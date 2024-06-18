import { Box, Skeleton } from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";

const TeamBadgeHorizontalSkeleton: React.FC<{ isSmall: boolean }> = ({
  isSmall,
}) => {
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
          width: isSmall ? 70 : 80,
        }}>
        <Skeleton variant="circular" animation="wave" />
      </AspectRatio>
      <Skeleton
        animation="wave"
        variant="text"
        level={isSmall ? "title-lg" : "h3"}
      />
      <Skeleton animation="wave" variant="text" level={"body-sm"} width={80} />
    </Box>
  );
};

export default TeamBadgeHorizontalSkeleton;
