/* eslint-disable react/prop-types */

import { Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TeamBadgeHorizontal = ({ teamColor, nameShort, name }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Typography
      variant="soft"
      level={isMobile ? "h4" : "h3"}
      sx={{ borderBottom: 4, borderColor: teamColor, p: 1 }}>
      {isMobile ? nameShort : name}
    </Typography>
  );
};

export default TeamBadgeHorizontal;
