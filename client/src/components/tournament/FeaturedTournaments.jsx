import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import NoData from "../fallbacks/NoData";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SectionHeader from "../layouts/sections/SectionHeader";
import SectionWrapper from "../layouts/sections/SectionWrapper";
import SliderMask from "../layouts/swiper/SliderMask";
import SwiperWrapper from "../layouts/swiper/SwiperWrapper";
import TournamentCard from "../../components/cards/TournamentCard";
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
    <SectionWrapper>
      <SectionHeader
        title={"Featured Tournaments"}
        startDecorator={AutoAwesomeIcon}
      />
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
                <SliderMask height={319} align={"right"} />
              </Swiper>
            </SwiperWrapper>
          )}
        </>
      )}
    </SectionWrapper>
  );
};

export default FeaturedTournaments;
