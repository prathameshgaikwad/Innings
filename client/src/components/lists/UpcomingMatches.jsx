/* eslint-disable react/prop-types */

import { Box, Link, Typography, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CustomSwiper from "../layouts/swiper/CustomSwiper";
import FixtureCard from "../cards/FixtureCard/FixtureCard";
import { SwiperSlide } from "swiper/react";
import UpcomingMatchesSkeleton from "../skeletons/UpcomingMatchesSkeleton";
import { useMediaQuery } from "@mui/material";
import { userApi } from "../../services/api";

const UpcomingMatches = ({ tournamentId }) => {
  const dispatch = useDispatch();
  const tournamentName = useSelector(
    (state) => state.tournaments.latestTournament.name
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);
  const [isLoading, setIsLoading] = useState(true);

  const tournamentURL = `/tournaments/${tournamentId}`;

  useEffect(() => {
    dispatch(userApi.getUpcomingMatches({ tournamentId, token, setIsLoading }));
  }, [dispatch, tournamentId, token]);

  const upcomingMatches = useSelector((state) => state.user.upcomingMatches);

  return (
    <>
      {isLoading ? (
        <UpcomingMatchesSkeleton />
      ) : (
        <>
          <Typography level="h3" sx={{ mt: 8, mb: 4, mx: "auto" }}>
            Up next in <Link href={tournamentURL}>{tournamentName}</Link>
          </Typography>
          <Box
            sx={{
              maxWidth: isMobile ? "85vw" : "70vw",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "AppWorkspace",
              borderTop: "1px solid",
              borderBottom: "1px solid",
              borderColor: theme.palette.divider,
            }}>
            <CustomSwiper spaceBetween={50}>
              {upcomingMatches ? (
                upcomingMatches.map((id) => (
                  <SwiperSlide key={id}>
                    <FixtureCard id={id} />
                  </SwiperSlide>
                ))
              ) : (
                <Typography>No Upcoming Matches</Typography>
              )}
            </CustomSwiper>
          </Box>
        </>
      )}
    </>
  );
};

export default UpcomingMatches;
