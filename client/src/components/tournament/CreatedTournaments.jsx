/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CreateTournamentCard from "../cards/CreateTournamentCard";
import CustomSwiper from "../layouts/swiper/CustomSwiper";
import DrawIcon from "@mui/icons-material/Draw";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SectionHeader from "../layouts/sections/SectionHeader";
import SectionWrapper from "../layouts/sections/SectionWrapper";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import SwiperFallback from "../fallbacks/SwiperFallback";
import { SwiperSlide } from "swiper/react";
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
              <CustomSwiper>
                {createdTournaments.map((tournamentId) => (
                  <SwiperSlide key={tournamentId}>
                    <TournamentCard id={tournamentId} />
                  </SwiperSlide>
                ))}
              </CustomSwiper>
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
