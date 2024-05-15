/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Link, Typography, useTheme } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FixtureCard from "../cards/FixtureCard/FixtureCard";
import SliderMask from "../layouts/swiper/SliderMask";
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

  const tournamentURL = `/tournaments/${tournamentId}`;

  const [isLoading, setIsLoading] = useState(true);

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
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={50}
              direction={"horizontal"}
              mousewheel={true}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination, Mousewheel]}
              className="mySwiper">
              <SliderMask height={276} align={"left"} />
              <SliderMask height={276} align={"right"} />
              {upcomingMatches ? (
                upcomingMatches.map((id) => (
                  <SwiperSlide key={id}>
                    <FixtureCard id={id} />
                  </SwiperSlide>
                ))
              ) : (
                <Typography>No Upcoming Matches</Typography>
              )}
            </Swiper>
          </Box>
        </>
      )}
    </>
  );
};

export default UpcomingMatches;
