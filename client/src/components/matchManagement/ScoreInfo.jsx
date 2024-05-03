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
import {
  getCompletedOvers,
  getCurrentRunRate,
} from "../../utilities/helpers/matchMetrics";

import ScoreInfoSkeleton from "../skeletons/ScoreInfoSkeleton";
import { useSelector } from "react-redux";

const ScoreInfo = ({ isLoading }) => {
  const current_innings_no = useSelector(
    (state) => state.matchManagement.current_innings_no
  );
  const latestInningsData = useSelector(
    (state) => state.matchManagement.innings[current_innings_no - 1]?.data
  );
  const totalOvers = latestInningsData?.total_overs || 0;
  const battingTeam =
    useSelector((state) => state.matchManagement.battingTeam) || "ABC";
  const runs = latestInningsData?.total_runs || 0;
  const wickets = latestInningsData?.total_wickets || 0;

  const overs = getCompletedOvers(latestInningsData?.balls_completed);
  const crr = getCurrentRunRate({
    total_runs: latestInningsData?.total_runs,
    total_overs_completed: overs,
  });
  const {
    total: extrasCount,
    wides,
    no_balls,
    byes,
    leg_byes,
    penalties,
  } = latestInningsData?.extras ?? {};

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
              (WD: {wides}, NB: {no_balls}, B: {byes}, LB:{leg_byes}, P:
              {penalties})
            </Typography>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ScoreInfo;
