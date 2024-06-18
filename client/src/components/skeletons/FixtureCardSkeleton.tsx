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

import VersusIcon from "../icons/VersusIcon";
import { useMediaQuery } from "@mui/material";

const FixtureCardSkeleton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      size="sm"
      variant="outlined"
      sx={{
        width: 260,
      }}>
      {/* Top Bar */}

      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <CardContent>
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "title-sm" : "title-md"}
            width={"38%"}
            sx={{ mx: "auto" }}
          />
        </CardContent>
        <Divider inset="context" />
      </CardOverflow>

      {/* Main Content */}
      <CardContent
        sx={{
          my: isMobile ? 0.75 : 1,
          mx: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
        {/* Team 1*/}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <AspectRatio
            ratio="1"
            sx={{ width: isMobile ? 45 : 65, borderRadius: "50%" }}>
            <Skeleton variant="circular" animation="wave" />
          </AspectRatio>
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "title-sm" : "title-md"}
            sx={{ mt: isMobile ? 0.75 : 1 }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          <VersusIcon />
        </Box>

        {/* Team  2*/}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <AspectRatio
            ratio="1"
            sx={{ width: isMobile ? 45 : 65, borderRadius: "50%" }}>
            <Skeleton variant="circular" animation="wave" />
          </AspectRatio>
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "title-sm" : "title-md"}
            sx={{ mt: isMobile ? 0.75 : 1 }}
          />
        </Box>
      </CardContent>

      {/* Bottom Bar */}

      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent
          orientation="horizontal"
          sx={{ justifyContent: "space-evenly" }}>
          <Skeleton animation="wave" variant="text" level={"body-xs"} />
          <Divider orientation="vertical" />
          <Skeleton animation="wave" variant="text" level={"body-xs"} />
          <Divider orientation="vertical" />
          <Skeleton animation="wave" variant="text" level={"body-xs"} />
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default FixtureCardSkeleton;
