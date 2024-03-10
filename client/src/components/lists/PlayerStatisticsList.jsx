import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Link, Skeleton, Typography, useTheme } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import PlayerStatisticsCard from "../cards/PlayerStatisticsCard";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const PlayerStatisticsList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const tournamentName = "IPL 2023";

  const [isLoading, setIsLoading] = useState(true);

  //pName, teamName, runs, avg, sr, high, w, econ
  const data = [
    [
      "Shubman Gill",
      "Gujarat Titans",
      "890",
      "59.33",
      "157.80",
      "129",
      "-",
      "-",
      "https://sabhitech.com/wp-content/uploads/2023/03/Shubman-Gill-IPL-2023.jpg",
      "#77C7F2",
    ],
    [
      "Faf Du Plessis",
      "Royal Challengers Bangalore",
      "730",
      "56.15",
      "153.68",
      "84",
      "-",
      "-",
      "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2022/02/flyqtaxaaaaamvy-1-1644829027.jpg",
      "#CB2F2F",
    ],
    [
      "Devon Conway",
      "Chennai Super Kings",
      "672",
      "51.69",
      "139.70",
      "92*",
      "-",
      "-",
      "https://cricxtasy.com/static/c1e/client/95405/uploaded/35c7fc5d7b9b3df6aa28a066c1cc0aa2.jpeg",
      "#FFCB05",
    ],
    [
      "Virat Kohli",
      "Royal Challengers Bangalore",
      "639",
      "53.25",
      "139.82",
      "101*",
      "-",
      "-",
      "https://th.bing.com/th/id/OIP.pHV1X8uQkDkt-HwpGTGNfgHaNK?rs=1&pid=ImgDetMain",
      "#CB2F2F",
    ],
    [
      "Yashasvi Jaiswal",
      "Rajasthan Royals",
      "625",
      "48.08",
      "163.61",
      "124",
      "-",
      "-",
      "https://preview.redd.it/mf-doesnt-care-about-any-team-anymore-smashes-every-single-v0-gv0zzkcwr9za1.jpg?auto=webp&s=e22a13e35e789cd677de8f89b76c6030253f6fc5",
      "#EB83B5",
    ],
    [
      "Mohammad Shami",
      "Gujarat Titans",
      "5",
      "2.50",
      "83.33",
      "5",
      "28",
      "8.03",
      "https://fabceleby.in/wp-content/uploads/2023/05/Mohammed-Shami-Net-Worth.jpg",
      "#77C7F2",
    ],
    [
      "Mohit Sharma",
      "Gujarat Titans",
      "0",
      "0.00",
      "0.00",
      "0*",
      "27",
      "8.17",
      "https://cricketaddictor.com/wp-content/uploads/2023/04/mohit-sharma-ipl-2023-1200x900-1.jpg",
      "#77C7F2",
    ],
    [
      "Rashid Khan",
      "Gujarat Titans",
      "130",
      "32.50",
      "216.67",
      "79*",
      "27",
      "8.24",
      "https://im.indiatimes.in/content/2022/Mar/Rashid-Khan_6245bfcb91e2d.jpg?w=720&h=1280&cc=1",
      "#77C7F2",
    ],
    [
      "Piyush Chawla",
      "Mumbai Indians",
      "25",
      "12.50",
      "113.64",
      "18",
      "22",
      "8.11",
      "https://i.cdn.newsbytesapp.com/images/l26120230418125420.jpeg",
      "#153A75",
    ],
    [
      "Yuzvendra Chahal",
      "Rajasthan Royals",
      "0",
      "0.00",
      "0.00",
      "0",
      "21",
      "8.18",
      "https://www.hindustantimes.com/ht-img/img/2023/04/03/1600x900/PTI04-02-2023-000245A-0_1680500753510_1680500753510_1680500773645_1680500773645.jpg",
      "#EB83B5",
    ],
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 4,
          alignItems: "end",
          width: "100%",
          justifyContent: "space-between",
        }}>
        <Typography level={isMobile ? "h3" : "h2"} sx={{}}>
          Player Statistics
        </Typography>
        {isLoading ? (
          <Skeleton
            variant="text"
            level={isMobile ? "h3" : "h2"}
            animation="wave"
            width={"36%"}
          />
        ) : (
          <Link href="/tournaments/tournament-page">
            <Typography
              level={isMobile ? "h3" : "h2"}
              color="neutral"
              sx={{
                opacity: 0.5,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  opacity: 1,
                },
              }}>
              {tournamentName}
            </Typography>
          </Link>
        )}
      </Box>
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
            spaceBetween={5}
            direction={"horizontal"}
            mousewheel={true}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Mousewheel]}
            className="mySwiper">
            {data.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <PlayerStatisticsCard data={data[i]} cardType="general" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      )}
    </>
  );
};

export default PlayerStatisticsList;
