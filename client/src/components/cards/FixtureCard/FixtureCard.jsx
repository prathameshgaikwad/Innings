/* eslint-disable react/prop-types */

import {
  Box,
  Card,
  CardContent,
  CardOverflow,
  Typography,
  useTheme,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BottomBar from "./BottomBar";
import FixtureCardSkeleton from "../../skeletons/FixtureCardSkeleton";
import TeamDetails from "./TeamDetails";
import TopBar from "./TopBar";
import { fixtureApi } from "../../../services/api";
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
          <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
            <TopBar matchNo={matchNo} />
          </CardOverflow>
          <CardContent
            sx={{
              my: isMobile ? 0.75 : 1,
              mx: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}>
            <TeamDetails
              nameShort={team1.nameShort}
              color={team1.color}
              logoURL={team1.logoURL}
            />
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
            <TeamDetails
              nameShort={team2.nameShort}
              color={team2.color}
              logoURL={team2.logoURL}
            />
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
            <BottomBar date={date} time={time} overs={overs} />
          </CardOverflow>
        </Card>
      )}
    </>
  );
};

export default FixtureCard;
