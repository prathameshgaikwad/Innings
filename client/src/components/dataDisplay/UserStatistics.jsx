import { Box, Typography, useTheme } from "@mui/joy";

import PlayerStatisticsCard from "../cards/PlayerStatisticsCard";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const UserStatistics = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { first_name, last_name, profile_image_url } = useSelector(
    (state) => state.user.user
  );

  const userName = `${first_name} ${last_name}`;

  //pName, teamName,  runs, avg, sr, high,  w, econ, imgURL, teamColor, [matches, debut, 50s, 100s, 4s, 6s,]
  const userData = [
    userName,
    "Gujarat Titans",
    "156",
    "59.33",
    "117.80",
    "43*",
    "12",
    "9.56",
    profile_image_url,
    "#77C7F2",
    ["16", "2023", "2", "0", "12", "3"],
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 8,
          alignItems: "end",
          width: "100%",
          justifyContent: "space-between",
          mb: 4,
        }}>
        <Typography level={isMobile ? "h3" : "h2"}>My Statistics</Typography>
        <Typography
          level={isMobile ? "h3" : "h2"}
          color="primary"
          sx={{ opacity: 0.5 }}>
          {userName}
        </Typography>
      </Box>
      <PlayerStatisticsCard data={userData} isUser={true} />
    </>
  );
};

export default UserStatistics;
