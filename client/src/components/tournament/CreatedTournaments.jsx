/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Typography, useTheme } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CreateTournamentCard from "../cards/CreateTournamentCard";
import DrawIcon from "@mui/icons-material/Draw";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SectionHeader from "../layouts/sections/SectionHeader";
import SectionWrapper from "../layouts/sections/SectionWrapper";
import SliderMask from "../swiperComponents/SliderMask";
import SwiperWrapper from "../swiperComponents/SwiperWrapper";
import TournamentCard from "../cards/TournamentCard";
import { tournamentsApi } from "../../services/api";
import { useMediaQuery } from "@mui/material";

const CreatedTournaments = ({ userId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );
  const token = useSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      tournamentsApi.getCreatedTournaments({ userId, token, setIsLoading })
    );
  }, [dispatch, userId, token]);

  return (
    <SectionWrapper>
      <SectionHeader title={"Created Tournaments"} startDecorator={DrawIcon} />
      {createdTournaments.length !== 0 ? (
        <>
          {isLoading ? (
            <RectangularSkeleton />
          ) : (
            <SwiperWrapper>
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
                {createdTournaments.map((tournamentId) => (
                  <SwiperSlide key={tournamentId}>
                    <TournamentCard id={tournamentId} />
                  </SwiperSlide>
                ))}
                {createdTournaments.length >= 3 && (
                  <SliderMask height={319} align={"right"} />
                )}
              </Swiper>
            </SwiperWrapper>
          )}
        </>
      ) : (
        <Box
          sx={{
            minWidth: isMobile ? "85vw" : "70vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "AppWorkspace",
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: theme.palette.divider,
            p: 4,
            gap: 2,
          }}>
          <Typography level="body-md">
            You have not created any tournaments yet.
          </Typography>
          <CreateTournamentCard />
        </Box>
      )}
    </SectionWrapper>
  );
};

export default CreatedTournaments;
