/* eslint-disable react/prop-types */

import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Typography,
  useTheme,
} from "@mui/joy";
import { useEffect, useState } from "react";

import FixtureCardSkeleton from "../skeletons/FixtureCardSkeleton";
import { format } from "date-fns";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));

  return format(date, "h:mm a");
};

const FixtureCard = ({ id }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(true);

  const [matchNo, setMatchNo] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [overs, setOvers] = useState();
  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3000/fixtures/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Fetching error");
        }

        const { fixture } = await response.json();
        const { match_no, overs, date, time, team1, team2 } = fixture;

        setMatchNo(match_no);
        setDate(date);
        setTime(time);
        setOvers(overs);
        setTeam1(team1);
        setTeam2(team2);

        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <FixtureCardSkeleton />
      ) : (
        <Card
          size="sm"
          variant="outlined"
          sx={{
            width: 260,
          }}>
          {/* Top Bar */}

          <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
            <CardContent>
              <Typography level={isMobile ? "title-sm" : "title-md"}>
                Match {matchNo}
              </Typography>
            </CardContent>
            <Divider inset="context" />
          </CardOverflow>

          {/* Main Content */}
          <CardContent
            sx={{
              my: isMobile ? 0.75 : 1,
              mx: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}>
            {/* Team 1*/}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <AspectRatio
                ratio="1"
                sx={{ width: isMobile ? 45 : 65, borderRadius: "50%" }}>
                <img src={team1.logoURL} loading="lazy" alt="" />
              </AspectRatio>
              <Typography
                level={isMobile ? "title-sm" : "title-md"}
                sx={{ mt: isMobile ? 0.75 : 1 }}>
                {team1.nameShort}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  level={isMobile ? "body-md" : "body-lg"}
                  color="neutral">
                  vs
                </Typography>
              </Box>
            </Box>

            {/* Team  2*/}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <AspectRatio
                ratio="1"
                sx={{ width: isMobile ? 45 : 65, borderRadius: "50%" }}>
                <img src={team2.logoURL} loading="lazy" alt="" />
              </AspectRatio>
              <Typography
                level={isMobile ? "title-sm" : "title-md"}
                sx={{ mt: isMobile ? 0.75 : 1 }}>
                {team2.nameShort}
              </Typography>
            </Box>
          </CardContent>

          {/* Bottom Bar */}

          <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
            <Divider inset="context" />
            <CardContent
              orientation="horizontal"
              sx={{ justifyContent: "space-evenly" }}>
              <Typography level="body-xs" textColor="text.tertiary">
                {overs} Overs
              </Typography>
              <Divider orientation="vertical" />
              <Typography level="body-xs" textColor="text.tertiary">
                {format(new Date(date), "dd MMM yyyy")}
              </Typography>
              <Divider orientation="vertical" />
              <Typography level="body-xs" textColor="text.tertiary">
                {formatTime(time)}
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>
      )}
    </>
  );
};

export default FixtureCard;
