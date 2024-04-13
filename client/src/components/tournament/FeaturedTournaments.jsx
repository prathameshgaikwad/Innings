import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import NoData from "../NoData";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SliderMask from "../SliderMask";
import SwiperWrapper from "../SwiperWrapper";
import TournamentCard from "../../components/cards/TournamentCard";
import { Typography } from "@mui/joy";
import { clearFeaturedTournaments } from "../../state/tournament/tournamentSlice";
import { tournamentsApi } from "../../services/api";

const FeaturedTournaments = () => {
  const dispatch = useDispatch();
  const featuredTournaments = useSelector(
    (state) => state.tournaments.featuredTournaments
  );

  const [isLoading, setIsLoading] = useState(true);

  // Effect for fetching tournaments if not already fetched
  useEffect(() => {
    if (!featuredTournaments.length) {
      dispatch(tournamentsApi.getFeaturedTournaments({ setIsLoading }));
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
        <>
          {featuredTournaments.length === 0 ? (
            <NoData />
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
                {featuredTournaments.map((tournamentId) => (
                  <SwiperSlide key={tournamentId}>
                    <TournamentCard id={tournamentId} />
                  </SwiperSlide>
                ))}
                {featuredTournaments.length >= 3 && (
                  <SliderMask height={319} align={"right"} />
                )}
              </Swiper>
            </SwiperWrapper>
          )}
        </>
      )}
    </>
  );
};

export default FeaturedTournaments;
