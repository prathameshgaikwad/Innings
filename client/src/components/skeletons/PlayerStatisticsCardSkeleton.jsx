/* eslint-disable react/prop-types */

import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Skeleton,
  useTheme,
} from "@mui/joy";

const PlayerStatisticsCardSkeleton = ({ isUser }) => {
  const theme = useTheme();
  return (
    <Card
      variant="soft"
      sx={{
        textAlign: "center",
        alignItems: "center",
        overflow: "auto",
        width: isUser ? 380 : 220,
      }}>
      <CardOverflow
        variant="soft"
        sx={{ backgroundColor: theme.palette.neutral[600] }}>
        <AspectRatio
          ratio="1"
          sx={{
            m: "auto",
            transform: "translateY(50%)",
            borderRadius: "50%",
            width: isUser ? 150 : 100,
            position: "relative",
          }}>
          <Skeleton variant="circular" animation="wave" />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        sx={{
          mt: isUser ? 10 : 7,
          width: "100%",
          mb: 2,
          alignItems: "center",
        }}>
        <Skeleton
          animation="wave"
          variant="text"
          level={isUser ? "h2" : "h4"}
          width={"70%"}
        />
        <Skeleton
          animation="wave"
          variant="text"
          level={isUser ? "body-lg" : "body-sm"}
          width={"85%"}
        />
      </CardContent>
      <Skeleton animation="wave" variant="text" level="body-sm" width={"86%"} />
      <Skeleton animation="wave" variant="text" level="body-sm" width={"86%"} />
      <Skeleton animation="wave" variant="text" level="body-sm" width={"86%"} />
    </Card>
  );
};

export default PlayerStatisticsCardSkeleton;
