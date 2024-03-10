/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Card, Typography } from "@mui/joy";
import { Swiper, SwiperSlide } from "swiper/react";

import BallLogItem from "../BallLogItem";
import BallLogSeparator from "../BallLogSeparator";
import { Mousewheel } from "swiper/modules";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SliderMask from "../SliderMask";

const BallLogList = ({ isSmall, data, isLoading }) => {
  return (
    <Card
      variant="outlined"
      size="md"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: isSmall ? "100%" : "60%",
        my: 2,
        py: 0,
        px: isLoading && 0,
      }}>
      {isLoading ? (
        <RectangularSkeleton height={60} borderRadius={"6px"} />
      ) : (
        <>
          {data && data.length === 0 ? (
            <Typography
              height={isSmall ? 61.2 : 114.2}
              level={isSmall ? "body-xs" : "body-sm"}
              sx={{ display: "flex", alignItems: "center" }}>
              Bowling data will appear here once the game has been played.
            </Typography>
          ) : (
            data && (
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={isSmall ? -230 : -222}
                direction={"horizontal"}
                mousewheel={true}
                modules={[Mousewheel]}
                initialSlide={data.length - 1}
                className={isSmall && "smallSwiper"}>
                {data.map((item, i) => {
                  return (
                    <SwiperSlide
                      key={i}
                      style={{ display: "flex", alignItems: "center" }}>
                      {item === "-" ? (
                        <BallLogSeparator isSmall={isSmall} />
                      ) : (
                        <BallLogItem item={item} isSmall={isSmall} />
                      )}
                    </SwiperSlide>
                  );
                })}
                <SliderMask
                  height={162.6}
                  bg={"var(--joy-palette-background-surface)"}
                  align={"left"}
                  radius={"8px"}
                />
              </Swiper>
            )
          )}
        </>
      )}
    </Card>
  );
};

export default BallLogList;
