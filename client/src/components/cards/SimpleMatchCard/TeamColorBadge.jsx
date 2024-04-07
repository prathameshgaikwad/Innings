/* eslint-disable react/prop-types */

import { Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TeamColorBadge = ({ teamColor }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Typography
      bgcolor={teamColor}
      sx={{
        mr: 0.5,
        height: isMobile ? 18 : 24,
        width: 4,
      }}>
      &nbsp;
    </Typography>
  );
};

export default TeamColorBadge;
