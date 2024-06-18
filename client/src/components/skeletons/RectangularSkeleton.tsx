import { Skeleton } from "@mui/joy";

type RectangularSkeletonProps = {
  height?: number | string;
  width?: number | string;
  borderRadius?: number | string;
};

const RectangularSkeleton: React.FC<RectangularSkeletonProps> = ({
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
