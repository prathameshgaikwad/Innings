/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CustomSwiper from "../layouts/swiper/CustomSwiper";
import JoinATournament from "../cards/JoinATournament";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SectionHeader from "../layouts/sections/SectionHeader";
import SectionWrapper from "../layouts/sections/SectionWrapper";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import SwiperFallback from "../fallbacks/SwiperFallback";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../layouts/swiper/SwiperWrapper";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TournamentCard from "../cards/TournamentCard";
import { tournamentsApi } from "../../services/api";

const JoinedTournaments = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(true);

  const joinedTournaments = useSelector(
    (state) => state.tournaments.joinedTournaments
  );

  useEffect(() => {
    dispatch(
      tournamentsApi.getJoinedTournaments({ userId, token, setIsLoading })
    );
  }, [dispatch, userId, token]);

  return (
    <SectionWrapper>
      <SectionHeader
        title={"Joined Tournaments"}
        startDecorator={TaskAltIcon}
      />
      {joinedTournaments.length !== 0 ? (
        <>
          {isLoading ? (
            <RectangularSkeleton />
          ) : (
            <CustomSwiper>
              {joinedTournaments.map((tournamentId) => (
                <SwiperSlide key={tournamentId}>
                  <TournamentCard id={tournamentId} />
                </SwiperSlide>
              ))}
            </CustomSwiper>
          )}
        </>
      ) : (
        <SwiperFallback>
          <SimpleTextFallback
            content={"You have not joined any tournaments yet."}
            level="body-md"
            height={"auto"}
          />
          <JoinATournament />
        </SwiperFallback>
      )}
    </SectionWrapper>
  );
};

export default JoinedTournaments;
