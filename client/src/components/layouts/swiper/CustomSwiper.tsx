import "swiper/css";
import "swiper/css/pagination";
import "../../../styles.css";

import { Mousewheel, Pagination } from "swiper/modules";

import SliderMask from "./SliderMask";
import { Swiper } from "swiper/react";
import SwiperWrapper from "./SwiperWrapper";

type CustomSwiperProps = {
  children: React.ReactNode;
  spaceBetween?: number;
  isSmall?: boolean;
  isPaginationVisible?: boolean;
  className?: string;
  enableSliderMasks?: boolean;
};

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  children,
  spaceBetween = 80,
  isSmall = false,
  isPaginationVisible = true,
  className,
  enableSliderMasks = true,
  ...restProps
}) => {
  const modules = [Mousewheel];
  const classes = isSmall ? "smallSwiper" : "mySwiper";

  if (isPaginationVisible) modules.push(Pagination);
  if (className) classes.concat(" " + className);

  return (
    <SwiperWrapper>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={spaceBetween}
        direction={"horizontal"}
        mousewheel={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={modules}
        className={classes}
        {...restProps}>
        {enableSliderMasks && <SliderMask align="left" />}
        {enableSliderMasks && <SliderMask align="right" />}
        {children}
      </Swiper>
    </SwiperWrapper>
  );
};

export default CustomSwiper;
