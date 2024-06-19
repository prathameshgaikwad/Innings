import { Box, Divider, Stack, Typography, useTheme } from "@mui/joy";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Innings } from "../../../types";
import React from "react";
import { VscGitCommit } from "react-icons/vsc";
import { useMediaQuery } from "@mui/material";

type ScorePaneProps = {
  totalRuns: number;
  totalWickets: number;
  oversCompleted: number;
  overs: number;
  currentRunRate: number;
  current_innings_no: number;
  inningsData: Innings[];
};

const ScorePane: React.FC<ScorePaneProps> = ({
  totalRuns,
  totalWickets,
  oversCompleted,
  overs,
  currentRunRate,
  current_innings_no = 1,
  inningsData,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTextOverflow = useMediaQuery(theme.breakpoints.down(1015));
  const isSecondInnings = current_innings_no === 2;

  let previousInningsPerformance = {
    total_runs: 0,
    total_wickets: 0,
  };

  if (isSecondInnings) {
    const previousInningsData = inningsData[current_innings_no - 2]?.data ?? {};
    previousInningsPerformance = {
      total_runs: previousInningsData?.total_runs || 0,
      total_wickets: previousInningsData?.total_wickets || 0,
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <Stack
        direction="row"
        gap={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography level={isMobile ? "h3" : "h2"}>
          {totalRuns} - {totalWickets}
        </Typography>
        {isSecondInnings && (
          <>
            <VscGitCommit
              style={{
                margin: isMobile ? 0.5 : 1,
                color: "InactiveBorder",
              }}
            />
            <Typography
              level={isMobile ? "h4" : "h3"}
              sx={{ color: "InactiveCaptionText" }}>
              {previousInningsPerformance.total_runs}/
              {previousInningsPerformance.total_wickets}
            </Typography>
          </>
        )}
      </Stack>
      <Divider sx={{ my: isMobile ? 0.5 : 1 }} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          level={isMobile ? "body-xs" : "body-sm"}
          sx={{ mx: isMobile ? 0.5 : 1 }}>
          {!isTextOverflow && "Overs: "}
          {oversCompleted}/{overs}
        </Typography>
        <FiberManualRecordIcon sx={{ width: isMobile ? 6 : 8 }} />
        <Typography
          level={isMobile ? "body-xs" : "body-sm"}
          sx={{ mx: isMobile ? 0.5 : 1 }}>
          {!isTextOverflow && "CRR: "}
          {currentRunRate}
        </Typography>
      </Box>
    </Box>
  );
};

export default ScorePane;
