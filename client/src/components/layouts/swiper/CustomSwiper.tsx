import "swiper/css";
import "swiper/css/pagination";
import "../../../styles.css";

import { Mousewheel, Pagination } from "swiper/modules";

import { Swiper } from "swiper/react";

type CustomSwiperProps = {
  children: React.ReactNode;
  spaceBetween?: number;
  isSmall?: boolean;
  isPaginationVisible?: boolean;
  className?: string;
};

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  children,
  spaceBetween = 80,
  isSmall = false,
  isPaginationVisible = true,
  className,
  ...restProps
}) => {
  const modules = [Mousewheel];
  const classes = isSmall ? "smallSwiper" : "mySwiper";

  if (isPaginationVisible) modules.push(Pagination);
  if (className) classes.concat(" " + className);

  return (
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
      {children}
    </Swiper>
  );
};

export default CustomSwiper;
