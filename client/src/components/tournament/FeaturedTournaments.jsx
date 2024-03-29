import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Typography, useTheme } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  clearFeaturedTournaments,
  getFeaturedTournaments,
} from "../../state/tournament/tournamentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SliderMask from "../SliderMask";
import TournamentCard from "../../components/cards/TournamentCard";
import { useMediaQuery } from "@mui/material";

const FeaturedTournaments = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const featuredTournaments = useSelector(
    (state) => state.tournaments.featuredTournaments
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isLoading, setIsLoading] = useState(true);

  // Effect for fetching tournaments if not already fetched
  useEffect(() => {
    if (!featuredTournaments.length) {
      dispatch(getFeaturedTournaments({ setIsLoading }));
    }
  }, [dispatch, featuredTournaments.length]);

  // Effect for clearing tournaments when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(clearFeaturedTournaments());
    };
  }, [dispatch]);

  return (
    <>
      <Typography level="h2" sx={{ mt: 4, mr: "auto" }}>
        Featured Tournaments
      </Typography>
      {isLoading ? (
        <RectangularSkeleton />
      ) : (
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
            spaceBetween={80}
            direction={"horizontal"}
            mousewheel={true}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Mousewheel]}
            className="mySwiper">
            {featuredTournaments.map((tournamentId) => (
              <SwiperSlide key={tournamentId}>
                <TournamentCard id={tournamentId} />
              </SwiperSlide>
            ))}
            {featuredTournaments.length >= 3 && (
              <SliderMask height={319} align={"right"} />
            )}
          </Swiper>
        </Box>
      )}
    </>
  );
};

export default FeaturedTournaments;
