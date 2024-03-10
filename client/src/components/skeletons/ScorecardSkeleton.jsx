import {
  Box,
  Card,
  Divider,
  Sheet,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import RectangularSkeleton from "./RectangularSkeleton";
import { useMediaQuery } from "@mui/material";

const ScorecardSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: isMobile ? "85vw" : "78vw",
      }}>
      <Box sx={{ width: "100%", mb: isMobile ? 3 : 6 }}>
        <Divider>
          <Typography
            level={isMobile ? "h4" : "h3"}
            sx={{ mx: 2 }}
            color="success">
            Scorecard
          </Typography>
        </Divider>
      </Box>
      <Skeleton
        animation="pulse"
        variant="rectangular"
        sx={{ width: 261, height: 44, borderRadius: 20 }}
      />
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          py: 3,
          px: 6,
          width: "100%",
        }}>
        <Typography
          level="h3"
          color="warning"
          startDecorator={<MdSportsCricket />}>
          Batting
        </Typography>
        <Card
          variant="soft"
          size="lg"
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            mt: 2,
          }}>
          <Skeleton animation="wave" variant="text" level="h4" width="30%" />
          <Skeleton animation="wave" variant="text" level="h4" width="10%" />
        </Card>
        <Sheet sx={{ width: "94%", overflow: "auto", my: 2 }}>
          <RectangularSkeleton height={400} />
        </Sheet>
        <Card
          variant="soft"
          size="md"
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <Typography level="title-md" color="danger">
            EXTRAS:
          </Typography>
          <Skeleton
            animation="wave"
            variant="text"
            level="title-md"
            width="25%"
          />
        </Card>
        <Card
          variant="outlined"
          size="md"
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            mb: 2,
          }}>
          <Typography level="title-sm" color="neutral">
            DID NOT BAT:
          </Typography>
          <Skeleton
            animation="wave"
            variant="text"
            level="body-sm"
            width="66%"
          />
        </Card>
        <Divider sx={{ mt: 2 }}>
          <Typography
            level="h3"
            color="warning"
            startDecorator={<BiSolidCricketBall />}
            sx={{ my: "auto", mx: 1 }}>
            Bowling
          </Typography>
        </Divider>
        <Sheet sx={{ width: "94%", overflow: "auto", my: 2 }}>
          <RectangularSkeleton height={300} />
        </Sheet>
        <RectangularSkeleton height={150} />
      </Card>
    </Box>
  );
};

export default ScorecardSkeleton;
