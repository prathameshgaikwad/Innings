/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Card, Typography } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import FallOfWicketCard from "../cards/FallOfWicketCard";
import SliderMask from "../SliderMask";

const FallOfWicketsList = ({ data }) => {
  return (
    <Card
      variant="outlined"
      size="md"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 2,
        py: 0,
      }}>
      <Typography level="title-md" color="neutral">
        FALL OF WICKETS:
      </Typography>
      <Box
        sx={{
          maxWidth: "50vw",
          display: "inline-flex",
        }}>
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
            const data = {
              name: item.name,
              scoreStamp: item.scoreStamp,
              overStamp: item.overStamp,
            };
            return (
              <SwiperSlide key={i}>
                <FallOfWicketCard data={data} />
              </SwiperSlide>
            );
          })}
          <SliderMask
            height={162.6}
            bg={"var(--joy-palette-background-surface)"}
            align={"left"}
            radius={"8px"}
          />
          {data.length >= 4 && (
            <SliderMask
              height={162.6}
              bg={"var(--joy-palette-background-surface)"}
              align={"right"}
              radius={"8px"}
            />
          )}
        </Swiper>
      </Box>
    </Card>
  );
};

export default FallOfWicketsList;
