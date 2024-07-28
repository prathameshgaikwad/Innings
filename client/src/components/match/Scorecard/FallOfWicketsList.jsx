/* eslint-disable react/prop-types */

import { Box, Card, Typography } from "@mui/joy";

import CustomSwiper from "../../layouts/swiper/CustomSwiper";
import FallOfWicketCard from "../../cards/FallOfWicketCard";
import NoData from "../../fallbacks/NoData";
import SliderMask from "../../layouts/swiper/SliderMask";
import { SwiperSlide } from "swiper/react";

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
          <CustomSwiper spaceBetween={-90}>
            {data.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <FallOfWicketCard isAdmin={true} data={item} />
                </SwiperSlide>
              );
            })}
            <SliderMask height={162.6} align={"left"} radius={"8px"} />
            <SliderMask height={162.6} align={"right"} radius={"8px"} />
          </CustomSwiper>
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
