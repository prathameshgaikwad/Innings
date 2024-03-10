/* eslint-disable react/prop-types */

import { Skeleton } from "@mui/joy";

const RectangularSkeleton = ({
  height = 320,
  width = "100%",
  borderRadius,
}) => {
  return (
    <Skeleton
      variant="rectangular"
      height={height}
      width={width}
      animation="pulse"
      sx={{ borderRadius: borderRadius }}
    />
  );
};

export default RectangularSkeleton;
