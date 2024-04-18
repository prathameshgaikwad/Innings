/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Card, Divider, Typography } from "@mui/joy";
import { Swiper, SwiperSlide } from "swiper/react";

import BallLogListSkeleton from "../skeletons/BallLogListSkeleton";
import BallLogSeparator from "../dataDisplay/BallLogSeparator";
import { BiSolidCricketBall } from "react-icons/bi";
import LogItem from "../dataDisplay/LogItem";
import { Mousewheel } from "swiper/modules";
import SelectPlayer from "../matchManagement/SelectPlayer";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import SliderMask from "../layouts/swiper/SliderMask";
import { setBowler } from "../../state/match/matchManagementSlice";
import { useSelector } from "react-redux";

const BallLogList = ({ ballLog, bowlerData, isLoading, isAdmin = false }) => {
  const { bowlingTeam } = useSelector((state) => state.matchManagement);
  const noBowler = !bowlerData.name || bowlerData.name.length === 0;

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
          <Box width={"38%"} alignItems={"center"}>
            {isAdmin && noBowler ? (
              <SelectPlayer
                playerType={"Bowler"}
                players={bowlingTeam.players}
                dispatchTarget={setBowler}
              />
            ) : (
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
                {bowlerData.name}
              </Typography>
            )}
          </Box>
          <Divider orientation="vertical" />
          {!ballLog || (ballLog && ballLog.length === 0) ? (
            <SimpleTextFallback
              content={
                "Bowling data will appear here once the game has been played."
              }
            />
          ) : (
            ballLog && (
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={-230}
                direction={"horizontal"}
                mousewheel={true}
                modules={[Mousewheel]}
                initialSlide={ballLog.length - 1}
                className={"smallSwiper"}>
                {ballLog.map((item, i) => {
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
            )
          )}
        </>
      )}
    </Card>
  );
};

export default BallLogList;
