/* eslint-disable react/prop-types */

import { CardContent, Divider, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TopBar = ({ match_no, battingTeamName, bowlingTeamName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <CardContent
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Typography level={isMobile ? "title-lg" : "h4"} color="neutral">
          # {match_no}
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          level={isMobile ? "title-lg" : "h4"}
          sx={{ color: "text.tertiary" }}>
          {battingTeamName}
        </Typography>
        vs
        <Typography
          level={isMobile ? "title-lg" : "h4"}
          sx={{ color: "text.tertiary" }}>
          {bowlingTeamName}
        </Typography>
      </CardContent>
      <Divider inset="context" />
    </>
  );
};

export default TopBar;
