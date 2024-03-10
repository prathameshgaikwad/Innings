/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Link, Typography, useTheme } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import TournamentStatisticsCard from "../cards/TournamentStatisticsCard";
import TournamentStatisticsListSkeleton from "../skeletons/TournamentStatisticsListSkeleton";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const TournamentStatisticsList = ({ tournamentName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isLoading, setIsLoading] = useState(true);

  const data = [
    ["Most Runs", "890", "Shubhman Gill"],
    ["Highest Score", "129", "Shubhman Gill"],
    ["Best Strike Rate", "216.66", "Rashid Khan"],
    ["Best Average", "69.00", "Vivrant Sharma"],
    ["Most 6s", "36", "Faf Du Plessis"],
    ["Most 4s", "85", "Shubhman Gill"],
    ["Most Wickets", "28", "Mohammad Shami"],
    ["Most Maidens", "3", "Trent Boult"],
    ["Best Economy", "6.25", "Matthew Short"],
  ];
  // "title", "value", "playerID"
  return (
    <>
      {isLoading ? (
        <TournamentStatisticsListSkeleton isMobile={isMobile} />
      ) : (
        <>
          <Link href="/tournaments/tournament-page" sx={{ mt: 4, mr: "auto" }}>
            <Typography level={isMobile ? "h3" : "h2"}>
              {tournamentName}
            </Typography>
          </Link>
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
              className="mySwiper tournamentStatisticsList">
              {data.map((item, i) => {
                return (
                  <SwiperSlide key={i}>
                    <TournamentStatisticsCard data={data[i]} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </>
      )}
    </>
  );
};

export default TournamentStatisticsList;
