/* eslint-disable react/prop-types */

import { Box, Divider, Stack, Typography, useTheme } from "@mui/joy";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useMediaQuery } from "@mui/material";

const ScorePane = ({
  totalRuns,
  totalWickets,
  oversCompleted,
  overs,
  currentRunRate,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTextOverflow = useMediaQuery(theme.breakpoints.down(1015));
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
