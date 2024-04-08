/* eslint-disable react/prop-types */

import { Box, Divider, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const ScorecardHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
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
  );
};

export default ScorecardHeader;
