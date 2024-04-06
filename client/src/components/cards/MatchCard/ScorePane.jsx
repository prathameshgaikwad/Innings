/* eslint-disable react/prop-types */

import { Box, Divider, Stack, Typography, useTheme } from "@mui/joy";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { VscGitCommit } from "react-icons/vsc";
import { useMediaQuery } from "@mui/material";

const OPPONENT_SCORE = 196;
const OPPONENT_WICKETS = 6;

const ScorePane = ({
  totalRuns,
  totalWickets,
  oversCompleted,
  overs,
  currentRunRate,
  innings = 2,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTextOverflow = useMediaQuery(theme.breakpoints.down(1015));
  const isSecondInnings = innings === 2;
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
                mx: isMobile ? 0.5 : 1,
                color: "InactiveBorder",
              }}
            />
            <Typography
              level={isMobile ? "h4" : "h3"}
              sx={{ color: "InactiveCaptionText" }}>
              {OPPONENT_SCORE}/{OPPONENT_WICKETS}
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
