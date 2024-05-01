/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../../styles.css";

import { Swiper, SwiperSlide } from "swiper/react";

import BallLogSeparator from "../../dataDisplay/BallLogSeparator";
import LogItem from "../../dataDisplay/LogItem";
import { Mousewheel } from "swiper/modules";
import SimpleTextFallback from "../../fallbacks/SimpleTextFallback";
import SliderMask from "../../layouts/swiper/SliderMask";

const BallLogList = ({ ballLog }) => {
  return (
    <>
      {!ballLog || (ballLog && ballLog.length === 0) ? (
        <SimpleTextFallback
          content={"Ball log will appear here once the game has been played."}
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
                case item.wicket.is_wicket:
                  type = "danger";
                  break;
                case item.runs_scored === 4:
                case item.runs_scored === 6:
                  type = "success";
                  break;
                case item.extra.is_extra === "NB":
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
                    <LogItem item={item.runs_scored} type={type} />
                  )}
                </SwiperSlide>
              );
            })}
            <SliderMask height={162.6} align={"left"} radius={"8px"} />
          </Swiper>
        )
      )}
    </>
  );
};

export default BallLogList;
