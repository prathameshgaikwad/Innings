import { Box, Card, Divider, Sheet, Skeleton, Typography } from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import React from "react";
import RectangularSkeleton from "./RectangularSkeleton";
import SectionHeader from "../layouts/sections/SectionHeader";
import TeamBadgeHorizontalSkeleton from "./TeamBadgeHorizontalSkeleton";

const ScorecardSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80vw",
      }}>
      <SectionHeader title={"Scorecard"} />
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ width: 261, height: 44, borderRadius: 20 }}
      />
      <Card
        variant="outlined"
        size="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          px: 6,
          borderWidth: 3,
          width: "100%",
        }}>
        <Typography
          level="h3"
          color="primary"
          sx={{ my: 2 }}
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
            alignItems: "center",
            width: "100%",
            mt: 2,
          }}>
          <TeamBadgeHorizontalSkeleton isSmall={true} />
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
            color="primary"
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
