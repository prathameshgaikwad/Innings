/* eslint-disable react/prop-types */

import BallLogSeparator from "../dataDisplay/BallLogSeparator";
import CustomSwiper from "../layouts/swiper/CustomSwiper";
import LogItem from "../dataDisplay/LogItem";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import SliderMask from "../layouts/swiper/SliderMask";
import { SwiperSlide } from "swiper/react";

const BallLogList = ({ ballLog }) => {
  return (
    <>
      {!ballLog || (ballLog && ballLog.length === 0) ? (
        <SimpleTextFallback
          content={"Ball log will appear here once the game has been played."}
        />
      ) : (
        ballLog && (
          <CustomSwiper
            spaceBetween={-230}
            initialSlide={ballLog.length - 1}
            isPaginationVisible={false}
            isSmall={true}>
            {ballLog.map((item, i) => {
              let type = "";
              let content = "";
              switch (true) {
                case item.wicket.is_wicket:
                  type = "danger";
                  content = "W";
                  break;
                case item.runs_scored === 4:
                case item.runs_scored === 6:
                  type = "success";
                  content = item.runs_scored;
                  break;
                case item.extra.is_extra:
                  type = "warning";
                  content = item.extra.extra_type;
                  break;
                default:
                  content = item.runs_scored;
              }
              return (
                <SwiperSlide
                  key={i}
                  style={{ display: "flex", alignItems: "center" }}>
                  {item === "-" ? (
                    <BallLogSeparator />
                  ) : (
                    <LogItem item={content} type={type} />
                  )}
                </SwiperSlide>
              );
            })}
            <SliderMask height={162.6} align={"left"} radius={"8px"} />
          </CustomSwiper>
        )
      )}
    </>
  );
};

export default BallLogList;
