/* eslint-disable react/prop-types */

import { Card, CardContent, CardOverflow, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BottomBar from "./BottomBar";
import FixtureCardSkeleton from "../../skeletons/FixtureCardSkeleton";
import TeamBadgeVertical from "../../dataDisplay/TeamBadgeVertical";
import TopBar from "./TopBar";
import VersusIcon from "../../icons/VersusIcon";
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
            <TeamBadgeVertical
              nameShort={team1.name_short}
              color={team1.team_color}
              logoURL={team1.logo_url}
              widths={[40, 55]}
              isSmall={true}
            />
            <VersusIcon />
            <TeamBadgeVertical
              nameShort={team2.name_short}
              color={team2.team_color}
              logoURL={team2.logo_url}
              widths={[40, 55]}
              isSmall={true}
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
