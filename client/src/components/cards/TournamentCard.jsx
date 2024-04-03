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
import { useSelector } from "react-redux";

const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;

const TournamentCard = ({ id }) => {
  const token = useSelector((state) => state.user.token);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";

  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [overs, setOvers] = useState("");
  const [bannerURLS, setBannerURLS] = useState({ large: "", small: "" });

  useEffect(() => {
    const getTournamentDetails = async () => {
      try {
        const response = await fetch(`${TOURNAMENTS_API}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Could not retrieve tournament details");
        }

        const { name, venue, start_date, overs, banner_urls } =
          await response.json();

        setName(name);
        setStartDate(() => formatDate(start_date));
        setVenue(venue);
        setOvers(overs);
        setBannerURLS(banner_urls);
        setIsLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getTournamentDetails();
  }, [id]);

  const tournamentID = id;
  const tournamentURL = `/tournaments/${tournamentID}`;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
                  textColor="text.tertiary"
                  startDecorator={
                    <BiSolidCricketBall
                      fontSize={13}
                      style={{ color: theme.palette.text.secondary }}
                    />
                  }>
                  {overs} Overs
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  level="body-xs"
                  fontWeight="md"
                  textColor="text.tertiary">
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
