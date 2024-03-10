/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Card, CardOverflow, Divider, Typography } from "@mui/joy";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SliderMask from "../SliderMask";

export const FallOfWicketsCard = ({ data }) => {
  return (
    <Card
      size="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: 150,
        mx: 1,
        p: 1,
      }}>
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 35,
          fontWeight: "bold",
        }}>
        <Typography level="body-sm">{data.scoreStamp}</Typography>
      </CardOverflow>
      <Divider />
      <Typography level="body-xs" sx={{ mt: 1, color: "text.secondary" }}>
        {data.name}
      </Typography>
      <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
        Overs {data.overStamp}
      </Typography>
    </Card>
  );
};

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
                <FallOfWicketsCard data={data} />
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
