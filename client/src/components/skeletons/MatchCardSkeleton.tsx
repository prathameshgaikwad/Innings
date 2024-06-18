import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Skeleton,
  useTheme,
} from "@mui/joy";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useMediaQuery } from "@mui/material";

const MatchCardSkeleton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTab = useMediaQuery(theme.breakpoints.down(650));

  return (
    <Card
      variant="outlined"
      sx={{
        width: isTab ? "96%" : "72%",
        minWidth: "72%",
      }}>
      {/* Top Bar */}

      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <CardContent sx={{ display: "inline-flex", flexDirection: "row" }}>
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "title-lg" : "h4"}
            width={"8%"}
          />
          <Divider orientation="vertical" />
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "title-lg" : "h4"}
          />
        </CardContent>
        <Divider inset="context" />
      </CardOverflow>

      {/* Main Content */}
      <CardContent
        sx={{
          my: isMobile ? 2 : 4,
          mx: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
        {/* Batting Team */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <AspectRatio
            ratio="1"
            sx={{ width: isMobile ? 66 : 90, borderRadius: "50%" }}>
            <Skeleton variant="circular" animation="wave" />
          </AspectRatio>
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "title-md" : "title-lg"}
            sx={{ mt: isMobile ? 1 : 2 }}
          />
        </Box>

        {/* Score Pane */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "30%",
          }}>
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "h3" : "h2"}
          />
          <Divider sx={{ my: isMobile ? 0.5 : 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              animation="wave"
              variant="text"
              level={isMobile ? "body-xs" : "body-sm"}
              sx={{ mx: isMobile ? 0.5 : 1 }}
            />{" "}
            <FiberManualRecordIcon sx={{ width: isMobile ? 6 : 8 }} />
            <Skeleton
              animation="wave"
              variant="text"
              level={isMobile ? "body-xs" : "body-sm"}
              sx={{ mx: isMobile ? 0.5 : 1 }}
            />
          </Box>
        </Box>

        {/* Bowling Team */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <AspectRatio
            ratio="1"
            sx={{ width: isMobile ? 66 : 90, borderRadius: "50%" }}>
            <Skeleton variant="circular" animation="wave" />
          </AspectRatio>
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "title-md" : "title-lg"}
            sx={{ mt: isMobile ? 1 : 2 }}
          />
        </Box>
      </CardContent>

      {/* Bottom Bar */}

      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Skeleton
            animation="wave"
            variant="text"
            level="body-xs"
            width={"10%"}
          />
          <Divider orientation="vertical" />
          <Skeleton animation="wave" variant="text" level="body-xs" />
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default MatchCardSkeleton;
