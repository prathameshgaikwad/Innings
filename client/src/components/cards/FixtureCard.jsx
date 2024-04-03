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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FixtureCardSkeleton from "../skeletons/FixtureCardSkeleton";
import { fixtureApi } from "../../services/api";
import formatDate from "../../utilities/helpers/formatDate";
import formatTime from "../../utilities/helpers/formatTime";
import setTimeFromString from "../../utilities/helpers/setTimeFromString";
import { useMediaQuery } from "@mui/material";

const FixtureCard = ({ id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
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
    const setterMethods = {
      setMatchNo,
      setDate,
      setTime,
      setOvers,
      setTeam1,
      setTeam2,
      setIsLoading,
    };
    dispatch(fixtureApi.getFixtureInfo({ id, token, setterMethods }));
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
                sx={{
                  width: isMobile ? 45 : 65,
                  borderRadius: "50%",
                  outline: "3px solid",
                  outlineColor: team1.color,
                }}>
                <img src={team1.logoURL} loading="lazy" />
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
                sx={{
                  width: isMobile ? 45 : 65,
                  borderRadius: "50%",
                  outline: "3px solid",
                  outlineColor: team2.color,
                }}>
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
                {formatDate(date)}
              </Typography>
              <Divider orientation="vertical" />
              <Typography level="body-xs" textColor="text.tertiary">
                {formatTime(setTimeFromString(time))}
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>
      )}
    </>
  );
};

export default FixtureCard;
