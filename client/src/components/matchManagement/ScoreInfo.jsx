/* eslint-disable react/prop-types */

import {
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Stack,
  Typography,
} from "@mui/joy";

import ScoreInfoSkeleton from "../skeletons/ScoreInfoSkeleton";
import { useSelector } from "react-redux";

const ScoreInfo = ({ isLoading }) => {
  const matchManagement = useSelector((state) => state.matchManagement);
  const totalOvers = matchManagement.total_overs || 0;
  const battingTeam = matchManagement.battingTeam || "ABC";
  const runs = matchManagement.runs || 0;
  const wickets = matchManagement.wickets || 0;

  const overs = "6.3";
  const crr = "11.08";
  const extrasCount = "7";
  const extrasDetails = {
    wide: 4,
    noBall: 1,
    bye: 1,
    legBye: 1,
  };

  return (
    <>
      {isLoading ? (
        <ScoreInfoSkeleton />
      ) : (
        <Box>
          <Card sx={{ width: 320 }} variant="outlined">
            <CardContent
              orientation="horizontal"
              sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography level="h2">{battingTeam.name_short}</Typography>
              <Typography level="h2">
                {runs}/{wickets}
              </Typography>
            </CardContent>
            <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
              <Divider inset="context" />
              <CardContent
                orientation="horizontal"
                sx={{ justifyContent: "space-between" }}>
                <Typography level="body-xs" textColor="text.secondary">
                  {overs}/{totalOvers} Overs
                </Typography>
                <Typography level="body-xs" textColor="text.secondary">
                  CRR: {crr}
                </Typography>
              </CardContent>
            </CardOverflow>
          </Card>
          <Stack direction="row" px={2} justifyContent="space-between" mt={2}>
            <Typography level="body-xs">Extras: {extrasCount}</Typography>
            <Typography level="body-xs">
              (WD: {extrasDetails.wide}, NB: {extrasDetails.noBall}, B:{" "}
              {extrasDetails.bye}, LB:{extrasDetails.legBye})
            </Typography>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ScoreInfo;
