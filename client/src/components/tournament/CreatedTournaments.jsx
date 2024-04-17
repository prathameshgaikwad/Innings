/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CreateTournamentCard from "../cards/CreateTournamentCard";
import DrawIcon from "@mui/icons-material/Draw";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SectionHeader from "../layouts/sections/SectionHeader";
import SectionWrapper from "../layouts/sections/SectionWrapper";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import SliderMask from "../layouts/swiper/SliderMask";
import SwiperFallback from "../fallbacks/SwiperFallback";
import SwiperWrapper from "../layouts/swiper/SwiperWrapper";
import TournamentCard from "../cards/TournamentCard";
import { tournamentsApi } from "../../services/api";

const CreatedTournaments = ({ userId }) => {
  const dispatch = useDispatch();
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
        <SwiperFallback>
          <SimpleTextFallback
            content={"You have not created any tournaments yet."}
            level="body-md"
            height={"auto"}
          />
          <CreateTournamentCard />
        </SwiperFallback>
      )}
    </SectionWrapper>
  );
};

export default CreatedTournaments;
