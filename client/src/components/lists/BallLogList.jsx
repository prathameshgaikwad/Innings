/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Card, Divider, Typography } from "@mui/joy";
import { Swiper, SwiperSlide } from "swiper/react";

import BallLogListSkeleton from "../skeletons/BallLogListSkeleton";
import BallLogSeparator from "../BallLogSeparator";
import { BiSolidCricketBall } from "react-icons/bi";
import LogItem from "../LogItem";
import { Mousewheel } from "swiper/modules";
import SliderMask from "../SliderMask";

const BallLogList = ({ data, isLoading }) => {
  return (
    <Card
      variant="outlined"
      size="lg"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 72.8,
        py: 0,
      }}>
      {isLoading ? (
        <BallLogListSkeleton />
      ) : (
        <>
          {data && data.length === 0 ? (
            <Typography
              height={61.2}
              level={"body-xs"}
              sx={{ display: "flex", alignItems: "center" }}>
              Bowling data will appear here once the game has been played.
            </Typography>
          ) : (
            data && (
              <>
                <Box width={"38%"} alignItems={"center"}>
                  <Typography
                    level={"body-xs"}
                    color="neutral"
                    startDecorator={
                      <BiSolidCricketBall
                        fontSize={16}
                        style={{ marginRight: 4 }}
                      />
                    }
                    noWrap>
                    Bhuvaneshwar Kumar
                  </Typography>
                </Box>
                <Divider orientation="vertical" />
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={-230}
                  direction={"horizontal"}
                  mousewheel={true}
                  modules={[Mousewheel]}
                  initialSlide={data.length - 1}
                  className={"smallSwiper"}>
                  {data.map((item, i) => {
                    let type = "";
                    switch (true) {
                      case item.isWicket:
                        type = "danger";
                        break;
                      case item.runs_conceded === 4:
                      case item.runs_conceded === 6:
                        type = "success";
                        break;
                      case item.runs_conceded === "WD":
                      case item.runs_conceded === "B":
                      case item.runs_conceded === "LB":
                      case item.runs_conceded === "NB":
                        type = "warning";
                        break;
                    }
                    return (
                      <SwiperSlide
                        key={i}
                        style={{ display: "flex", alignItems: "center" }}>
                        {item === "-" ? (
                          <BallLogSeparator />
                        ) : (
                          <LogItem item={item.runs_conceded} type={type} />
                        )}
                      </SwiperSlide>
                    );
                  })}
                  <SliderMask height={162.6} align={"left"} radius={"8px"} />
                </Swiper>
              </>
            )
          )}
        </>
      )}
    </Card>
  );
};

export default BallLogList;
