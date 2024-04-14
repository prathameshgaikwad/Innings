/* eslint-disable react/prop-types */

import "../../styles.css";
import "swiper/css";
import "swiper/css/pagination";

import { Box, useTheme } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { tournamentPageApi, tournamentSetupApi } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import GroupsIcon from "@mui/icons-material/Groups";
import NoData from "../fallbacks/NoData";
import SectionHeader from "../sectionComponents/SectionHeader";
import SectionWrapper from "../sectionComponents/SectionWrapper";
import SliderMask from "../swiperComponents/SliderMask";
import TeamCard from "../cards/TeamCard";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

const TeamsList = ({ isSetupPage }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { tournamentId } = useParams();
  const createdTeams = useSelector((state) => state.tournamentSetup.teams);
  const tournamentTeams = useSelector((state) => state.tournamentPage.teams);
  const token = useSelector((state) => state.user.token);

  const teams = isSetupPage ? createdTeams : tournamentTeams;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isSetupPage
      ? dispatch(
          tournamentSetupApi.getCreatedTeams({
            tournamentId,
            token,
            setIsLoading,
          })
        )
      : dispatch(
          tournamentPageApi.getTeams({ tournamentId, token, setIsLoading })
        );
  }, [dispatch, teams.length]);

  return (
    <SectionWrapper>
      <SectionHeader title={"Teams"} startDecorator={GroupsIcon} />
      <Box
        sx={{
          maxWidth: isMobile ? "85vw" : "70vw",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "AppWorkspace",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: theme.palette.divider,
          mb: 8,
          width: "100%",
        }}>
        {teams.length === 0 ? (
          <NoData />
        ) : (
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
            {teams.map((team, i) => {
              return (
                <SwiperSlide key={i}>
                  <TeamCard team={team} isLoading={isLoading} />
                </SwiperSlide>
              );
            })}
            {teams.length >= 3 && <SliderMask align={"right"} />}
          </Swiper>
        )}
      </Box>
    </SectionWrapper>
  );
};

export default TeamsList;
