/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../../styles.css";

import { Box, Card, Typography } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import FallOfWicketCard from "../../cards/FallOfWicketCard";
import NoData from "../../fallbacks/NoData";
import SliderMask from "../../layouts/swiper/SliderMask";

const FallOfWicketsList = ({ data }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        my: 2,
        py: 0,
        px: 4,
      }}>
      <Typography
        level="title-md"
        color="neutral"
        sx={{ whiteSpace: "nowrap" }}>
        FALL OF WICKETS:
      </Typography>
      <Box
        sx={{
          width: "56vw",
          display: "inline-flex",
        }}>
        {data ? (
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={-90}
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
                  <FallOfWicketCard isAdmin={true} data={item} />
                </SwiperSlide>
              );
            })}
            <SliderMask height={162.6} align={"left"} radius={"8px"} />
            <SliderMask height={162.6} align={"right"} radius={"8px"} />
          </Swiper>
        ) : (
          <NoData
            height={"100%"}
            isSmall={true}
            customStyles={{ borderWidth: 0 }}
          />
        )}
      </Box>
    </Card>
  );
};

export default FallOfWicketsList;
