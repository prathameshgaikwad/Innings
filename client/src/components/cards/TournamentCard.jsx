/* eslint-disable react/prop-types */

import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Link,
  Typography,
  useTheme,
} from "@mui/joy";
import { useEffect, useState } from "react";

import { BiSolidCricketBall } from "react-icons/bi";
import TournamentCardSkeleton from "../skeletons/TournamentCardSkeleton";
import formatDate from "../../utilities/helpers/formatDate";
import { tournamentPageApi } from "../../services/api";
import useHover from "../../hooks/useHover";
import { useSelector } from "react-redux";

const TournamentCard = ({ id }) => {
  const token = useSelector((state) => state.user.token);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  const tournamentId = id;
  const tournamentURL = `/tournaments/${tournamentId}`;

  const [isLoading, setIsLoading] = useState(true);
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

  const [tournamentDetails, setTournamentDetails] = useState({
    name: "",
    venue: "",
    startDate: "",
    totalOvers: "",
    bannerURLS: { large: "", small: "" },
  });

  const { name, venue, startDate, totalOvers, bannerURLS } = tournamentDetails;

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      const { name, venue, start_date, total_overs, banner_urls } =
        await tournamentPageApi.getTournamentDetails({
          id,
          token,
          setIsLoading,
        })();

      setTournamentDetails({
        name,
        venue,
        startDate: formatDate(start_date || Date.now()),
        totalOvers: total_overs,
        bannerURLS: banner_urls,
      });
    };

    fetchTournamentDetails();
  }, [id, token, setIsLoading]);

  return (
    <>
      {isLoading ? (
        <TournamentCardSkeleton />
      ) : (
        <Link
          overlay
          sx={{
            "&:hover": {
              textDecoration: "none",
            },
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          href={tournamentURL}>
          <Card
            variant="soft"
            sx={{
              width: "300px",
              boxShadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
            }}>
            <CardOverflow>
              <AspectRatio ratio="2.5">
                <img
                  src={bannerURLS.small}
                  loading="lazy"
                  alt={`Banner for ${name}`}
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography
                level="title-lg"
                sx={{
                  color: isHovered && theme.palette.primary[400],
                  transition: "all 0.25s",
                }}>
                {name}
              </Typography>
              <Typography level="body-sm" textColor="text.tertiary">
                {venue}
              </Typography>
            </CardContent>
            <CardOverflow
              variant="soft"
              sx={{
                bgcolor: isHovered
                  ? isDarkTheme
                    ? theme.palette.primary[700]
                    : theme.palette.primary[200]
                  : "background.level1",
                transition: "all 0.25s",
              }}>
              <Divider inset="context" />
              <CardContent orientation="horizontal">
                <Typography
                  level="body-xs"
                  fontWeight="md"
                  textColor="text.secondary"
                  startDecorator={
                    <BiSolidCricketBall
                      fontSize={13}
                      style={{ color: theme.palette.text.secondary }}
                    />
                  }>
                  {totalOvers} Overs
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  level="body-xs"
                  fontWeight="md"
                  textColor="text.secondary">
                  {startDate}
                </Typography>
              </CardContent>
            </CardOverflow>
          </Card>
        </Link>
      )}
    </>
  );
};

export default TournamentCard;
